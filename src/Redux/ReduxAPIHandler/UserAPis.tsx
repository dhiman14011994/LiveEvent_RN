import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import { put, } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import { UserModl, UserUpdateModl, UserDetailsModl } from '../../Modals/UserModl';
import { saveUserDataApi } from '../Actions/UserActions';
import { NotifyModl } from '../../Modals/NotificationModl';
//All Course
export async function getAllUser(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.GET_USERS + '?type=' + data.type, header).then(async (response: any) => {
      let data = await setAllUserDtls(response);
      // console.log('All User res123', data)
      resolve(data)
    })
      .catch(function (error: any) {
        console.log('Error:', JSON.stringify(error));
        reject(error)

      });
  });
}

//Creating stories modl array from raw data
async function setAllUserDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data;
    let AllUserArrr: UserModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let AllUserData: UserModl = {
        id: element._id,
        createdDate: element.createdDate,
        __V: element.__v,
        title: element.name,
        email: element.email,
        courses: element.courses,
        tagline: element.tagline,
        role: element.role,
        encryptedPassword: element.encrptedPassword,
        uploadedFile: element.uploadedFile,
        totalCourse: element.totalCourse,
        image: element.image == undefined ? '' : element.image,
      }
      AllUserArrr.push(AllUserData)
    }
    resolve(AllUserArrr)
  })
}


export async function userGetData(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }


      await RequestManager.getRequest(api.GET_USERS + '/' + data.id, header).then(async (response: any): Promise<void> => {
          // console.log('getUserData 123456', JSON.stringify(response))
          //@ts-ignore
   
          resolve(response)
      })
          .catch(function (error: any) {
              // console.log('error', error)
              Toast.show(error.data.message!=undefined?error.data.message:error.message)
              reject(error.data.message!=undefined?error.data.message:error.message)
          });
  });
  
}

//************************************ Get User Details ***************************************************** 
export  function* getUserData(data: any) {
  

  try {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    //@ts-ignore
    const response = yield RequestManager.getRequest(api.GET_USERS + '/' + data.id, header);
    const userData =  getData(response)
    // console.log('cureent user response', userData)
    yield put(saveUserDataApi(userData))


  }
  catch (e) {
    console.log('error', e);
    Toast.show(e.message != undefined ? e.message : e.data.message)
  }
}

 function getData(response: any) {
      
      let userDetails: UserDetailsModl = {
        id: response.data._id,
        email: response.data.email!=undefined&&response.data.email!=null?response.data.email:'',
        name: response.data.name!=undefined&&response.data.name!=null?response.data.name:'',
        createdDate: response.data.createdDate!=undefined&&response.data.createdDate!=null?response.data.createdDate:'',
        private: response.data.private!=undefined&&response.data.private!=null?response.data.private:false,
        lastName: response.data.lastName!=undefined&&response.data.lastName!=null?response.data.lastName:'',
        city: response.data.city!=undefined&&response.data.city!=null?response.data.city:'',
        industry: response.data.industry!=undefined&&response.data.industry!=null?response.data.industry:'',
        title: response.data.profileTagLine!=undefined&&response.data.profileTagLine!=null?response.data.profileTagLine:'',
        message: response.message!=undefined&&response.message!=null?response.message:'',
        hash: response.data.hash!=undefined&&response.data.hash!=null?response.data.hash:'',
        subscription_id: response.data.subscription._id!=undefined&&response.data.subscription._id!=null?response.data.subscription._id:'',
        subscription_userId: response.data.subscription.userId!=undefined&&response.data.subscription!=null?response.data.subscription.userId:'',
        subscription_customerId: response.data.subscription.customerId!=undefined&&response.data.subscription.customerId!=null?response.data.subscription.customerId:'',
        subscription_planId:response.data.subscription.planId!=undefined&&response.data.subscription.planId!=null?response.data.subscription.planId:'',
        subscription_expiryDate: response.data.subscription.expiryDate!=undefined&&response.data.subscription.expiryDate!=null?response.data.subscription.expiryDate:'',
        subscription_planName: response.data.subscription.planName!=undefined&&response.data.subscription.planName!=null?response.data.subscription.planName:'',
        subscription_amount: response.data.subscription.amount!=undefined&&response.data.subscription.amount!=null?response.data.subscription.amount:0,
        subscription_currency: response.data.subscription.currency!=undefined&&response.data.subscription.currency!=null?response.data.subscription.currency:'',
        subscription_createdDate: response.data.subscription.createdDate!=undefined&&response.data.subscription.createdDate!=null?response.data.subscription.createdDate:'',
        subscription_subscriptionId:response.data.subscription.subscriptionId!=undefined&&response.data.subscription.subscriptionId!=null?response.data.subscription.subscriptionId:'',
        image: response.data.image == undefined ? '' :response.data.image,

      };
    
      return (userDetails);
    
    


}

