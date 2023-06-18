import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import Toast from 'react-native-simple-toast';
export async function getEvent(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.getRequest(api.LIVEEVENT + '?type=' + data.type, header).then(async (response: any) => {
            // console.log('getEvent 123456', JSON.stringify(response))
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}

// get token api
export async function getToken(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.getRequest(api.EVENTTOKEN + '?channelName=' + data, header).then(async (response: any) => {
            // console.log('getEvent 123456', JSON.stringify(response))
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}


// Save Event

export async function SaveEvent(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.postRequest(api.SAVEEVENT, {
            liveTalkId: data.param.id,
            bookmarked: data.param.bookmark
        
        }, header).then(async (response: any) => {
            // console.log('SaveEvent 123456', JSON.stringify(response))
            resolve(response)
        })
        .catch(function (error: any) {
            console.log('error', error)
            reject(error.message)
        });
});
}

// Search Event

export async function SearchEvent(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.getRequest(api.LIVEEVENT + '?type=' + data.type+'&title='+data.title, header).then(async (response: any) => {
            // console.log('getEvent 123456', JSON.stringify(response))
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}


//  ********************************************* get Save event data *********************************************************




export async function getSaveEvent(data: any) {
    return await new Promise(async function (resolve, reject): Promise<void> {
        let header = {
            'Authorization': data.token != '' ? 'Bearer ' + data.token : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        await RequestManager.getRequest(api.SAVEEVENT, header).then(async (response: any) => {
            // console.log('getSaveEvent 123456', JSON.stringify(response))
            resolve(response)
        })
            .catch(function (error: any) {
                console.log('error', error)
                reject(error.message)
            });
    });
}