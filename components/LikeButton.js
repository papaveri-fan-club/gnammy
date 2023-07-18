import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const LikeButton = ({ user, item, index, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe }) => {
    const idRecipe = item.id;
    const [isLiked, setIsLiked] = useState(userFavouriteRecipes.includes(idRecipe));

    const [colorHeart, setColorHeart] = useState(isLiked ? 'red' : 'grey');
    useEffect(() => {
        setIsLiked(userFavouriteRecipes.includes(idRecipe));
        console.log(item.title, 'isLiked: ', isLiked)
        setColorHeart(isLiked ? 'red' : 'grey');
    }, [userFavouriteRecipes]);
    useEffect(() => {
        setColorHeart(isLiked ? 'red' : 'grey');
    }, [isLiked]);

    const handleLike = () => {
          if (userFavouriteRecipes.includes(idRecipe)) {
            setIsLiked(false);
            axios.post(`http://79.32.231.27:8889/removeFavouriteRecipe/${user.id}`, {idRecipe})
            .then(res => {
              console.log('rimosso!');
              removeFavouriteRecipe(idRecipe, index);
            })
            .catch(error => {
              console.log(error);
            });
          } else {
            setIsLiked(true);
            console.log("item: ", idRecipe)
            axios.post(`http://79.32.231.27:8889/addFavouriteRecipe/${user.id}`, {idRecipe})
            .then(res => {
              console.log('aggiunto!');
              addFavouriteRecipe(idRecipe, index);
            })
            .catch(error => {
              console.log(error);
            });
          }
      };

    return (
        <View>
            <TouchableOpacity style={styles.circle} onPress={handleLike}>
                <Ionicons name="ios-heart" size={40} color={colorHeart} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default LikeButton;