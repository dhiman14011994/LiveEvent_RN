export const BASE_URL = 'https://livesmartvideochat.iphoneapps.co.in:4000';

const api = {
  SINGIN: BASE_URL + '/users/register',
  LOGIN: BASE_URL + '/users/authenticate',
  SOCIALLOGIN: BASE_URL + '/users/socialSignUp',
  GETSTRIPEPRODUCTS: BASE_URL + '/users/getStripeProducts',
  CREATECUSTOMER: BASE_URL + '/users/createCustomer',
  CREATESUBSCRIPTION: BASE_URL + '/users/createSubscription',
  CREATEPAYMENTMETHOD: BASE_URL + '/users/createPaymentMethod',
  FORGETPASSWORD: BASE_URL + '/users/forgotPassword',
  OTP: BASE_URL + '/users/verifyCode',
  GET_USERS: BASE_URL + '/users',
  CHANGEPASSWORD: '​https://livesmartvideochat.iphoneapps.co.in:4000/users/changePassword',
  CATEGORIES_ALL:BASE_URL + '/categories/all',
  COURSE_FEATURED: BASE_URL + '/course/featured',
  COURSE: BASE_URL + '/course',
  QUESTION: BASE_URL + '/questions',
  FAVOURITE: BASE_URL + '/userCourses/favourite',
  ANSWER: BASE_URL + '/questions/answer',
  BOOKMARK: BASE_URL + '/userCourses/bookmarkedLesson',
  RATING: BASE_URL + '/userCourses/rating',
  USERCOURSE: BASE_URL + '/userCourses/',
  GET_SAVELESSON: BASE_URL + '/userCourses/bookmarkedLesson',
  SAVE_QUESTION: BASE_URL + '/questions/action',
  LIVEEVENT: BASE_URL + '/liveTalks',
  EVENTTOKEN: BASE_URL+ '/liveTalks/accessToken',
  SAVEEVENT: BASE_URL+ '/liveTalks/bookmark',
  CHANGESUBSCRIPTION: BASE_URL+ '/users/changeSubscription',
  CANCELSUBSCRIPTION: BASE_URL+ '/users/cancelSubscription',
  FOLLOW: BASE_URL+ '/users/follow',
  NOTIFICATION: BASE_URL+ '/users/notifications',
  GETCustomerId:BASE_URL+ '/users/getCustomerId/',
  GUEST_LOGIN: BASE_URL+ '/users/guestRegister',
  DELETECARD:BASE_URL+'/users/detachPayment',
  ADDCARD:BASE_URL+'/users/attachPayment',
  CATEGORIES_DATA:BASE_URL+'/course/category'
  
};

export default api;
