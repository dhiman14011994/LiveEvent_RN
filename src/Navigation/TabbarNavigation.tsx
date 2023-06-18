
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
//@ts-ignore
import { AnimatedTabBarNavigator, DotSize } from 'react-native-animated-nav-tab-bar';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import Home from '../Container/Home';
import LiveTalks from '../Container/LiveTalks';
import Chat from '../Container/Chat';
import MyList from '../Container/MyList';
import JoinCall from '../Container/JoinCall';
import Profile from '../Container/Profile';
import Payment from '../Container/Payment';
import Subscription from '../Container/Subscription';
import AllCourse from '../Container/AllCourse';
import Instructors from '../Container/Instructors';
import Featured from '../Container/Featured';
import Trending from '../Container/Trending';
import AddCard from '../Container/AddCard';
import MyProfile from '../Container/MyProfile';
import Player from '../Container/Player';
import Colors from '../res/colors';
//@ts-ignore
import Icon from 'react-native-vector-icons/Feather';;
import font from '../Resources/Fonts';
import Notification from '../Container/Notification';
import Messages from '../Container/Messages';
import UserChangePassword from '../Container/UserChangePassword';
import Categories from '../Container/Categories';
Icon.loadFont();
interface Props {
  navigation: NavigationScreenProp<any, any>;
}

/** Containers */

export type TabberParamList = {
  Home: {};
  LiveTalks: {};
  Chat: {};
  MyList: {};
  JoinCall: {};
};

