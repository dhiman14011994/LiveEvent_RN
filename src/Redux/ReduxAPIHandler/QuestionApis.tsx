import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import Toast from 'react-native-simple-toast';
export async function getQuestionDetialsList(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.getRequest(api.QUESTION + '/?courseId=' + data.id + '&type=' + data.type, header).then(async (response: any) => {
            // console.log('getQuestionDetialsList 123456', JSON.stringify(response))
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error)
            });
    });
}

//Creating stories modl array from raw data
async function setquestionDtls(response: any) {
    return await new Promise(function (resolve, reject) {
        let data = response.data;
        // console.log('element1223345', data);
        let questionArrr = response.data;
        resolve(questionArrr)
    })
}



export async function getQuestion(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        console.log(data)
        await RequestManager.postRequest(
            api.QUESTION,
            {
                courseId: data.courseId,
                question: data.question,
            },
            header,
        ).then(async (response: any) => {
            // console.log('res123456', response)
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}

export async function getAnswer(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        console.log(data)
        await RequestManager.postRequest(
            api.ANSWER,
            {
                questionId: data.questionId,
                answer: data.answer,
            },
            header,
        ).then(async (response: any) => {
            // console.log('Answer123456', response)
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}


export async function getQuestionList(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.getRequest(api.QUESTION + '/?type=' + data.type, header).then(async (response: any) => {
            // console.log('getQuestionList', response)
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}



export async function questionSave(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        // console.log('SaveQuestionData', data.data)

        await RequestManager.postRequest(api.SAVE_QUESTION, {
            type: data.data.type,
            questionId: data.data.id,
            upvoted: data.data.upvoted,
            flagged: data.data.flagged,
            bookmarked: data.data.bookmarked
        }, header).then(async (response: any) => {
            // console.log('SaveQuestionData', response)
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}

export async function saveEndVideo(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        // console.log('SaveQuestionData', data.data)

        await RequestManager.postRequest(api.USERCOURSE, data.data, header).then(async (response: any) => {
            // console.log('SaveVideoData', response)
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}