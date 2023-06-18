import NetInfo from "@react-native-community/netinfo";
export const internetcheck = async () => {
    return await new Promise((resolve, reject) => {
        NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if (state.isConnected === true) {
                resolve(state.isConnected)
            }
            else {
                reject(false)
            }
        });

    })
}