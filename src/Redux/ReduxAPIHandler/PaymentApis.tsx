import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import { PlansModl, PaymentMod } from '../../Modals/PaymentModl';
import { saveLoginApi, savePaymentApi } from '../Actions/LoginActions';
import { put } from 'redux-saga/effects';
import { apiStart } from '../Actions/CommonActions';
import { commonKeys } from '../Constants/CommonKeys';
import Toast from 'react-native-simple-toast';

//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Getting plans Api 
export async function getProductsList() {
  return await new Promise(async function (resolve,reject) {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    // @ts-ignore
    await RequestManager.getRequest(api.GETSTRIPEPRODUCTS).then(async (response: any) => {
      let data = await setPlansDtls(response);
      resolve(data)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}

//Creating stories modl array from raw data
async function setPlansDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data.data;
    let plansArrr: PlansModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let plans: PlansModl = {
        id: element.id,
        object: element.object,
        active: element.active,
        aggregate_usage: element.aggregate_usage,
        amount: element.amount,
        amount_decimal: element.amount_decimal,
        billing_scheme: element.billing_scheme,
        created: element.created,
        currency: element.currency,
        interval: element.interval,
        interval_count: element.interval_count,
        livemode: element.livemode,
        name: element.name,
        nickname: element.nickname,
        product: element.product,
        statement_description: element.statement_description,
        statement_descriptor: element.statement_descriptor,
        tiers: element.tiers,
        tiers_mode: element.tiers_mode,
        transform_usage: element.transform_usage,
        trial_period_days: element.trial_period_days,
        usage_type: element.usage_type,
        isSelected: false,
      }
      plansArrr.push(plans)
    }
    resolve(plansArrr)
  })
}

//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Create Customer Api 
export async function createCustomer(params: any,) {

  return await new Promise(async function (resolve,reject) {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    await RequestManager.postRequest(api.CREATECUSTOMER, params, header,).then((response: any) => {
      resolve(response.data.id)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}

//Payment
export function* payment(this: any, params: any) {
  try {
    let header = {
      'Content-Type': 'application/json',
    };

    yield put(apiStart());
    //@ts-ignore
    const response = yield RequestManager.postRequest(
      api.CREATESUBSCRIPTION,
      {
        email: params.email,
        customerId: params.customerId,
        subscriptionPlanId: params.subscriptionPlanId,
        paymentMethodId: params.paymentMethodId
      },
      header,
    );

    const PaymentData = setPlanData(response)
    yield put(saveLoginApi(response));
    yield put(savePaymentApi(response));
    // console.log('PaymentData', PaymentData);
    // console.log('PaymentData Response user data', response);
  } catch (e) {
    console.log('PaymentData error', e);
    Toast.show(e.error.data.message)
    yield put({ type: commonKeys.API_FAILED, message: e });
  }
}
async function setPlanData(response: any) {
  return await new Promise(function (resolve) {
    let paymentResponse: PaymentMod = {
      id: response.data.id,
      token: response.data.token,
      object: response.data.object,
      application_fee_percent: response.data.application_fee_percent,
      billing: response.data.billing,
      billing_cycle_anchor: response.data.billing_cycle_anchor,
      billing_thresholds: response.data.billing_thresholds,
      cancel_at: response.data.cancel_at,
      cancel_at_period_end: response.data.cancel_at_period_end,
      canceled_at: response.data.canceled_at,
      collection_method: response.data.collection_method,
      created: response.data.created,
      current_period_end: response.data.current_period_end,
      current_period_start: response.data.current_period_start,
      customer: response.data.customer,
      days_until_due: response.data.days_until_due,
      default_payment_method: response.data.default_payment_method,
      default_source: response.data.default_source,
      default_tax_rates: response.data.default_tax_rates,
      discount: response.data.discount,
      ended_at: response.data.ended_at,
      invoice_customer_balance_settings: response.data.invoice_customer_balance_settings,
      items: response.data.items,
      latest_invoice: response.data.latest_invoice,
      livemode: response.data.livemode,
      metadata: response.data.metadata,
      next_pending_invoice_item_invoice: response.data.next_pending_invoice_item_invoice,
      pause_collection: response.data.pause_collection,
      pending_invoice_item_interval: response.data.pending_invoice_item_interval,
      pending_setup_intent: response.data.pending_setup_intent,
      pending_update: response.data.pending_update,
      plan: response.data.plan,
      quantity: response.data.quantity,
      schedule: response.data.schedule,
      start: response.data.start,
      start_date: response.data.start_date,
      status: response.data.status,
      tax_percent: response.data.tax_percent,
      transfer_data: response.data.transfer_data,
      trial_end: response.data.trial_end,
      trial_start: response.data.trial_start,
      message:response.message,
    };
    resolve(paymentResponse);
  });
}



//********************************* Change subscription api **************************************************
export async function cancelSubscription(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }


      await RequestManager.postRequest(api.CANCELSUBSCRIPTION ,{
        subscriptionId:data
      }, header).then(async (response: any): Promise<void> => {
          //  console.log('getUserData 123456', JSON.stringify(response))
          
   
          resolve(response)
      })
          .catch(function (error: any) {
              // console.log('error', error)
              
              reject(error)
          });
  });
  
}


//********************************* Change plan **************************************************
export async function changePlan(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }


      await RequestManager.postRequest(api.CANCELSUBSCRIPTION , data, header).then(async (response: any): Promise<void> => {
          //  console.log('getUserData 123456', JSON.stringify(response))
          
   
          resolve(response)
      })
          .catch(function (error: any) {
              // console.log('error', error)
              
              reject(error)
          });
  });
  
}

//********************************* get Detials **************************************************

export async function getDetailscard(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }


      await RequestManager.getRequest(api.GETCustomerId+data.id, header).then(async (response: any): Promise<void> => {
          //  console.log('getUserData 123456', JSON.stringify(response))
          //@ts-ignore
   
          resolve(response)
      })
          .catch(function (error: any) {
              // console.log('error', error)
              
              reject(error)
          });
  });
  
}