// import React, { useState } from 'react';
// import { Image, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
// import { WheelPicker, TimePicker, DatePicker } from 'react-native-wheel-picker-android'
// import moment from 'moment'


// const weekdays = [
//   'sunday',
//   'monday',
//   'tuesday',
//   'wednesday',
//   'thursday',
//   'friday',
// ];

// const MyTimePicker = ({
//     myStyle,
//     placeholder,
//     value,
//     onChangeText,
//     secureTextEntry,
//     keyboardType,
//     autoComplete,
//     problem = '',
//   }) => {
//     const [isFocused, setIsFocused] = useState(false);
  
//     const handleFocus = () => {
//       setIsFocused(true);
//     };
  
//     const handleBlur = () => {
//       setIsFocused(false);
//     };
  
//     const borderColor = isFocused ? 'blue' : problem!='' ? 'red' : 'gray'; // Colore del contorno durante lo stato di focus
  
//     return (
//       <View style={styles.button}>
//         <TextInput
//           style={[myStyle, { borderColor: borderColor, borderWidth: 2 }]}
//           placeholder={placeholder}
//           value={value}
//           onChangeText={onChangeText}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           secureTextEntry={secureTextEntry}
//           keyboardType={keyboardType}
//           autoComplete={autoComplete}
//         />
//          <TimePicker 
//             initDate={new Date(moment().add(1, 'hour'))} 
//             onTimeSelected={(time) => {
//               setTime(time)
//               console.log('setting time', time)
//             }
//           }/>
//       </View>
//     );
//   };

//   const styles = StyleSheet.create({
//     button: {
//       alignItems: "center",
//       paddingHorizontal: 10,
//       paddingBottom: 5 ,
//       borderRadius: 5,
//       backgroundColor: "#f8f4fc",
//       display: 'flex',
//       width: '100%',
//       height: 45,
//       justifyContent: 'space-between',
//       alignContent: 'center',
//       textAlign: 'center',
//     },
//   });
//   export default MyTimePicker;

import React, {useState} from 'react';
import {
 SafeAreaView,
 StyleSheet,
 ScrollView,
 View,
 Text,
 StatusBar,
} from 'react-native';
import moment from 'moment'

import { WheelPicker, TimePicker, DatePicker } from 'react-native-wheel-picker-android'

const weekdays = [
 'sunday',
 'monday',
 'tuesday',
 'wednesday',
 'thursday',
 'friday',
];

const MyTimePicker = () => {
 const [selectedItem, setSelectedItem] = useState(0)
 const [time, setTime] = useState(new Date())
 const [date, setDate] = useState(new Date())
 return (
   <>
     <StatusBar barStyle="dark-content" />
     <SafeAreaView>
       <ScrollView
         contentInsetAdjustmentBehavior="automatic">
         <Text>{weekdays[selectedItem]}</Text>
         <WheelPicker onItemSelected={(index) => setSelectedItem(index)} data={weekdays}/>
         <Text>{moment(time).format('hh:mm a')}</Text>
         <TimePicker 
           initDate={new Date(moment().add(1, 'hour'))} 
           onTimeSelected={(time) => {
             setTime(time)
             console.log('setting time', time)
           }
         }/>
         <Text>{moment(date).format('DD.MM.YY hh:mm a')}</Text>
         <DatePicker mode={'date'} onDateSelected={date => setDate(date)}/>
       </ScrollView>
     </SafeAreaView>
   </>
 );
};

export default MyTimePicker;