//************************************ Update User Details ***************************************************** 


export async function updateImageUser(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }


    await RequestManager.putRequest(api.GET_USERS + '/' + data.id, data.params, header).then(async (response: any) => {
      let userData = setuserData(response)
      resolve(userData)
    })
      .catch(function (error: any) {
        console.log('error', error)

        // Toast.show(error.data.message!=undefined?error.data.message:error.message)
        reject(error)
      });
  });
}


//************************************ Update User Details ***************************************************** 


export async function updateUserData(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }


    await RequestManager.putRequest(api.GET_USERS + '/' + data.id, data.params, header).then(async (response: any) => {
      let userData = setuserData(response)
      resolve(userData)
    })
      .catch(function (error: any) {
        console.log('error', error)

        // Toast.show(error.data.message!=undefined?error.data.message:error.message)
        reject(error)
      });
  });
}


async function setuserData(response: any) {
  return await new Promise(function (resolve) {

    let user: UserUpdateModl = {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      createdDate: response.data.createdDate,
      private: response.data.private,
      lastName: response.data.lastName,
      city: response.data.city,
      industry: response.data.industry,
      title: response.data.profileTagLine,
      message: response.message,
    };
    resolve(user);
  });
}



export async function updateUserImage(token: string, data: string, params: any[]) {
  return await new Promise(async function (resolve) {
    await RequestManager.uploadImage(api.GET_USERS + '/' + data, token, params)
      .then(function (response: any) {
        resolve(response);
      })
      .catch(function (e: any) {
        // Alert.alert(e.error);
      });
    resolve;
  });
}


//************************************ Follow user ****************************************


export async function userFollow(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }


      await RequestManager.postRequest(api.FOLLOW , data.data, header).then(async (response: any): Promise<void> => {
            
          resolve(response)
      })
          .catch(function (error: any) {
              // console.log('error', error)
              Toast.show(error.data.message!=undefined?error.data.message:error.message)
              reject(error.data.message!=undefined?error.data.message:error.message)
          });
  });
  
}



//************************************ Get Notification Data Api ***************************************************** 
export async function getNotification(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
      let header = {
        'Authorization': data != '' ? 'Bearer ' + data : '',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  
  
        await RequestManager.getRequest(api.NOTIFICATION, header).then(async (response: any): Promise<void> => {
            const userData =  getNotifyData(response)
           
            resolve(response)
        })
            .catch(function (error: any) {
                // console.log('error', error)
                Toast.show(error.data.message!=undefined?error.data.message:error.message)
                reject(error.data.message!=undefined?error.data.message:error.message)
            });
    });
    
}

 function getNotifyData(response: any) {
      
  let data = response.data;
  let NotifyArrr: NotifyModl[] = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let AllCourseData: NotifyModl = {
      id: element._id,
      user: element.user,
      createdDate: element.createdDate,
      v: element.__v,
      notification: element.completed,
      

    }
    NotifyArrr.push(AllCourseData)
  }
     
      return (NotifyArrr);


}