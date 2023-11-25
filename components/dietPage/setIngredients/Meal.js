import React from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MealGroup from './MealGroup';

export default function Meal ({ typeOfMeal, setIngredients, zIndex, ingredients }) {
    const setIngredientsByIndex = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    }
    return (
        <View style={[styles.card, { zIndex: zIndex }]}>
            <Text style={styles.cardTitle}>{typeOfMeal}</Text>
            <Text>dividi il tuo pasto per i diversi cibi che mangi e scegli un ingrediente (tra quelli che aggiungi) per ogni gruppo che crei</Text>
            {/* crea due pulsanti + e meno che aggiungono gruppi e tolgono in modo da poter aggiungere diversi ingredienti per ogni gruppo*/}
            {ingredients.map((item, index) => {
                return (
                    <MealGroup
                        key={item.length != 0 ? item[0].title : index}
                        setIngredientsByIndex={setIngredientsByIndex}
                        numberOfGroup={index}
                        ingredients={item}
                        deleteThisGroup={() => {
                            // Create a new array of ingredients without the object to delete that is the index of the group
                            var newIngredients = [...ingredients];
                            newIngredients.splice(index, 1);
                            setIngredients(newIngredients);
                        }}
                    />
                )
            })}
            <Pressable
                style={{ width: 24 }}
                onPress={() => {
                    if (ingredients[ingredients.length - 1].length == 0) {
                        return (
                            alert("You have to fill the last group before adding a new one")
                        )
                    }
                    var newIngredients = [...ingredients];
                    newIngredients.push([]);
                    setIngredients(newIngredients);
                }}>
                <Ionicons name="add-circle-outline" size={24} color="green" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#E9C46A",
        borderRadius: 10,
        padding: 10,
        paddingRight: 5,
        paddingEnd: 5,
        margin: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
    },
});