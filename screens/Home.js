import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import Recipes from '../components/Recipes';
import axios from 'axios';
import HeaderRightButton from '../components/HeaderRightButton';
import { set } from 'react-native-reanimated';

export default function Home({user, userFavouriteRecipes, updateUserFavouriteRecipes}) {
  //refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  //get recipes
  const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  useEffect(() => {
    axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
      .get('http://79.32.231.27:8889/getRecipes')
      .then(response => {
        const data = response.data;        // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
        const updatedData = data.map(item => {
          if(userFavouriteRecipes.includes(item.id)){
            return {...item, isLiked: true};
          }else{
            return {...item, isLiked: false};
          }
        });
        console.log(updatedData);        // Stampa i dati sulla console
        setItems(updatedData);        // Imposta gli elementi ottenuti come valore dello stato 'items'
      })
      .catch(error => {
        console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console

      });
    setRefreshing(false);
  }, [refreshing]);

  const updateItems = (data) => {
    setItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };
  return (
    <View style={styleContainer.container}>      
        <Recipes items={items} updateItems={updateItems} user={user} userFavouriteRecipes={userFavouriteRecipes} updateUserFavouriteRecipes={updateUserFavouriteRecipes} refreshing={refreshing} onRefresh={onRefresh} />
    </View>
  );
}

const styleContainer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
