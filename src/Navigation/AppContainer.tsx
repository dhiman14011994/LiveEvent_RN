/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../Container/Splash';
import Signup from '../Container/Signup';
import Login from '../Container/Login';
import ForgetPassword from '../Container/ForgetPassword';
import Otp from '../Container/Otp';
import ChangePassword from '../Container/ChangePassword';
import Successful from '../Container/Successful';
import AppBottomTabNavigator, { GuestTabContainer, LiveTalkStack } from './TabbarNavigation';
import Drawer from './Drawer';
import PlanPayment from '../Container/PlanPayment';
import AllCourse from '../Container/AllCourse';
import Trending from '../Container/Trending';
import Featured from '../Container/Featured';
import Instructors from '../Container/Instructors';
import { navigationRef } from './NavigatorService'
import LiveTalks from '../Container/LiveTalks';
import Chat from '../Container/Chat';
import MyList from '../Container/MyList';
import Home from '../Container/Home';
import Profile from '../Container/Profile';
import Payment from '../Container/Payment';
import Subscription from '../Container/Subscription';
import AddCard from '../Container/AddCard';
import MyProfile from '../Container/MyProfile';
import TabContainer from './TabbarNavigation';

const SplashStack = createStackNavigator();
const SplashStackScreen = () => (
  <SplashStack.Navigator headerMode='none'>
    <SplashStack.Screen name="Splash" component={Splash} />
  </SplashStack.Navigator>
);

const SignupStack = createStackNavigator();
const SignupStackScreen = () => (
  <SignupStack.Navigator headerMode='none'>
    <SignupStack.Screen name="Signup" component={Signup} />
    <SignupStack.Screen name="Login" component={Login} />
    <SignupStack.Screen name="ForgetPassword" component={ForgetPassword} />
    <SignupStack.Screen name="Otp" component={Otp} />
  </SignupStack.Navigator>
);

const HomeStack = createDrawerNavigator();

const HomeStackScreen = () => (
  //@ts-ignore
  <HomeStack.Navigator drawerContent={(props) => <Drawer {...props} />} drawerStyle={{ backgroundColor: 'transparent', width: '85%' }}>
    <HomeStack.Screen name="HomeStack" component={AppBottomTabNavigator} />
    <HomeStack.Screen name="Trending" component={Trending} />
    <HomeStack.Screen name="AllCourse" component={AllCourse} />
    <HomeStack.Screen name="Instructors" component={Instructors} />
    <HomeStack.Screen name="Featured" component={Featured} />
    <HomeStack.Screen name="My List" component={MyList} />
  </HomeStack.Navigator>
)

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name="SplashStackScreen" component={SplashStackScreen} />
    <RootStack.Screen name="Signup" component={Signup} />
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="ForgetPassword" component={ForgetPassword} />
    <RootStack.Screen name="Otp" component={Otp} />
    <RootStack.Screen name="ChangePassword" component={ChangePassword} />
    <RootStack.Screen name="Pay" component={PlanPayment} />
    <RootStack.Screen name="Successful" component={Successful} />
    <RootStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
    <RootStack.Screen name="GuestStack" component={GuestTabContainer} />
  </RootStack.Navigator>
);


export const AppContainer = () => (
  //@ts-ignore
  <NavigationContainer ref={navigationRef} >
    <RootStackScreen />
  </NavigationContainer>
);
