import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import LikeButton from './LikeButton';
import { useNavigation } from '@react-navigation/native';

const Recipe = ({ idUser, isLoggedIn = false, item, index, updateRecipes, recipes, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe, ITEM_HEIGHT, ITEM_WIDTH, scrollY, inputRange, height }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);
  const Vheight = height / (index < 10 || parseInt(index / 10));

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginBottom: 5,
        marginTop: 15,
        overflow: 'hidden',
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 10, // Rimuovi il bordo dal container principale
        borderColor: '#f0a202', // Questa proprietà non è più necessaria
      }}
      onPress={() => navigation.navigate('recipePage', { item })}
    >
      {/* Immagine con trasformazione */}
      <Animated.Image
        style={{
          height: ITEM_HEIGHT * 2,
          width: ITEM_WIDTH,
          resizeMode: 'cover',
          position: 'absolute',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange,
                outputRange: [-Vheight * 0.1, 0, Vheight * 0.1],
              }),
            },
          ],
        }}
        source={item.category === 'Primo' ? require('../assets/img_categories/primo.jpeg') : item.category === 'Secondo' ? require('../assets/img_categories/secondo2.jpeg') : item.category === 'Dolce' ? require('../assets/img_categories/dolce.jpg') : require('../assets/img_categories/antipasto.jpeg')}
      />
      {/* Sovrapposizione nera per scurire l'immagine */}
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', width: '100%', height: '100%' }} />
      {/* Box come sfondo di item.category */}
      <View style={styles.categoryBackground} >
        {/* <View style={styles.UnderText}/> */}

        <Text style={[styles.details, { fontSize: 35, fontWeight: 'bold' }]}>{item.title}</Text>
        <Text style={[styles.details, { fontSize: 15, fontWeight: 'bold', width: '80%' }]}>{item.description != undefined ? item.description.length > 40 ? item.description.slice(0, 37) + '...' : item.description : null}</Text>
        <Text style={[styles.details, { width: '80%' }]}>{item.category}</Text>
        <Text style={[styles.details, {}]}>Creator @{item.creator_username}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
        {isLoggedIn ? <LikeButton idUser={idUser} item={item} userFavouriteRecipes={userFavouriteRecipes} addFavouriteRecipe={addFavouriteRecipe} removeFavouriteRecipe={removeFavouriteRecipe} likes={item.likes + userFavouriteRecipes.includes(item.id)} /> : null /* se l'utente è loggato mostra il bottone like */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Soprapposizione nera con opacità
    width: '100%',
    height: '100%',
  },
  categoryBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    borderRadius: 10,
    width: '85%',
    maxHeight: '70%',
    blurRadius: 20,
    zIndex: 0,
  },
  UnderText: {
    backgroundColor: '#36190F',
    marginTop: 6,
    marginLeft: -12,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    width: '70%',
    height: '20%',
    zIndex: 0,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  textContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  details: {
    color: 'white',
    textAlign: 'center',
    padding: 5,
  }
});

export default Recipe;

