//@ts-ignore
import { View, TouchableOpacity, TouchableHighlight, Image, Text, TextInput, Modal, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import ScaleSheet from 'react-native-scalesheet';
import Colors, * as Color from '../res/colors/index'


export const NoDataFoundView = (props: any) => {
    const { warning_message } = props
    return (
        <View style={[styles.no_data_found_main_view]}>
            {/* <Image style={[styles.no_data_img, { resizeMode: 'cover' }]}  /> */}
            <Text style={styles.no_data_found_text}>{warning_message}</Text>
        </View>
    )
}
export const NoInternetFoundView = (props: any) => {
    const { func } = props
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 400, width: 400, resizeMode: 'contain' }} source={require('../Resources/Assets/internet_error.png')} />
            {/* <Text style={styles.light_text}>Please check your internet connection</Text> */}
            <TouchableOpacity style={{ padding: 30 }} onPress={func}>
                <Text style={{ color:'red', textDecorationLine: 'underline', fontWeight: "bold" }}>Try Again</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = ScaleSheet.create({
    //Button
    header:{
        flexDirection:"row",
        // backgroundColor:'blue',
        alignItems:'center',
        paddingTop:60,
        paddingHorizontal:10,
    },
    backBtn:{
        // backgroundColor:'red',
        width:'20%',
    },
    title:{
        // backgroundColor:'green',
        width:'60%',
        textAlign:'center',
        fontSize:21
    },
    no_data_found_main_view: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    no_data_img: {
        marginTop: 50,
        width: 200,
        height: 150,
    },
    no_data_found_text: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 14,
        color: Colors.TAB_TXT
    },
})
