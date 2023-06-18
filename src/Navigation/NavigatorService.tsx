import { CommonActions, StackActions, DrawerActions, useRoute } from '@react-navigation/native';
import { NavigationActions, NavigationParams, NavigationRoute } from 'react-navigation';


import * as React from 'react';

export const navigationRef: any = React.createRef();
// const route = useRoute();
//@ts-ignore
export function navigate(name, params) {
  //@ts-ignore
  navigationRef.current?.navigate(name, params);


}

export function reset(routeName: string, params?: NavigationParams) {
  //@ts-ignore
  navigationRef.current?.reset({
    routes: [{ name: routeName, params: params }],
  });

}

export function toggle() {
  //@ts-ignore
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  // console.log();
}

export function goBack() {
  //@ts-ignore
  navigationRef.current?.dispatch(StackActions.pop());
}

export function resetBeforeHome(routeName: string, routeName2: string, params?: NavigationParams) {
  //@ts-ignore
  // var prevScreen = navigationRef.current?.getCurrentRoute().name == "Home" ? "Home" : "My List"
  navigationRef.current?.reset({
    index: 1,
    routes: [{ name: routeName }, { name: routeName2 }],
  });
}

export function resetBeforeHomeWithIndex(routeName: string, index: number, params?: NavigationParams) {
  //@ts-ignore
  // var prevScreen = navigationRef.current?.getCurrentRoute().name == "Home" ? "Home" : "My List"
  navigationRef.current?.reset({
    index: index,
    routes: [{ name: routeName }],
  });
}

export function navigateToTabScreen(routeName: string, screenName: string, params: any) {
  //@ts-ignore
  navigationRef.current?.navigate(routeName, {
    screen: screenName,
    params: params,
  });
}