export const styles1 = StyleSheet.create({
  tabStyle: {
    flex: 1,
    height: 40,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export const styles = ScaleSheet.create({
  tabHeight: 65,
  tabImage: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  titleTxt: {
    width: 80,
    fontSize: 12,
    marginTop: 2,

    color: 'white',
    textAlign: 'center',
  },
  titleSelTxt: {
    width: 80,
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const myStack = createDrawerNavigator();
//@ts-ignore
const Context = React.createContext();

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator headerMode='none'>
    <ProfileStack.Screen name="Profile" component={Profile} />
    <ProfileStack.Screen name="AllCourse" component={AllCourse} />

    <ProfileStack.Screen name="Instructors" component={Instructors} />

    <ProfileStack.Screen name="Featured" component={Featured} />

    <ProfileStack.Screen name="Trending" component={Trending} />
    <ProfileStack.Screen name="UserChangePassword" component={UserChangePassword} />
  </ProfileStack.Navigator>
);
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name="Home" component={Home} />

    <Stack.Screen name="Profile" component={ProfileStackScreen} />

    <Stack.Screen name="Payment" component={Payment} />

    <Stack.Screen name="Subscription" component={Subscription} />

    <Stack.Screen name="AllCourse" component={AllCourse} />

    <Stack.Screen name="Instructors" component={Instructors} />

    <Stack.Screen name="Featured" component={Featured} />

    <Stack.Screen name="Trending" component={Trending} />

    <Stack.Screen name="AddCard" component={AddCard} />

    <Stack.Screen name="MyProfile" component={MyProfile} />

    <Stack.Screen name="Player" component={Player} />

    <Stack.Screen name="Notification" component={Notification} />
    
    <Stack.Screen name="Categories" component={Categories} />
    <Stack.Screen name="Messages" component={Messages} />




  </Stack.Navigator>
);


const MyListStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name="My List" component={MyList} />

    <Stack.Screen name="Profile" component={ProfileStackScreen} />

    <Stack.Screen name="Payment" component={Payment} />

    <Stack.Screen name="Subscription" component={Subscription} />

    <Stack.Screen name="AddCard" component={AddCard} />

    <Stack.Screen name="MyProfile" component={MyProfile} />

    <Stack.Screen name="Player" component={Player} />

    <Stack.Screen name="AllCourse" component={AllCourse} />

    <Stack.Screen name="Instructors" component={Instructors} />

    <Stack.Screen name="Featured" component={Featured} />

    <Stack.Screen name="Trending" component={Trending} />
    <Stack.Screen name="Notification" component={Notification} />
  </Stack.Navigator>
);

export const LiveTalkStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="LiveTalks"
      component={LiveTalks}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="JoinCall"
      component={JoinCall}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Messages"
      component={Messages}
      options={{ headerShown: false }}
    />

    <Stack.Screen name="AllCourse" component={AllCourse} />

    <Stack.Screen name="Instructors" component={Instructors} />

    <Stack.Screen name="Featured" component={Featured} />

    <Stack.Screen name="Trending" component={Trending} />

    <Stack.Screen name="Profile" component={ProfileStackScreen} />

    <Stack.Screen name="Payment" component={Payment} />

    <Stack.Screen name="Subscription" component={Subscription} />

    <Stack.Screen name="AddCard" component={AddCard} />

    <Stack.Screen name="MyProfile" component={MyProfile} />

    <Stack.Screen name="Player" component={Player} />

    <Stack.Screen name="Notification" component={Notification} />

  </Stack.Navigator>
);

export const GuestLiveTalkStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="JoinCall"
      component={JoinCall}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="Messages" component={Messages} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Notification" component={Notification} />
  </Stack.Navigator>
);

HomeStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (
        route.routeName === 'ChangePassword'
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

MyListStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (
        route.routeName === 'Messages'
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

LiveTalkStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (
        route.routeName === 'Messages'
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

ChatStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (
        route.routeName === 'InviteFriend'
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};




const Tabs = AnimatedTabBarNavigator();

export default function TabContainer(): JSX.Element {
  const [screen, setScreen] = React.useState(0);

  return (
    <Context.Provider value={{ screen, setScreen }}>
      <Tabs.Navigator
        initialRouteName="Home"
        // tabBar={(props: any) => (
        //   <View style={{ width: 5, height: 20, borderRadius: 5 }} />
        // )}
        tabBarOptions={{
          activeTintColor: Colors.TAB_TXT,
          activeBackgroundColor: Colors.TAB_BG_COLOR,
          tabStyle: { backgroundColor: Colors.APP_Splash_BG_COLOR, borderRadius: 1 },
          labelStyle: { fontFamily: font.SEGOE_UI_BOLD },

        }}
        appearence={{
          dotCornerRadius: 10
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeStack}

          options={{
            headerStyle: { dotCornerRadius: 2 },

            tabBarIcon: ({ focused, color, size }: any) => (

              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/home_icon.png') : require('./Assets/home.png')}
                style={{ width: 23, height: 23, alignSelf: 'center' }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="My List"
          component={MyListStack}
          options={{
            headerStyle: { borderRadius: 1, },
            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/active_bookmark.png') : require('./Assets/bookmark.png')}
                style={{ width: 23, height: 23, alignSelf: 'center' }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Live Talks"
          component={LiveTalkStack}
          options={{
            headerStyle: { borderRadius: 1, },

            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/active_mic.png') : require('./Assets/mic.png')}
                style={{ width: 23, height: 23, alignSelf: 'center', }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          component={ChatStack}
          options={{
            headerStyle: { borderRadius: 1, },
            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/active_chat.png') : require('./Assets/chat.png')}
                style={{ width: 23, height: 23, alignSelf: 'center' }}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </Context.Provider>
  );
}

export function GuestTabContainer(): JSX.Element {
  const [screen, setScreen] = React.useState(0);

  return (
    <Context.Provider value={{ screen, setScreen }}>
      <Tabs.Navigator
        initialRouteName="Live Talks"
        tabBarOptions={{
          activeTintColor: Colors.TAB_TXT,
          activeBackgroundColor: Colors.TAB_BG_COLOR,
          tabStyle: { backgroundColor: Colors.APP_Splash_BG_COLOR, borderRadius: 1 },
          labelStyle: { fontFamily: font.SEGOE_UI_BOLD },
          dotSize:'large',
        }}
        appearence={{
          dotCornerRadius: 10
        }}
        
      >
        <Tabs.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerStyle: { dotCornerRadius: 2 },
            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/home_icon.png') : require('./Assets/home.png')}
                style={{ width: 23, height: 23, alignSelf: 'center' }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="My List"
          component={MyListStack}
          options={{
            headerStyle: { borderRadius: 1, },
            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/active_bookmark.png') : require('./Assets/bookmark.png')}
                style={{ width: 23, height: 23, alignSelf: 'center' }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Live Talks"
          component={GuestLiveTalkStack}
          options={{
            headerStyle: { borderRadius: 1, },
            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/active_mic.png') : require('./Assets/mic.png')}
                style={{ width: 23, height: 23, alignSelf: 'center', }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Chat"
          component={ChatStack}
          options={{
            headerStyle: { borderRadius: 1, },
            tabBarIcon: ({ focused, color, size }: any) => (
              <Image
                //@ts-ignore
                tintColor={focused ? Colors.APP_BODY_BLUE : Colors.APP_WHITE}
                source={focused ? require('./Assets/active_chat.png') : require('./Assets/chat.png')}
                style={{ width: 23, height: 23, alignSelf: 'center' }}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </Context.Provider>
  );
}


