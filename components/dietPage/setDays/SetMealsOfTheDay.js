import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import SetMeal from './SetMeal';

export default function SetMealsOfTheDay ({ day, ingredientsOfTheWeek, ingredientsOfTheDay }) {
    const [breakfastIngredients, setBreakfastIngredients] = useState(ingredientsOfTheDay.breakfast);
    const [morningSnackIngredients, setMorningSnackIngredients] = useState(ingredientsOfTheDay.morningSnack);
    const [lunchIngredients, setLunchIngredients] = useState(ingredientsOfTheDay.lunch);
    const [afternoonSnackIngredients, setAfternoonSnackIngredients] = useState(ingredientsOfTheDay.afternoonSnack);
    const [dinnerIngredients, setDinnerIngredients] = useState(ingredientsOfTheDay.dinner);

    const setTheIngredientsOfTheDay = async (meals) => {
        const mealsJSON = JSON.stringify(meals);
        const dayJSON = JSON.stringify(day);
        const mealsAndDay = { mealsJSON, dayJSON };
        // console.log("mealsAndDay", mealsAndDay);
        var mealsAlreadySaved = await getData("mealsOfdays");
        mealsAlreadySaved = JSON.parse(mealsAlreadySaved);
        //fai un consoloe.log di tutti gli elementi in colonna di ogni elemento nell'array
        if (mealsAlreadySaved && mealsAlreadySaved.length > 0) {
            // console.log("mealsAlreadySaved", mealsAlreadySaved);
            var newMealsAlreadySaved = [...mealsAlreadySaved, mealsAndDay];
            //controolla che nessun giorno abbia lo syesso giorno di quello che stai salvando
            for (let i = 0; i < newMealsAlreadySaved.length-1; i++) {
                if (newMealsAlreadySaved[i].dayJSON == dayJSON) {
                    newMealsAlreadySaved[i] = mealsAndDay;
                    newMealsAlreadySaved.pop();                    
                    return;
                }
            }
            // console.log("newMealsAlreadySaved", newMealsAlreadySaved);
            const stringMealsAlreadySavedJSON = JSON.stringify(newMealsAlreadySaved);
            // console.log("stringMealsAlreadySavedJSON", stringMealsAlreadySavedJSON);
            await storeData(stringMealsAlreadySavedJSON, "mealsOfdays");
        } else {
            // console.log("mealsAndDay", mealsAndDay);
            const stringMealsAndDay = JSON.stringify([mealsAndDay]);
            await storeData(stringMealsAndDay, "mealsOfdays");
        }
    }

    return (
        <View>
            <View style={styles.backCard}>
                <SetMeal typeOfMeal="Breakfast" groupsOfmeal={ingredientsOfTheWeek.breakfast} zIndex={5} setIngredients={setBreakfastIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.breakfast} />
                <SetMeal typeOfMeal="Morning snack" groupsOfmeal={ingredientsOfTheWeek.morningSnack} zIndex={4} setIngredients={setMorningSnackIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.morningSnack} />
                <SetMeal typeOfMeal="Lunch" groupsOfmeal={ingredientsOfTheWeek.lunch} zIndex={3} setIngredients={setLunchIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.lunch} />
                <SetMeal typeOfMeal="Afternoon snack" groupsOfmeal={ingredientsOfTheWeek.afternoonSnack} zIndex={2} setIngredients={setAfternoonSnackIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.afternoonSnack} />
                <SetMeal typeOfMeal="Dinner" groupsOfmeal={ingredientsOfTheWeek.dinner} zIndex={1} setIngredients={setDinnerIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.dinner} />
            </View>
            <Pressable
                style={{ width: 100, height: 50, backgroundColor: "#E9C46A", borderRadius: 10, alignSelf: "center", margin: 20, marginBottom: 30 }}
                onPress={() => {
                    const ingredientsOfTheWeek = {
                        'breakfast': breakfastIngredients,
                        'morningSnack': morningSnackIngredients,
                        'lunch': lunchIngredients,
                        'afternoonSnack': afternoonSnackIngredients,
                        'dinner': dinnerIngredients,
                    };
                    console.log("ingredientsOfTheWeek", ingredientsOfTheWeek);
                    setTheIngredientsOfTheDay(ingredientsOfTheWeek);
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