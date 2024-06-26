import React, { useEffect, useState } from 'react';
import ListCategories from '../../components/ListCategories';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import MyTextInput from '../../components/TextInput';
import Autocomplete from '../../components/Autocomplete';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


const CompileRecipe = ({ recipeInitialState, recipe, setRecipe, starsSelected, setStarsSelected, createRecipe }) => {
  const osName = Platform.OS;
  const [show, setShow] = useState(osName === 'ios' ? true : false);

  const handleInputChange = (campo, value) => {
    const newRecipe = { ...recipe };
    newRecipe[campo] = value;
    console.log(newRecipe);
    setRecipe(newRecipe)
  };

  const showTimePicker = () => {
    setShow(true);
  };

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setHours(parseInt(recipe.time.split(':')[1], 10));
    setMinutes(parseInt(recipe.time.split(':')[2], 10));
  }, [recipe.time]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingLeft: '25%' }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.title}>Descrivi la tua ricetta...</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold',fontStyle:'semibold',  marginTop: 10}}>{recipe.category}</Text>
          </View>
          <View style={{ width: '25%', justifyContent: 'flex-end', alignItems: 'center' }} >
            <TouchableOpacity onPress={() => setRecipe(recipeInitialState)}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <MyTextInput myStyle={{ width: 150, height: 40, marginTop: 20 }}
            maxLength={50}
            value={recipe.title}
            onChangeText={(value) => handleInputChange('title', value)}
            placeholder="Nome della ricetta"
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 190, height: 50, alignItems: 'center' }}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Per quante persone?</Text>
          <MyTextInput
            maxLength={2}
            myStyle={{ width: 40, height: 20, borderWidth: 1, borderRadius: 10, textAlign: 'center', padding: 0, marginLeft: 10 }}
            value={recipe.portions}
            onChangeText={(value) => handleInputChange('portions', value)}
          />
        </View>
        <MyTextInput
          maxLength={400}
          myStyle={{ width: 300, marginTop: 10 }}
          value={recipe.description}
          onChangeText={(value) => handleInputChange('description', value)}
          placeholder="Descrizione"
        />
        <Autocomplete
          myStyle={{ width: 300, marginTop: 20, marginBottom: 20 }}
          defaultValue='ciao'
          onChangeText={(value) => handleInputChange('ingredients', value)}
        />
        <MyTextInput
          maxLength={10000}
          myStyle={{ width: 300, marginTop: 20 }}
          value={recipe.preparation}
          onChangeText={(value) => handleInputChange('preparation', value)}
          placeholder="Preparazione"
        />
          {(osName!=='ios') ? (
            <Text style={{fontWeight: 'bold', padding: 5}}>Tempo attuale: {recipe.time}</Text>
          ) :
            (<Text style={{fontWeight: 'bold', padding: 5}}>Tempo attuale: {recipe.time}</Text>)
          }
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5, display: 'flex', flexDirection: 'row',}}>
         {(recipe.time.split(':')[0] != 0) && (
          <Pressable 
            style={{marginLeft: 10, borderRadius: 7, padding: 10, backgroundColor: 'rgb(235, 235, 235)', height: 40}}
            onPress={() => {
            const date = recipe.time.split(':');
            const day = parseInt(date[0]) - 1;
            const hours = parseInt(date[1]);
            const minutes = parseInt(date[2]);
            handleInputChange('time', day + ':' + hours + ':' + minutes)
          }
          }>
            <Text style={{textDecorationLine: 'underline',}}>-24 h</Text>
          </Pressable> )}
          <Pressable 
            style={{marginLeft: 10, borderRadius: 7, padding: 10, backgroundColor: 'rgb(235, 235, 235)', height: 40}}
            onPress={() => {
            const date = recipe.time.split(':');
            const day = parseInt(date[0]) + 1;
            const hours = parseInt(date[1]);
            const minutes = parseInt(date[2]);
            handleInputChange('time', day + ':' + hours + ':' + minutes)
          }
          }>
            <Text style={{textDecorationLine: 'underline',}}>+24 h</Text>
          </Pressable>

          {(show || osName==='ios') && (
            
              <RNDateTimePicker
                value={new Date(0, 0, 0, hours, minutes, 0, 0)}
                mode="time"
                is24Hour={true}
                display= {osName === 'ios' ? 'default' : 'spinner'}
                onChange={(event, selectedDate) => {
                  const day = recipe.time.split(':')[0];
                  const hours = selectedDate.getHours();
                  const minutes = selectedDate.getMinutes();
                  setShow(false);
                  handleInputChange('time', day + ':' + hours + ':' + minutes)
                  console.log(recipe.time)
                  console.log(day + ':' + hours + ':' + minutes)
                  console.log(new Date(0, 0, 0, parseInt(recipe.time.split(':')[1], 10), parseInt(recipe.time.split(':')[2], 10), 0, 0))
                }}
              />
            )}
            {(osName!== 'ios' ) && (
              <Pressable onPress={showTimePicker} style={{marginLeft: 10, borderRadius: 7, padding: 10, backgroundColor: 'rgb(235, 235, 235)', height: 40, width: 70, justifyContent: 'center',}}>
                <Text style={{fontSize: 16, textAlign: 'center', justifyContent: 'center',}}>{recipe.time.split(':')[1]} : {recipe.time.split(':')[2]}</Text>
              </Pressable>)}
            </View>
          
        <Pressable
          style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "33%", }}
          onPress={() => handleInputChange('gluten', !recipe.gluten)}
        >
          <View style={{ display: "flex", flexDirection: "row", justifyContent:'center', marginTop: 5, alignItems: 'center', marginLeft: 20 }}>
            <Text style={{ marginRight: 10,}} >Gluten free</Text>
            {recipe.gluten ? (<AntDesign name="closecircleo" size={20} color="red" />) : (<AntDesign name="checkcircleo" size={20} color="green" />)}
          </View>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 5, alignItems: 'center',  }}>
          <Text>Difficoltà  </Text>
          <Pressable onPress={() => starsSelected !== 1 && setStarsSelected(1)}>
            <MaterialCommunityIcons name={starsSelected >= 1 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 2 && setStarsSelected(2)}>
            <MaterialCommunityIcons name={starsSelected >= 2 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 3 && setStarsSelected(3)}>
            <MaterialCommunityIcons name={starsSelected >= 3 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 4 && setStarsSelected(4)}>
            <MaterialCommunityIcons name={starsSelected >= 4 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 5 && setStarsSelected(5)}>
            <MaterialCommunityIcons name={starsSelected >= 5 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
        </View>

        <Pressable onPress={createRecipe} style={{backgroundColor: 'rgb(235, 235, 235)', padding: 5, width: 90, borderRadius: 7, height: 50, justifyContent: 'center' }}>
          <Text style={{ lineHeight: 29, color: "black", fontSize: 17, fontWeight: "bold", textAlign: 'center'}}>Crea</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  square: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 8,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#C79309'
  },
  containerStyle: {
    position: 'absolute',
    height: 100,
    flex: 1,
    flexDirection: 'row', 
  },
  autocompleteContainerStyle: {
    height: 100,
    flex: 1,
    height: 100,
  },
});

export default CompileRecipe