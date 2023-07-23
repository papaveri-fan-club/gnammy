import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import LikeButton from './LikeButton';

const Recipe = ({ user, idUser, isLoggedIn=false,  item, index, updateRecipes, recipes, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe}) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);
  
    const toggleDescriptionVisible = () => {
      console.log("item: ", item);
      const updatedRecipes = [...recipes];
      updatedRecipes[index] = {
        ...item,
        isDescriptionVisible: !item.isDescriptionVisible,
      };
      updateRecipes(updatedRecipes);
      setIsDescriptionVisible(!isDescriptionVisible);
    };

   
  
    return (
      <TouchableOpacity
        style={{ marginBottom: 5, marginTop: 15 }}
        onPress={toggleDescriptionVisible}
      >
        <ImageBackground
          source={{ uri: 'http://192.168.1.8:19000/assets/R.jpg' }}
          style={{
            ...(item.isDescriptionVisible ? styles.readingDescription : styles.imageBackground),
            paddingBottom: 1,
          }}
          imageStyle={{
            resizeMode: 'cover',
            alignSelf: 'flex-end',
          }}
        >
          <View>
            <Text style={{ color: 'black', textAlign: 'center' }}>{item.title}</Text>
            <Text style={{ color: 'grey', textAlign: 'center' }}>{item.description}</Text>
            <Text style={{ color: 'grey', textAlign: 'center' }}>{item.likes + userFavouriteRecipes.includes(item.id)}</Text>
            <Text style={{color: "black", textAlign: 'center'}}>{item.creator}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 100 }}>
              {isLoggedIn ? <LikeButton idUser={idUser} item={item} index={index} userFavouriteRecipes={userFavouriteRecipes} addFavouriteRecipe={addFavouriteRecipe} removeFavouriteRecipe={removeFavouriteRecipe}/> : null /* se l'utente è loggato mostra il bottone like */} 
            </View>
            
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    imageBackground: {
      height: 200, // Imposta un'altezza fissa per l'immagine di sfondo
      width: '100%',
      backgroundColor: 'black',
      position: 'relative',
    },
    readingDescription: {
      // Stili quando la descrizione è visibile
      height: 300,
      width: '100%',
      backgroundColor: 'black',
      position: 'relative',
    },
    circle: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }); // Aggiungi questa parentesi graffa di chiusura

    export default Recipe;
  