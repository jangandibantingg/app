import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SalesTrend from './screenSalesTrend'

export default class NotificationScreen extends React.Component {
    render (){
        return (
            <View style={style.container}>
                <Text>Notification Screen</Text>
                <SalesTrend/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems :  "center",
        justifyContent : "center"
    }
});