import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ImageBackground, Icon} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format';
// import DateTimePicker from '@react-native-community/datetimepicker';

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
    const data = {foo: 'salesExperience', date: today, email : emailData, mm : mm , yyyy : yyyy , dd : dd  } ;
    

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
    .catch(error=>console.log(error)) //to catch the errors if any


    return (

      <ImageBackground
      source={require("../assets/back.png")}
      style={{ width: "100%", height: "100%" }}
    >

    <View style={{ paddingHorizontal: 40, marginTop: 50 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight : "bold",
              color: "#522289",
            //   fontFamily: "RobotoBold",
            }}
          >
            Transaksi

           
          </Text>
          </View>

          <SafeAreaView
        // onPress={this.props.onPress}
        style={{
          paddingHorizontal: 32,
          alignSelf: "center",
          marginTop: 20,
          backgroundColor: "#FFF",
          marginBottom : 5,
         
          elevation: 1,
          width: "98%",
          height : "85%",
          borderRadius: 15,
        }}
      >
          <FlatList
                       
                       keyExtractor = { (item, index) => index.toString() }
                           data={this.state.dataSource}
                           renderItem={({item}) => 
                           <View >
                          <Text style={styles.TitleName}>{item.name}
                           <NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={''} renderText={name => <Text >{name}</Text>} />
                           </Text>
                           <Text style={styles.idrTitle}>{item.total}
                           <NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={''} renderText={total => <Text >{total} Item</Text>} />
                           </Text>
                            {/* line */}
                           <View
                            style={{
                            borderBottomColor: '#a2a2db',
                            borderBottomWidth:0.5,
                            marginTop : 10,
                            }}
                            />
        
                           
                           </View>
                           }
                       />
                       

          </SafeAreaView>


      </ImageBackground>


     
    );
  }
}
const styles = StyleSheet.create({
    
    idrTitle: {
        fontSize : 12,
        color: "#a2a2db",
      
  
    }, 
    TitleName: {
        fontSize : 15,
        fontWeight : "bold",
        marginTop : 10,
    }, 
    
  
  });