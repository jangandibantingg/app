import React from 'react';
import {  AntDesign } from '@expo/vector-icons'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MessageScreen from './screens/MessageScreen'
import PostScreen from './screens/PostScreen'
import NotificationScreen from './screens/NotificationScreen'
import ProfileScreen from './screens/ProfileScreen'


// Initialize Firebase



const AppContainer = createStackNavigator(
  
  {
   default :  createBottomTabNavigator({
      Beeranda : {
        screen: HomeScreen,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <AntDesign
                    name="home"
                    color={tintColor}
                    size={24}
                />
            )
        })
    },
      Transaksi: {
        screen: MessageScreen,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <AntDesign
                    name="swap"
                    color={tintColor}
                    size={24}
                />
            )
        })
    },
      
    Stock : { 
      screen: PostScreen,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
              <AntDesign
                  name="shoppingcart"
                  color={tintColor}
                  size={24}
                  // style={{
                  //   shadowColor:"#e9446a",
                  //   shadowOffset : {width:0, height:0},
                  //   shadowRadius: 10,
                  //   shadowOpacity : 0.3
                    
                  // }}
              />
          )
      })
    },
    invoice : {
      screen: NotificationScreen,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
              <AntDesign
                  name="filetext1"
                  color={tintColor}
                  size={24}
              />
          )
      })
    },
    Profile : {
      screen: ProfileScreen,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
              <AntDesign
                  name="user"
                  color={tintColor}
                  size={24}
              />
          )
      })
    }
    
    
    },
    { 
      defaultNavigationOptions : {
            tabBarOnPress: ({navigation, defaultHandler}) => {
              if(navigation.state.key == 'post')
              {
                navigation.navigate("postModal")

              }else{
                defaultHandler();
              }
            }
      },
      tabBarOptions : {
      activeTintColor : "#161f3d",
      inactiveTintColor : "#b8bbc4",
      showLabel : true
    }
    }
   ),
   postModal : {
     screen : PostScreen
   }
  },
  {
    mode : "modal",
    headerMode : "none",

  }
)
// const AppTabsNavigator =


const AuthStack = createStackNavigator({
  Login : LoginScreen,
  Register : RegisterScreen
})


export default createAppContainer(
  
  createSwitchNavigator(
    {
      Loading : LoadingScreen,
      App  : AppContainer,
      Auth : AuthStack
    },
    {
      initialRouteName : "Loading"
    }
  )
);