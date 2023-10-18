import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Autocomplete from "../components/Autocomplete";

export default function DietPage() {
    const [breakfastIngredients, setBreakfastIngredients] = useState([]);
    const [morningSnackIngredients, setMorningSnackIngredients] = useState([]); // snack = spuntino
    const [lunchIngredients, setLunchIngredients] = useState([]);
    const [afternoonSnackIngredients, setAfternoonSnackIngredients] = useState([]);
    const [dinnerIngredients, setDinnerIngredients] = useState([]);
    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: "center", padding: 20 }}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                    source={require("../assets/hamburger.png")}
                />
            </View>
            <View style={styles.backCard}>
                <Meal typeOfMeal="Breakfast" setIngredients={setBreakfastIngredients} zIndex={5} />
                <Meal typeOfMeal="Morning snack" setIngredients={setMorningSnackIngredients} zIndex={4} />
                <Meal typeOfMeal="Lunch" setIngredients={setLunchIngredients} zIndex={3} />
                <Meal typeOfMeal="Afternoon snack" setIngredients={setAfternoonSnackIngredients} zIndex={2} />
                <Meal typeOfMeal="Dinner" setIngredients={setDinnerIngredients} zIndex={1} />
            </View>
        </ScrollView>
    );
}
const Meal = ({ typeOfMeal, setIngredients, zIndex }) => {
    return (
        <View style={[styles.card, { zIndex: zIndex }]}>
            <Text style={styles.cardTitle}>{typeOfMeal}</Text>
            <Autocomplete
                myStyle={{ width: 300, marginBottom: 10 }}
                onChangeText={(value) => setIngredients(value)}
                legend={true}
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
        marginBottom: 150
    },

    card: {
        backgroundColor: "#E9C46A",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        position: "relative",
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
    },
});
