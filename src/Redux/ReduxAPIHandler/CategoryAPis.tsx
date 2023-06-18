import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import { Alert } from 'react-native';
import { CategoryModl, FeatureModl, WatchingModl, TrendingModl, CategoryDataModl } from '../../Modals/CategoryModl'
import Moment from 'moment';
import { convertMinutesToHourMinute } from '../../utils/HelperFunctions';
import Toast from 'react-native-simple-toast';


//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Getting Category all Api 
export async function getPopularTopicList() {
  return await new Promise(async function (resolve,reject) {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    await RequestManager.getRequest(api.CATEGORIES_ALL,header).then(async (response: any) => {
      let data = await setPopularDtls(response);
      // console.log('res',response)
      resolve(data)
    })
      .catch(function (error: any) {
       
        reject(error.message)
      });
  });
}

//Creating stories modl array from raw data
async function setPopularDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data;
    let popularArrr: CategoryModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let categoryData: CategoryModl = {
        id: element.id,
        category: element.category,
        createdDate: element.createdDate,
        category_id: element._id,
      }
      popularArrr.push(categoryData)
    }
    resolve(popularArrr)
  })
}



//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Getting Category all Api 
export async function getCategoryData(data:any) {
  return await new Promise(async function (resolve,reject) {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.CATEGORIES_DATA+'?categoryId='+data.id,header).then(async (response: any) => {
      let data = await setCategoryDtls(response);
      // console.log('res',response)
      resolve(data)
    })
      .catch(function (error: any) {
       
        reject(error.message)
      });
  });
}

//Creating stories modl array from raw data
async function setCategoryDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data;
    let categoryArrr: CategoryDataModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let categoryData: CategoryDataModl = {
        id: element._id,
        category_id: element.category,
        createdDate: element.createdDate,
        description: element.description,
        duration: element.duration,
        title: element.title,
        instructionName: element.instructionName,
        featured: element.featured,
        userId: element.userId,
        plan: element.plan,
        uploadedFile: element.uploadedFile,
        thubmnailUrl: element.thubmnailUrl,
        lesson: element.lesson,
        v: element.__v,
        tags:element.tags,
      }
      categoryArrr.push(categoryData)
    }
    resolve(categoryArrr)
  })
}

//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Getting Course Feature Api 

export async function getCourseFeatureList(token: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': token != '' ? 'Bearer ' + token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.COURSE_FEATURED, header).then(async (response: any) => {
      // console.log('Feature Data1234512344', JSON.stringify(response));
      let data = await setCourseFeatureDtls(response);
      resolve(data)
    })
      .catch(function (error: any) {
        reject(error.message)
        // Toast.show(error.message);
      });
  });
}

//Creating stories modl array from raw data
async function setCourseFeatureDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data;
    let courseFeatureArrr: FeatureModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let featureData: FeatureModl = {
        _id: element._id,
        tags: element.tags,
        category: element.category,
        description: element.description,
        duration: element.duration,
        title: element.title,
        userId: element.userId,
        createdDate: element.createdDate,
        plan: element.plan,
        __v: element.__v,
        uploadedFile: element.uploadedFile.path,
        thumbnailUrl: element.thumbnailUrl,
        featured: element.featured,
        questions: element.questions,
        favourite: element.favourite,

      }
      courseFeatureArrr.push(featureData)
    }
    resolve(courseFeatureArrr)
  })
}



//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Getting course Api 

export async function getCourseWatchingList(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.COURSE+'?type='+data.type, header).then(async (response: any) => {
      let data = await setCourseWatching(response);
      //  console.log('continue watchinglist data123',data)
      resolve(data)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}
export async function getCourseWatching(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.USERCOURSE + '?type=' + data.type, header).then(async (response: any) => {
      let data = await setCourseWatchingDtls(response.data);
       console.log('continue watching data12345',JSON.stringify(response))
       console.log('continue watching coming ',JSON.stringify(data))
      resolve(data)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}

//Creating stories modl array from raw data
async function setCourseWatchingDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response;
    if( data!=undefined && data!=null){

   
    let courseFeatureArrr: WatchingModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].courseDetail;
      const favourite = data[i].favourite[0];
      let featureData: WatchingModl = {
        _id: element._id,
        tags: element.tags,
        category: element.category,
        description: element.description,
        duration: convertMinutesToHourMinute(element.duration),
        duration1:element.duration,
        instructionName: element.instructionName,
        userId: element.userId,
        createdDate: Moment(element.createdDate).format('MM:SS'),
        plan: element.plan,
        __v: element.__v,
        uploadedFile: element.uploadedFile!=undefined? element.uploadedFile.path:undefined,
        thumbnailUrl: element.thumbnailUrl,
        featured: element.featured,
        title: element.title,
        favourite: favourite,
        totalWatched:data[i].totalWatched

      }
      courseFeatureArrr.push(featureData)
    }
  
    resolve(courseFeatureArrr)
  }
  else{
    resolve(data)
  }
  })
}


async function setCourseWatching(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data;
    if( data!=undefined && data!=null){

   
    let courseFeatureArrr: WatchingModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let featureData: WatchingModl = {
        _id: element._id,
        tags: element.tags,
        category: element.category,
        description: element.description,
        duration: convertMinutesToHourMinute(element.duration),
        instructionName: element.instructionName,
        userId: element.userId,
        createdDate: Moment(element.createdDate).format('MM:SS'),
        plan: element.plan,
        __v: element.__v,
        uploadedFile: element.uploadedFile!=undefined? element.uploadedFile.path:undefined,
        thumbnailUrl: element.thumbnailUrl,
        featured: element.featured,
        title: element.title,
        favourite: element.favourite,

      }
      courseFeatureArrr.push(featureData)
    }
  
    resolve(courseFeatureArrr)
  }
  else{
    resolve(data)
  }
  })
}

//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Getting course trending Api 

export async function getCourseTrendingList(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.COURSE+'?type='+data.type, header).then(async (response: any) => {
      let data = await setCourseTrendingDtls(response);
        // console.log('CourseTrendingDtls123456',response)
      resolve(data)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}

//Creating stories modl array from raw data
async function setCourseTrendingDtls(response: any) {
  
  return await new Promise(async function (resolve, reject) {
    let data = response.data;
    let courseTrendingModlArrr: TrendingModl[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      // var timeDuration = await 
      let featureData: TrendingModl = {
        _id: element.course._id,
        tags: element.course.tags,
        category: element.course.category,
        description: element.course.description,
        duration: convertMinutesToHourMinute(element.course.duration),
        instructionName: element.course.instructionName,
        userId: element.course.userId,
        createdDate: Moment(element.course.createdDate).format('HH:MM'),
        plan: element.course.plan,
        __v: element.__v,
        uploadedFile: element.course.uploadedFile.path,
        thumbnailUrl: element.course.thumbnailUrl,
        featured: element.course.featured,
        title: element.course.title,
        favourite: element.favourite,
        duration1:element.course.duration,
        totalWatched:element.totalWatched!=undefined?element.totalWatched:1,

      }
      courseTrendingModlArrr.push(featureData)
    }
    resolve(courseTrendingModlArrr)
  })
}