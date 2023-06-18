
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform,KeyboardAvoidingView,Dimensions } from 'react-native';
import { style } from './style';
import Images from '../../Resources/Images';
import CustomTextInputView from '../../Components/CustomTextInputView';

interface Props {
    this: any,
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ModeratorLogin extends Component<Props> {

    render() {
        const self = this.props.this;

        return (
            <View style={{flex:1}}>
            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
            <View style={{flex:1, alignItems: 'center',}}>               
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
                        maxLength={50}
                        autoCapitalize={'none'}
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
                        onKeyPress={()=>{  
                        }}
                        autoCapitalize={'words'}
                        onEndEditing={() => { }}
                        maxLength={50}
                    />
                </View>
                <View style={{height:'50%',width:'100%',alignItems:'center'}}/>
                <TouchableOpacity style={style.saveBt} onPress={() => self.login()}>
                    <Text style={style.saveTx}>{'LOGIN AS MODERATOR'}</Text>
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
            
            </KeyboardAvoidingView>
            </View>
        )
    }
}
