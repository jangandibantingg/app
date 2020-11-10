import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ImageBackground} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format';

export default class ListCard extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      email : '',
     };

   
   }

   async getData(id) {
    var result = await AsyncStorage.getItem(id);
    if (result) {
         
      this.setState({  email : result });
      
     }
     
   }
   componentDidMount(){

    AsyncStorage.getItem('email', (error, result) => {
      if (result) {
          this.setState({  email : result });
      }
     });
     
    }
   

  render() {
    var emailData =this.state.email;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    // alert (emailData);
    const data = {foo: 'sales', date: today, email : emailData, mm : mm , yyyy : yyyy , dd : dd  } ;
    

    fetch(`https://backoffice.codercoffee.id/api/dashboard.php?k=${encodeURIComponent(data.foo)}&date=${encodeURIComponent(data.date)}&email=${encodeURIComponent(data.email)}&mm=${encodeURIComponent(data.mm)}&dd=${encodeURIComponent(data.dd)}&yyyy=${encodeURIComponent(data.yyyy)}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    .then(response => response.json())
   
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson
      })
      
    })
    .catch(error => console.log(error)) //to catch the errors if any

    return (

      <ImageBackground
      source={require("../assets/back.png")}
      style={{ width: "100%", height: "100%" }}
      >

      <SafeAreaView
        // onPress={this.props.onPress}
        style={{
          paddingHorizontal: 32,
          alignSelf: "center",
          marginTop: 100,
          backgroundColor: "#FFF",
          height: 182,
          elevation: 1,
          width: "90%",
          height : "43%",
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,
            // alignSelf: "center",
          }}
        >
          <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.penjualan_hari_ini} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.idrPenjualan}>{value}</Text>} />
        
         
        }
       />
       

          
        </View>

        

        <View
          style={{
            flexDirection: "row",
            // paddingTop: 20,
            // alignSelf: "center",
          }}
        >
          <Text
            style={{
            //   fontFamily: "RobotoRegular",
              color: "#a2a2db",
              fontSize: 14,
            //   paddingLeft: 61,
            }}
          >
            Penjualan 
          </Text>
        
        </View>
       

        <View
        style={{
        borderBottomColor: '#a2a2db',
        borderBottomWidth:3,
        marginTop : 10,
        }}
        />
        
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
         <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.transaction} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <Text style={styles.idrTitle}>{value}</Text>} />
        
         
        }
       />

          
        </View>

        <Text
          style={{
            // fontFamily: "RobotoRegular",
            color: "#a2a2db",
            fontSize: 12,
          }}
        >
          Total Transaksi
        </Text>

        <View
          style={{   
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
         <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.bahanbaku} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.idrTitle}>{value}</Text>} />
        
         
        }
       />

          
        </View>

        <Text
          style={{
            // fontFamily: "RobotoRegular",
            color: "#a2a2db",
            fontSize: 12,
          }}
        >
          Bahan Baku
        </Text>


        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
         <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.grossprofit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.idrTitle}>{value}</Text>} />
        
         
        }
       />

          
        </View>

        <Text
          style={{
            // fontFamily: "RobotoRegular",
            color: "#a2a2db",
            fontSize: 12,
          }}
        >
          GrossProfit / Laba Kotor
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
         <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.operasional} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.idrTitle}>{value}</Text>} />
        
         
        }
       />

          
        </View>

        <Text
          style={{
            // fontFamily: "RobotoRegular",
            color: "#a2a2db",
            fontSize: 12,
          }}
        >
         Biaya Operational
        </Text>

        

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
         <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.netprofit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.idrTitle}>{value}</Text>} />
        
         
        }
       />

          
        </View>

        <Text
          style={{
            // fontFamily: "RobotoRegular",
            color: "#a2a2db",
            fontSize: 12,
          }}
        >
         Net Profit / Laba Bersih
        </Text>







       
      
      </SafeAreaView>
      </ImageBackground>


     
    );
  }
}
const styles = StyleSheet.create({
    
    idrTitle: {
        fontSize : 15,
  
    }, 
    idrPenjualan: {
        fontSize : 24,
        fontWeight : "bold",
    }, 
    
  
  });