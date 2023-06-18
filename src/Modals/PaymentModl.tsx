export interface PlansModl {
  id: string;
  object: string;
  active: boolean;
  aggregate_usage?: any;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  name: string;
  nickname?: any;
  product: string;
  statement_description?: any;
  statement_descriptor?: any;
  tiers?: any;
  tiers_mode?: any;
  transform_usage?: any;
  trial_period_days?: any;
  usage_type: string;
  isSelected: boolean;
}

export interface PaymentMod {
  id:string,
object:string,
application_fee_percent:string,
billing:string,
billing_cycle_anchor:number,
billing_thresholds:string,
cancel_at:string,
cancel_at_period_end:boolean,
canceled_at:string,
collection_method:string,
created:number,
current_period_end:number,
current_period_start:number,
customer:string,
days_until_due:string,
default_payment_method:string,
default_source:string,
default_tax_rates:any,
discount:string,
ended_at:string,
invoice_customer_balance_settings:string,
items:any,
latest_invoice:string,
livemode:boolean,
metadata:string,
next_pending_invoice_item_invoice:string,
pause_collection:string,
pending_invoice_item_interval:string,
pending_setup_intent:string,
pending_update:string,
plan:string,
quantity:number,
schedule:string,
start:number,
start_date:number,
status:string,
tax_percent:string,
transfer_data:string,
trial_end:string,
trial_start:string,
token:string,
message: string,
}

