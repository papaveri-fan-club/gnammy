import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import Meal from './Meal';

export default function SetIngredients({ ingredientsOfTheWeek, setNewIngredientsOfTheWeek }) {
    const [breakfastIngredients, setBreakfastIngredients] = useState([[]]);
    const [morningSnackIngredients, setMorningSnackIngredients] = useState([[]]);
    const [lunchIngredients, setLunchIngredients] = useState([[]]);
    const [afternoonSnackIngredients, setAfternoonSnackIngredients] = useState([[]]);
    const [dinnerIngredients, setDinnerIngredients] = useState([[]]);

    useEffect(() => {
        setBreakfastIngredients(ingredientsOfTheWeek.breakfast);
        setMorningSnackIngredients(ingredientsOfTheWeek.morningSnack);
        setLunchIngredients(ingredientsOfTheWeek.lunch);
        setAfternoonSnackIngredients(ingredientsOfTheWeek.afternoonSnack);
        setDinnerIngredients(ingredientsOfTheWeek.dinner);
    }, [ingredientsOfTheWeek])


    return (
        <View>
            <View style={styles.backCard}>
                <Meal typeOfMeal="Breakfast" setIngredients={setBreakfastIngredients} ingredients={breakfastIngredients} zIndex={5} />
                <Meal typeOfMeal="Morning snack" setIngredients={setMorningSnackIngredients} ingredients={morningSnackIngredients} zIndex={4} />
                <Meal typeOfMeal="Lunch" setIngredients={setLunchIngredients} ingredients={lunchIngredients} zIndex={3} />
                <Meal typeOfMeal="Afternoon snack" setIngredients={setAfternoonSnackIngredients} ingredients={afternoonSnackIngredients} zIndex={2} />
                <Meal typeOfMeal="Dinner" setIngredients={setDinnerIngredients} ingredients={dinnerIngredients} zIndex={1} />
            </View>
            <Pressable
                style={{ width: 100, height: 50, backgroundColor: "#E9C46A", borderRadius: 10, alignSelf: "center", margin: 50, marginBottom: 130 }}
                onPress={() => {
                    const ingredientsOfTheWeek = {
                        'breakfast': breakfastIngredients,
                        'morningSnack': morningSnackIngredients,
                        'lunch': lunchIngredients,
                        'afternoonSnack': afternoonSnackIngredients,
                        'dinner': dinnerIngredients,
                    };
                    setNewIngredientsOfTheWeek(ingredientsOfTheWeek);
                }}
            >
                <Text style={{ textAlign: "center", marginTop: 15 }}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({ 
    backCard: {
        backgroundColor: "#F4F1DE",
        borderRadius: 10,
        padding: 5,
        margin: 10,
    },
});