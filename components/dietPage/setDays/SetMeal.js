import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import SetIngredient from './SetIngredient';

//setmeal è un componente che permete di aggiungere un ingrediente per ogni gruppo del pasto dayToChange
export default function SetMeal ({ typeOfMeal, groupsOfmeal, zIndex, setIngredients, ingredientAlreadyAdded }) {
    const [ingredientsChoosen, setIngredientsChoosen] = useState([[]]);
    // console.log("ingredientAlreadyAdded", ingredientAlreadyAdded);

    useEffect(() => {
        // console.log("ingredientsChoosen", ingredientsChoosen);
        setIngredients(ingredientsChoosen);
    }, [ingredientsChoosen])

    return (
        <View style={[styles.setMeal, { zIndex: zIndex }]} >
            <Text>{typeOfMeal}</Text>
            {groupsOfmeal.map((group, key) => {
                return (
                    <View style={{ width: '90%' }}>
                        <Text>Group {key + 1}</Text>
                        <SetIngredient listOfIngredients={group} zIndex={groupsOfmeal.length - key} setIngredientChoosen={(value) => {
                            ingredientAlreadyAdded = ingredientAlreadyAdded[key];
                            const newIngredientsChoosen = [...ingredientsChoosen];
                            newIngredientsChoosen[key] = value;
                            setIngredientsChoosen(newIngredientsChoosen);
                        }}
                        />
                    </View>
                )
            })}
            <View style={{ width: '90%', marginTop: 20 }}>
                <Text>ingredienti extra</Text>
                <SetIngredient listOfIngredients={[]} zIndex={0} setIngredientChoosen={(value) => {
                    const newIngredientsChoosen = [...ingredientsChoosen];
                    newIngredientsChoosen[ingredientsChoosen.length] = value;
                    setIngredientsChoosen(newIngredientsChoosen);
                }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    setMeal: {
        backgroundColor: "#E9C46A",
        borderRadius: 10,
        padding: 10,
        paddingRight: 5,
        paddingEnd: 5,
        margin: 10,
    },
});