import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import {  AntDesign } from '@expo/vector-icons'
import NumberFormat from 'react-number-format';
import MenuExperiece from './penjualan-terlaris';

export default class App extends Component {

    
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
   

    render(){

      var emailData =this.state.email;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
  
      today = yyyy + '/' + mm + '/' + dd;
      // alert (emailData);
      const data = {foo: 'dashboard', date: today, email : emailData, mm : mm , yyyy : yyyy , dd : dd  } ;
      
  
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
    <View style={styles.container}>
        <View style={styles.top} >
        <Text style= {styles.titleIDr}>Penjualan Hari ini</Text>
     
      <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.penjualan_hari_ini} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.idrTitle}>{value}</Text>} />
        
         
        }
       />
 
            {/* <View style={styles.icon}>
                
                <TouchableOpacity style={styles.TouchableOpacityICon} >
                            <AntDesign name="isv" style={styles.AntDesignIcon}> 
                            <Text style={styles.txticon}> Outlet</Text> 
                            </AntDesign>   
                            
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacityICon} >
                        <AntDesign name="sharealt" style={styles.AntDesignIcon}> 
                        <Text style={styles.txticon}> Arus Kas</Text> 
                        </AntDesign>   
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacityICon} >
                        <AntDesign name="contacts" style={styles.AntDesignIcon}> 
                        <Text style={styles.txticon}> Pegawai</Text> 
                        </AntDesign>   
                </TouchableOpacity>
            
            </View> */}
            
      
           
        </View>


<View style={styles.Bottom} >
            <Text style={{ top: 20, fontWeight: "normal", fontSize: 15, left : 10,}}> Ringkasan Bulan ini  </Text>
            
           

    <SafeAreaView style={styles.SafeAreaView}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.headercard}>
                        <AntDesign style={styles.profileImg} name="down" style={{ fontSize: 12, borderRadius: 50, }} />
                        <Text style={{fontWeight:"normal",fontSize:12}}> Uang Masuk</Text>
                        
                </View>
                <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.sumIncome} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.numbercard}>{value}</Text>} />
        
         
        }
       />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <View style={styles.headercard}>
                        <AntDesign style={styles.profileImg} name="up" style={{ fontSize: 12, borderRadius: 50, }} />
                        <Text style={{fontWeight:"normal",fontSize:12}}> Uang Keluar</Text>
                </View>
                <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.sumPengeluaran} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.numbercard}>{value}</Text>} />
        
         
        }
       />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <View style={styles.headercard}>
                        <AntDesign style={styles.profileImg} name="bank" style={{ fontSize: 12, borderRadius: 50, }} />
                        <Text style={{fontWeight:"normal",fontSize:12}}> Biaya Operasional Perhari</Text>
                        
                </View>
                <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.operasional_hari} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.numbercard}>{value}</Text>} />
        
         
        }
       />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <View style={styles.headercard}>
                        <AntDesign style={styles.profileImg} name="folder1" style={{ fontSize: 12, borderRadius: 50, }} />
                        <Text style={{fontWeight:"normal",fontSize:12}}> Total Setoran Cash</Text>
                </View>
                <FlatList
         keyExtractor = { (item, index) => index.toString() }
         data={this.state.dataSource}
         renderItem={({item}) => 
       
         <NumberFormat value={item.setoran} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={styles.numbercard}>{value}</Text>} />
        
         
        }
       />
            </TouchableOpacity>
           
    </SafeAreaView>
    <SafeAreaView style={styles.SafeAreaView}>
            
    <MenuExperiece style={styles.salessummary}/>
           
    </SafeAreaView>
   
  
   
</View>
       
      
        
</View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1.3,
  },
  SafeAreaView: {
    justifyContent: "space-around",
    flexDirection:"row",
    alignContent : "stretch",
    paddingHorizontal : 20,
    paddingVertical : 20,
    height:100,
    width:"100%",
    

  },
  top: {
    flex: 0.3,
    backgroundColor: "#0BB3BE",
    borderWidth: 0,
    marginLeft : 0,
    borderBottomLeftRadius: 0 ,
    borderBottomRightRadius: 0 ,
    justifyContent: "space-around",
    alignItems: 'center',
  },
  
  Bottom: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    borderWidth: 0,
    borderTopRightRadius : 10,
    borderTopLeftRadius : 10,
 
  
  },
  idrTitle: {
    flex: 1,
    fontSize : 32,
    justifyContent : "center",
    alignContent : "center",

    fontWeight : "bold",
    // position : "absolute",
    color : '#fff',
    // top : 65,
    paddingTop :  70,
 

  }, 
  titleIDr: {
    fontSize : 14,
    
    position : "absolute",
    color : '#fff',
    top : 50,


  },
    idrtransaksi: {
    fontSize : 16,
    fontWeight : "bold",
    position : "absolute",
    color : '#fff',
    top : 120,
    marginLeft : 30,
  
  }, 
  card:{
    // top : 30,
    // height:70,
    width:"50%",
    backgroundColor:"#fff",
    elevation:10,
    padding:10,
    borderStartWidth : 0,
    // alignItems : "left",
    marginLeft: "auto",
    
  },
  headercard: {
    flexDirection:"row",
    alignItems :"center"
  },
  numbercard :{
    fontSize:19,
    fontWeight:"bold", 
    justifyContent : "center",  
    paddingTop : 5,
},
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  icon :{
        flexDirection : "row",
        bottom : 25,
        
  },
txticon :{
    fontSize:12   
},
TouchableOpacityICon : {
    paddingRight :10,
    alignItems: "center"
},
AntDesignIcon : {
    fontSize:12,  
    backgroundColor : '#fff',
    borderRadius:20,
    elevation:10,
    padding:12
}, 
MenuExperiece: {
  fontSize : 16,
  fontWeight : "bold",
  position : "absolute",
}

});

// export default ViewStyleProps;
