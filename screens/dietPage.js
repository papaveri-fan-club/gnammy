import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Autocomplete from "../components/AutocompleteForMeal";
import { storeData, getData } from "../components/functions/AsyncStorage";
import { Pressable } from "react-native";

export default function DietPage({setShowDietPage}) {
    const [breakfastIngredients, setBreakfastIngredients] = useState([[]]);
    console.log("breakfastIngredients", breakfastIngredients);
    const [morningSnackIngredients, setMorningSnackIngredients] = useState([[]]);
    console.log("morningSnackIngredients", morningSnackIngredients);
    const [lunchIngredients, setLunchIngredients] = useState([[]]);
    console.log("lunchIngredients", lunchIngredients);
    const [afternoonSnackIngredients, setAfternoonSnackIngredients] = useState([[]]);
    console.log("afternoonSnackIngredients", afternoonSnackIngredients);
    const [dinnerIngredients, setDinnerIngredients] = useState([[]]);
    console.log("dinnerIngredients", dinnerIngredients);
    
    const defaultIngredientsOfTheWeek = {
        'breakfast': breakfastIngredients,
        'morningSnack': morningSnackIngredients,
        'lunch': lunchIngredients,
        'afternoonSnack': afternoonSnackIngredients,
        'dinner': dinnerIngredients,
    };
    const [ingredientsOfTheWeek, setIngredientsOfTheWeek] = useState(defaultIngredientsOfTheWeek);
    const getIngredientsOfTheWeek = async () => {
        if (ingredientsOfTheWeek!=defaultIngredientsOfTheWeek) {
            console.log("ingredientsOfTheWeek", ingredientsOfTheWeek);
            return;
        }
        const ingredientsOfTheWeekSaved = await getData("ingredientsOfTheWeek");
        const ingredients = JSON.parse(ingredientsOfTheWeekSaved);
        console.log("ingredients took from the function", ingredients);
        if (ingredients!=undefined) {
            console.log("ingredients that will return ", ingredients);
            setIngredientsOfTheWeek(ingredients);
            setBreakfastIngredients(ingredients.breakfast);
            console.log("breakfastIngredients", breakfastIngredients);
            setMorningSnackIngredients(ingredients.morningSnack);
            console.log("morningSnackIngredients", morningSnackIngredients);
            setLunchIngredients(ingredients.lunch);
            console.log("lunchIngredients", lunchIngredients);
            setAfternoonSnackIngredients(ingredients.afternoonSnack);
            console.log("afternoonSnackIngredients", afternoonSnackIngredients);
            setDinnerIngredients(ingredients.dinner);
            console.log("dinnerIngredients", dinnerIngredients);
        }
    }
    getIngredientsOfTheWeek();


    const setNewIngredientsOfTheWeek = (ingredients) => {
        setIngredientsOfTheWeek(ingredients);
        const ingredientsJSON = JSON.stringify(ingredients);
        storeData(ingredientsJSON, "ingredientsOfTheWeek")
            .then(() => {
                console.log("Data stored");
            })
            .catch((error) => {
                console.log("Something went wrong", error);
            })
        getIngredientsOfTheWeek();
    }
    


    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: "center", justifyContent: 'space-around', padding: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setShowDietPage(false)}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                    source={require("../assets/hamburger.png")}
                />
                <View style={{ width: 24 }}/>
            </View>
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
        </ScrollView>
    );
}
const Meal = ({ typeOfMeal, setIngredients, zIndex, ingredients }) => {
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
            {/* <FlatList
                scrollEnabled={false}
                data={ingredients}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                        <MealGroup
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
                )}
            /> */}
            {ingredients.map((item, index) => {
                console.log(typeOfMeal)
                console.log("item", item);
                console.log();
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
            {/* <MealGroup
                setIngredientsByIndex={setIngredientsByIndex}
                numberOfGroup={ingredients.length}
                ingredients={[]}
                deleteThisGroup={() => {
                    // Create a new array of ingredients without the object to delete that is the index of the group
                    var newIngredients = [...ingredients];
                    newIngredients.pop();
                    setIngredients(newIngredients);
                }}
            /> */}
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

const MealGroup = ({ ingredients, setIngredientsByIndex, numberOfGroup, deleteThisGroup }) => {
    var newIngredients = [...ingredients];
    useEffect(() => {
        if (newIngredients != ingredients == 0) {
            return;
        }
    })
    return (
        <View>
            <Pressable onPress={deleteThisGroup} style={{ width: 24 }}>
                <Ionicons name="remove-circle-outline" size={24} color="red" />
            </Pressable>
            <Text>Group {numberOfGroup + 1}</Text>
            <Autocomplete
                ingredientsAlreadyAdded={ingredients}
                myStyle={{ width: 300, marginBottom: 10 }}
                onChangeText={(value) => {
                    setIngredientsByIndex(numberOfGroup, value);
                }}
                legend={false}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#FFEFAF",
    },

    backCard: {
        backgroundColor: "#F4F1DE",
        borderRadius: 10,
        padding: 5,
        margin: 10,
    },

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
