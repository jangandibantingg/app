import React from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format';

export default class MenuExperiece extends React.Component {
        
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
    render (){
        
      var emailData =this.state.email;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
  
      today = yyyy + '/' + mm + '/' + dd;
      // alert (emailData);
      const data = {foo: 'menu_experiece', date: today, email : emailData, mm : mm , yyyy : yyyy , dd : dd  } ;
      
  
      fetch(`https://backoffice.codercoffee.id/api/dashboard.php?menu_experiece=${encodeURIComponent(data.foo)}&date=${encodeURIComponent(data.date)}&email=${encodeURIComponent(data.email)}&mm=${encodeURIComponent(data.mm)}&dd=${encodeURIComponent(data.dd)}&yyyy=${encodeURIComponent(data.yyyy)}`, {
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
            <View >
               <Text > Penjualan Terbanyak </Text>
                        <View >
                        <View>
                        <FlatList
                       
                        keyExtractor = { (item, index) => index.toString() }
                            data={this.state.dataSource}
                            renderItem={({item}) => 
                            <View >
                           <Text>{item.label}
                            <NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <Text>{value}</Text>} />
                           
                            </Text>
                            
                            </View>
                            }
                        />
                        
                        </View>
                        </View>
            </View>
        )
    }
}






