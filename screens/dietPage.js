import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { storeData, getData } from "../components/functions/AsyncStorage";

import  SetIngredients  from "../components/dietPage/setIngredients/SetIngredients";
import  SetDays  from "../components/dietPage/setDays/SetDays";

export default function DietPage({ setShowDietPage }) {
    const defaultIngredientsOfTheWeek = {
        'breakfast': [[]],
        'morningSnack': [[]],
        'lunch': [[]],
        'afternoonSnack': [[]],
        'dinner': [[]],
    };
    const [ingredientsOfTheWeek, setIngredientsOfTheWeek] = useState(ingredientsOfTheWeek==undefined ? defaultIngredientsOfTheWeek: ingredientsOfTheWeek);
    const [downloaded, setDownloaded] = useState(false);

    const getIngredientsOfTheWeek = async () => {
        // if (ingredientsOfTheWeek != defaultIngredientsOfTheWeek) {
        //     return;
        // }
        const ingredientsOfTheWeekSaved = await getData("ingredientsOfTheWeek");
        setDownloaded(true);
        console.log("ingredientsOfTheWeekSaved: ", ingredientsOfTheWeekSaved);
        const ingredients = JSON.parse(ingredientsOfTheWeekSaved);
        if (ingredients != undefined) {
            setIngredientsOfTheWeek(ingredients);
            // setBreakfastIngredients(ingredients.breakfast);
            // console.log("breakfastIngredients", breakfastIngredients);
            // setMorningSnackIngredients(ingredients.morningSnack);
            // console.log("morningSnackIngredients", morningSnackIngredients);
            // setLunchIngredients(ingredients.lunch);
            // console.log("lunchIngredients", lunchIngredients);
            // setAfternoonSnackIngredients(ingredients.afternoonSnack);
            // console.log("afternoonSnackIngredients", afternoonSnackIngredients);
            // setDinnerIngredients(ingredients.dinner);
            // console.log("dinnerIngredients", dinnerIngredients);
        }
    }
    if (!downloaded) getIngredientsOfTheWeek();

    const [pageVisible, setPageVisible] = useState('setIngredients');


    const setNewIngredientsOfTheWeek = async (ingredients) => {
        setIngredientsOfTheWeek(ingredients);
        if (ingredientsOfTheWeek == await getData("ingredientsOfTheWeek")) return;
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


    if (!downloaded) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    else {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => console.log(ingredientsOfTheWeek.breakfast)}>
                    <Text>ingredientsOfTheWeek</Text>
                </TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: 'space-around', padding: 20, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setShowDietPage(false)}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        source={require("../assets/hamburger.png")}
                    />
                    <View style={{ width: 24 }} />
                    <View style={{ alignItems: "center", justifyContent: 'space-around', padding: 20, flexDirection: 'row' }}>
                        {/*crea due touchableopacity uno per settare gli ingredienti, già creato il modo ed uno per settare i pasti per ogni giorno*/}
                        <TouchableOpacity onPress={() => setPageVisible('setIngredients')}>
                            <Ionicons name="fast-food-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPageVisible('setDays')}>
                            <Ionicons name="calendar-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                {pageVisible == 'setIngredients' ?
                    <SetIngredients ingredientsOfTheWeek={ingredientsOfTheWeek} setNewIngredientsOfTheWeek={setNewIngredientsOfTheWeek} />
                    :
                    <SetDays ingredientsOfTheWeek={ingredientsOfTheWeek} setIngredientsOfTheWeek={setIngredientsOfTheWeek} />
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#FFEFAF",
    },

    titleContainer: {
        paddingTop: 100,
        paddingBottom: 30,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 30,
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
    },
    title: { fontSize: 20, fontWeight: 'bold' },
    themeContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    themeButton: {
        borderWidth: 4,
        width: 32,
        height: 32,
        borderRadius: 32,
        margin: 5,
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
    },
});
