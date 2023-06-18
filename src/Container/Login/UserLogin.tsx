
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { style } from './style';
import Images from '../../Resources/Images';
import CustomTextInputView from '../../Components/CustomTextInputView';

interface Props {
    this: any,
}

export default class UserLoginVw extends Component<Props> {

    render() {
        const self = this.props.this;
        console.log('this',this)

        return (
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <View style={style.socalVw}>
                    {Platform.OS == 'ios' ? (
                        <TouchableOpacity style={style.appleVw}
                        onPress={() => this.props.this.appleSignIn()}>
                            <Image source={Images.apple} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    ) : null}

                    <TouchableOpacity
                        style={style.googleVw}
                        onPress={() => self.googleSignIn()}>
                        <Image source={Images.google} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.facebookVw}
                        onPress={() => self.facebookSignIn()}>
                        <Image source={Images.facebook} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                </View>
                <Text style={style.orTx}>{'Or'}</Text>
                <View style={style.inputVw}>
                    <CustomTextInputView
                        height={48}
                        image={Images.email}
                        value={self.state.email}
                        onchangeText={(text: any) => self.setState({ email: text })}
                        placeholder={'Email'}
                        keyboardType={'email-address'}
                        secureTextEntry={false}
                        isCvv={false}
                        onEndEditing={() => { }}
                        onKeyPress={()=>{  
                        }}
                        autoCapitalize={'none'}
                        maxLength={50}
                    />
                    <CustomTextInputView
                        height={48}
                        image={Images.lock}
                        value={self.state.password}
                        onchangeText={(text: any) => self.setState({ password: text })}
                        placeholder={'Password'}
                        // keyboardType={'default'}
                        secureTextEntry={true}
                        isCvv={false}
                        onEndEditing={() => { }}
                        onKeyPress={()=>{  
                        }}
                        autoCapitalize={'words'}
                        maxLength={50}
                    />
                </View>
                <View style={{ flex: 1 }} />
                <Text style={style.alreadyTx}>{'New User?'}</Text>
                <Text
                    onPress={() => self.moveSignup()}
                    style={style.loginTx}>
                    {'SIGN UP'}
                </Text>
                <TouchableOpacity style={style.saveBt} onPress={() => self.login()}>
                    <Text style={style.saveTx}>{'LOGIN WITH EMAIL'}</Text>
                </TouchableOpacity>
                <View style={style.checkboxContainer}>
                    <Text
                        onPress={() => {
                            self.setState({ isLoading: false, email: '', password: '' })
                            self.props.navigation.navigate('ForgetPassword')
                        }}
                        style={style.label}>
                        {'Forgot '}
                    </Text>
                    <Text
                        onPress={() => {
                            self.setState({ isLoading: false, email: '', password: '' })
                            self.props.navigation.navigate('ForgetPassword')
                        }}
                        style={style.labelTx}>
                        {'Password?'}
                    </Text>
                </View>
            </View>
        )
    }
}
