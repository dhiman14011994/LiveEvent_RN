/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
const axios = require('axios');
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from "@react-native-community/netinfo";

class RequestManager {
  //--------------------------------------------------
  //GET REQUEST WITH PARAMS
  static async getParamsRequest(url: any, token: string, parameters: any) {
    const instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API: ', url);

    console.log('\n API Parameters: ', parameters);

    return new Promise(function (resolve, reject) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          console.log("start >> " + 'net connected')
      instance
        .get(url, {
          params: parameters,
        })
        .then(function (response: any) {
          console.log('API Response: ', response);
          resolve(response);
        })
        .catch(function (error: any) {
          console.log('Error2: ', error.response);
          if (error.response != null || error.response != undefined) {
            
          if (error.response.data.message != undefined) {
            reject({error: error.response.data.message});
          } else {
            reject(error.response.data);
          }
        }
          else {
            reject({"message":"Internet not found"})
          }
        })
        .finally(function () {
          console.log('Error: 0');
          reject('Something went wrong. Please try again later.');
        });
      }
      else {
        console.log('Internet not Conencted')
        reject({"message":"Internet not found"})
      }
    });
    });
  }
  //--------------------------------------------------
  //GET REQUEST WITHOUT PARAMS
  static async getRequest(url: any, headers: any) {
    const instance = axios.create({
      baseURL: url,
      headers: headers,
    });

    console.log('API: ', url);
   

    return new Promise(function (resolve, reject) {
      NetInfo.fetch().then(state => {
        console.log("start >> " + state.isConnected)
        if (state.isConnected) {
          console.log("start >> " + 'net connected')
          console.log('API: ', url);
      instance
        .get(url)
        .then(function (response: any) {
          console.log('Response: ', response);
          resolve(response.data);
        })
        .catch(function (error: any) {
          console.log('Error1: ', error);
          if (error.response != null || error.response != undefined) {
          if (error.response.data.message != undefined) {
            reject({error: error.response.data.message});
          } else {
            reject(error.response);
          }
        }
        else {
          reject({"message":"Internet not found"})
        }
        })
        .finally(function () {
          console.log('Error: 0');
          reject('Something went wrong. Please try again later.');
        });
      }
      else {
        console.log('Net not Conencted')
        reject({"message":"Internet not found"})
      }
    });
    });
  }
  //--------------------------------------------------
  //POST REQUEST
  static async postRequest(url: any, params: any, headers: any) {
    const instance = axios.create({
      baseURL: url,
      headers: headers,
    });

    console.log('API: ', url);
    console.log('\nHeader Parameters: ', headers);
    console.log('\nAPI Parameters: ', params);
    console.log('\ninstance: ', instance);
    return await new Promise(function (resolve, reject) {
      NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
      instance
        .post(url, params)
        .then(function (response: any) {
          console.log('POST API Response: ', response);
          resolve(response.data);
        })
        .catch(function (error: any) {
          console.log('Post API Error: ', error.response);
          if (error.response != null || error.response != undefined) {
          if (error.response.data == undefined) {
            reject({error: 'Something went wrong. Please try again later.'});
          } else {
            if (error.response.data.message != undefined) {
              reject({error: error.response});
            } else {
              reject(error.response);
            }
          }
        }
        else {
          reject({"message":"Internet not found"})
        }
        });
      }
      else {
        console.log('Net not Conencted')
        reject({'message':"Internet not found"})
      }
    })
    });
  }
  //--------------------------------------------------
  //PUT REQUEST
  static async putRequest(url: string, params: any, header: any) {
    const instance = axios.create({
      baseURL: url,
      headers: header,
    });

    console.log('API Headers: ', header);
    console.log('API: ', `${url}`);
    console.log('\nAPI Parameters: ', params);
    return await new Promise(function (resolve, reject) {
      NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
      instance
        .put(url, params)
        .then(function (response: any) {
          console.log('POST API Response: ', response);
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (error.response != null || error.response != undefined) {
          console.log('Post API Error: ', error);
          reject(error);
        }
        else {
          reject({"message":"Internet not found"})
        }
        });
      }
      else {
        console.log('Net not Conencted')
        reject({"message":"Internet not found"})
      }
    })
    });
  }
  //--------------------------------------------------
  //DELETE REQUEST
  static async deleteRequest(url: any, params: any, token: any) {
    console.log('start>> url', JSON.stringify(url));
    const instance = axios.create({
      baseURL: url,
      headers: {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    });

    console.log('API Headers: ', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    console.log('API: ', url);
    console.log('\nAPI Parameters: ', params);
    return await new Promise(function (resolve, reject) {
      NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
      instance
        .delete(url, params)
        .then(function (response: any) {
          console.log('DELETE API Response: ', response);
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (error.response != null || error.response != undefined) {
          console.log('DELETE API Error: ', error.response);
          reject(error.response.data.error);
        }
        else {
          reject({"message":"Internet not found"})
        }
        });
      }
      else {
        console.log('Net not Conencted')
        reject({"message":"Internet not found"})
      }
    })
    });
  }
  //--------------------------------------------------
  static async uploadImage(url: any, token: string, params: any[]) {
    console.log('API: ', url);
    console.log('PARAMS: ', params);

    console.log('HEADERS: ', {
      Authorization: token != '' ? 'Bearer ' + token : '',
      'Content-Type' : 'multipart/form-data',
    });

    return await new Promise(function (resolve, reject) {
      NetInfo.fetch().then(state => {

        if (state.isConnected) {
      RNFetchBlob.config({timeout: 7000})
        .fetch(
          'PUT',
          url,
          {
            Authorization: token != '' ? 'Bearer ' + token : '',
            'Content-Type' : 'multipart/form-data',
          },
          params,
        )
        .then((res) => {
          console.log('UPLOAD RESPONSE: ', JSON.stringify(res));
          resolve(res);
        })
        .catch((err: any) => {
          if (err.response != null || err.response != undefined) {
          reject(err);
          console.log('Upload Error: ', JSON.stringify(err));
        }
        else {
          reject({"message":"Internet not found"})
        }
        });
      }
      else {
        console.log('Net not Conencted')
        reject({"message":"Internet not found"})
      }
    })
    });
  }
}

export default RequestManager;
