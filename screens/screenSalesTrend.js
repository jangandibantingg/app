import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  
  const showDatepicker = () => {
    showMode('date');
  };

  console.log(date);

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title={ Date()}/>
        {/* <Text> {this.state.selectedDate} </Text> */}
      </View>
     
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          locale="id_ID" 
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default App;