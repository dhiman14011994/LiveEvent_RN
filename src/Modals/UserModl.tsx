export interface UserModl {
    id: string;
    role:string;
    email:string;
    title: string;
    tagline: string;
    encryptedPassword: string;
    createdDate: string;
    __V: number;
    uploadedFile: any;
    courses: any[];
    totalCourse: string;
    image: string;
  }

export interface UserUpdateModl {
  id: string;
  name:string;
  lastName:string
  email:string;
  title: string;
  industry: string;
  createdDate: string;
  private:boolean;
  city:string;
  message:string;
}

export interface UserDetailsModl {
  id?: string;
  name?:string;
  lastName?:string
  email?:string;
  title?: string;
  industry?: string;
  createdDate?: string;
  private?:boolean;
  city?:string;
  message?:string;
  hash?:string,
  subscription_id?:string,
  subscription_userId?:string,
  subscription_customerId?:string,
  subscription_planId?:string,
  subscription_subscriptionId?:string,
  subscription_expiryDate?:string,
  subscription_planName?:string,
  subscription_amount?:number,
  subscription_currency?:string,
  subscription_createdDate?:string,
  image: string;
}