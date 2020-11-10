import React, { useState, useEffect } from 'react';

//Import all required component
import {   View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';




const SplashScreen = props => {
    //State for ActivityIndicator animation
    let [animating, setAnimating] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        AsyncStorage.getItem('email').then(value =>
          props.navigation.navigate(
            value === null ? 'Auth' : 'App'
          )
        );
      }, 1000);
    }, []);
  

 
        return(
            <View style={styles.container}>
                  <Image source={require("../assets/cashub-logo.png")} style={{ width : 200, height: 200}} ></Image>
                  {/* <Image source={require("../assets/New-shape.png")} style={styles.newshape}></Image> */}
                  {/* <Image source={require("../assets/scren.png")}  style={styles.screen} ></Image> */}
            </View>
        );
    

}
export default SplashScreen;
const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor : "#0BB3BE"
    },
    newshape : {
        width : 659,
        height : 396,
        // justifyContent: "center",
        // top : 400,
        position : "absolute"
    },
    screen : {
        flex:1,
        width : 375,
        height : 667,
        // justifyContent: "center",
        // top : 200,
        position : "absolute"
    }


});