import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import { AllCourseModl, CourseModl, LessonsModl } from '../../Modals/CourseModl'
import Moment from 'moment';
import Toast from 'react-native-simple-toast';
//Getting Course Feature Api 

export async function getCourseDetialsList(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.COURSE + '/' + data.id, header).then(async (response: any) => {
      let data = await setCourseDtls(response);
      // console.log('getCourseDetialsList ', JSON.stringify(response.data.course))
      resolve(data)
    })
      .catch(function (error: any) {
        reject(error)
      });
  });
}

//Creating stories modl array from raw data
async function setCourseDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let exerciseArr: LessonsModl[] = [];
    for (let i = 0; i < response.data.course.lessons.length; i++) {
      const data = response.data.course.lessons[i];
      // console.log("check lesson data in modal >>> ", data.userLessons.bookmarked)
      let exercise: LessonsModl = {
        title: data.title,
        id: data._id,
        videoUrl: data.videoUrl,
        course: data.course,
        user_id: data.userId,
        description: data.description,
        duration: data.duration,
        createdDate: Moment(data.createdDate).format('HH:MM'),
        __V: data.__v,
        uploadedFile: data.uploadedFile,
       userLessons: data.userLessons
      };
      exerciseArr.push(exercise);
    }
    let data = response.data.course;
    let courseArrr: CourseModl = {

      id: data._id,
      tag: data.tags,
      category: data.category,
      description: data.description,
      duration: data.duration,
      instructionName: data.instructionName,
      user_id: data.userId,
      createdDate: Moment(data.createdDate).format('HH:MM'),
      plan: data.plan,
      __V: data.__v,
      uploadedFile: data.uploadedFile.path,
      featured: data.featured,
      title: data.title,
      lessons: exerciseArr,
      avgRating: response.data.avgRating[0].avgRating,
    }


    resolve(courseArrr)
  })
}

export async function setFavourite(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.postRequest(api.FAVOURITE, data.data, header).then(async (response: any) => {

      // console.log('res', response)
      resolve(response)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}

// set Bookmark
export async function setBookmark(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.postRequest(api.BOOKMARK, data.data, header).then(async (response: any) => {

      // console.log('res', response)
      resolve(response)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}

// get Bookmark
export async function getBookmark(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data != '' ? 'Bearer ' + data : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.GET_SAVELESSON, header).then(async (response: any) => {

      // console.log('res', response)
      resolve(response)
    })
      .catch(function (error: any) {
        reject(error.message)
      });
  });
}



//getCourseData

export async function getCourse(data: any) {
  return await new Promise(async function (resolve,reject): Promise<void> {
    let header = {
      'Authorization': data != '' ? 'Bearer ' + data : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.FAVOURITE, header).then(async (response: any) => {

      //  console.log('res getCourse FAVOURITE', response)
      resolve(response)
    })
      .catch(function (error: any) {
        console.log('res error', error)
        reject(error.message)
      });
  });
}



// set Rating
export async function getRating(data: any) {
  return await new Promise(async function (resolve): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
 console.log('params>>>>>', data.data)
    await RequestManager.postRequest(api.RATING, data.data, header).then(async (response: any) => {

      // console.log('res', response)
      resolve(response)
    })
      .catch(function (error: any) {
        Toast.show('Error: ' + error.message);
      });
  });
}




//All Course
export async function getAllCourse(data: any) {
  return await new Promise(async function (resolve, reject): Promise<void> {
    let header = {
      'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    await RequestManager.getRequest(api.USERCOURSE + '?type=' + data.type, header).then(async (response: any) => {
      // let data = await setAllCourseDtls(response);
      // console.log('All course res123', response)
      resolve(response)
    })
      .catch(function (error: any) {

        console.log('Error:', error);
        reject(error)

      });
  });
}

//Creating stories modl array from raw data
async function setAllCourseDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let data = response.data;
    if(data!=undefined){
    let AllcourseArrr: AllCourseModl[] = [];
    
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let AllCourseData: AllCourseModl = {
          id: element._id,
          user: element.user,
          createdDate: element.createdDate,
          __V: element.__v,
          completed: element.completed,
          course: element.course,
          rating: element.rating,
          courseDetail: element.courseDetail,
          courseLessons: element.courseLessons,
          userLessons: element.userLessons,
          totalWatched: element.totalWatched,
          totalLesson: element.totalLesson,
          totalWatchedLesson: element.totalWatchedLesson,
  
        }
        AllcourseArrr.push(AllCourseData)
    }
    resolve(AllcourseArrr)
    }
    else{
      resolve(data)
    }
    
  })
}
