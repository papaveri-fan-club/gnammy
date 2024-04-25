import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import IngredientsAutocomplete from "./IngredientsAutocomplete";
import RNSingleSelect from "@freakycoder/react-native-single-select";

export default function Autocomplete({
    myStyle,
    onChangeText,
    legend = true,
}) {
    const [inputText, setInputText] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({
        title: "",
        amount: "",
        unit: "",
    });
    const [buttonPressed, setButtonPressed] = useState(false); // Stato di focus per gli ingredienti

    // Aggiungi un nuovo ingrediente alla lista degli ingredienti
    useEffect(() => {
        console.log("buttonPressed", buttonPressed);
        setButtonPressed(false);
        if (inputText == "") {
            console.log('ingredient.title == ""');
            return;
        }
        if (ingredient.amount == "") {
            console.log('ingredient.amount == ""');
            return;
        }
        if (ingredient.unit == "") {
            console.log('ingredient.unit == ""');
            return;
        }

        // Crea un nuovo oggetto con le modifiche
        const newIngredient = {
            title: inputText,
            amount: ingredient.amount,
            unit: ingredient.unit,
        };

        // Aggiungi il nuovo ingrediente all'array ingredien
        setIngredients([...ingredients, newIngredient]);

        // Resetta gli stati
        setIngredient({ title: "", amount: "", unit: "" });
        setInputText("");
    }, [buttonPressed]);

    // Aggiorna il valore di default
    useEffect(() => {
        console.log("ingredients", ingredients);
        onChangeText(ingredients);
    }, [ingredients]);

    return (
        <View style={[myStyle, { zIndex: 10000 }]}>
            {/* questo è il componente che mostra la legenda */}
            <IndexTable />
            <View
                style={{ display: "flex", flexDirection: "row", zIndex: 1000 }}
            >
                <View style={{ display: "flex", justifyContent: "center" }}>
                    {/* questo è il componente che prende in input dove inserire gli ingredienti */}
                    <IngredientsAutocomplete
                        inputText={inputText}
                        setInputText={setInputText}
                        setIngredient={setIngredient}
                    />
                </View>
                {/* questo è il componente che prende in input la quantità e l'unità di misura */}
                <View
                    style={{
                        width: "50%",
                        height: 23,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {/* questo è il componente che prende in input la quantità */}
                    <SquareAmount
                        ingredient={ingredient}
                        setIngredient={setIngredient}
                    />
                    {/* questo è il componente che prende in input l'unità di misura */}
                    <SquareUnit
                        ingredient={ingredient}
                        setIngredient={setIngredient}
                    />
                </View>
                {/* questo è il componente che aggiunge l'ingrediente consigliato premuto alla lista */}
                <Pressable
                    style={{
                        width: "10%",
                        height: 45,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        setButtonPressed(true);
                    }}
                >
                    <Ionicons name="add-circle-outline" size={30} />
                </Pressable>
            </View>
            {/* questo è il componente che mostra la lista degli ingredienti già inseriti*/}
            <View style={{ width: "100%" }}>
                <FlatList
                    style={{
                        width: "100%",
                        zIndex: 0,
                        borderBottomWidth: 1,
                        borderColor: "grey",
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        overflow: "hidden",
                        backgroundColor: "white",
                    }}
                    data={ingredients}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <IngredientTable
                            ingredient={item}
                            recipeNumber={index}
                            lastIngredient={ingredients.length - 1}
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                        />
                    )}
                    keyExtractor={(item) => item.title}
                />

                {legend ? (
                    <View>
                        <Text style={{ marginTop: 20, fontSize: 12 }}>
                            Legenda quantità:{" "}
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            •g = grammi{"\n"}•pz = pezzi{"\n"}•qb = quanto basta
                            {"\n"}•ml = millilitri{"\n"}•cc = cucchiaini{"\n"}•c
                            = cucchiai
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

const SquareAmount = ({ ingredient, setIngredient }) => {
    const [isFocused, setIsFocused] = useState(false);

    // Se l'unità di misura è "qb" la quantità non è modificabile
    var editableAmount = true;
    if (ingredient.unit == "qb") {
        ingredient.amount = "*";
        editableAmount = false;
    }

    return (
        <TextInput
            style={[
                styles.squareAmount,
                { borderColor: isFocused ? "blue" : "grey" },
            ]}
            maxLength={4}
            editable={editableAmount}
            value={ingredient.amount}
            keyboardType="numeric"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(value) => {
                value = value.replace(",", ".");
                const newIngredient = { ...ingredient, amount: value };
                setIngredient(newIngredient);
            }}
        />
    );
};

const SquareUnit = ({ ingredient, setIngredient }) => {
    const staticData = [
        { id: 0, value: "g" },
        { id: 1, value: "pz" },
        { id: 2, value: "qb" },
        { id: 3, value: "ml" },
        { id: 4, value: "cc" },
        { id: 5, value: "c" },
    ];

    return (
        <View style={{ width: "40%", flex: 1 }}>
            {/* questo è il componente che mostra la lista delle unità di misura su cui premere per selezionarne una*/}
            <RNSingleSelect
                width={75}
                height={45}
                menuBarContainerWidth={60}
                menuBarContainerBackgroundColor={"#f8f4fc"}
                buttonContainerStyle={{
                    borderRadius: 0,
                    borderTopLeftRadius: 0,
                    backgroundColor: "#f8f4fc",
                    borderWidth: 1,
                    borderColor: "grey",
                }}
                placeholderTextStyle={{
                    fontSize: 12,
                    color: "black",
                    padding: 0,
                    margin: 0,
                    width: 25,
                    right: 10,
                    textAlign: "center",
                    width: "100%",
                }}
                menuItemTextStyle={{ fontSize: 12, padding: 0, margin: 0 }}
                placeholder={ingredient.unit ? ingredient.unit : "Unit"}
                menuBarContainerStyle={{
                    width: "100%",
                    height: 300,
                    backgroundColor: "#f8f4fc",
                    borderWidth: 1,
                    borderColor: "grey",
                    zIndex: 9999,
                }}
                arrowImageStyle={styles.iconStyle}
                menuBarTextStyle={{ fontSize: 12, padding: 0, margin: 0 }}
                searchEnabled={false}
                darkMode
                data={staticData}
                onSelect={(selectedItem) => {
                    const newIngredient = {
                        ...ingredient,
                        unit: selectedItem.value,
                    };
                    setIngredient(newIngredient);
                }}
            />
        </View>
    );
};

const IndexTable = ({}) => {
    // Questo è il componente che mostra la lista degli ingredienti già inseriti
    return (
        <View
            style={{
                width: 300,
                height: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
            }}
        >
            <Text style={{ width: "50%", textAlign: "center" }}>
                Ingredienti
            </Text>
            <Text style={{ width: "25%", textAlign: "center" }}>Quantità</Text>
            <Text style={{ width: "25%", textAlign: "center" }}>Unità</Text>
        </View>
    );
};

const IngredientTable = ({
    ingredient,
    recipeNumber,
    lastIngredient,
    ingredients,
    setIngredients,
}) => {
    // Rimuove l'ingrediente selezionato dalla lista
    const handleRemoveIngredient = (ingredient) => {
        // Filtra gli ingredienti per rimuovere quello specifico
        console.log(ingredient);
        const newIngredients = ingredients.filter(
            (item) => item.title !== ingredient.title
        );
        console.log(newIngredients);
        setIngredients(newIngredients);
        console.log(ingredients);
    };

    return (
        <View style={{ width: 300, flexDirection: "row" }}>
            {/* Questo è il componente che mostra la lista degli ingredienti già inseriti */}
            <View style={styles.tableContainer}>
                <View
                    style={[
                        styles.borderView,
                        {
                            width: "50%",
                            borderBottomLeftRadius:
                                recipeNumber === lastIngredient ? 5 : 0,
                        },
                    ]}
                >
                    <Text style={styles.tableText}>{ingredient.title}</Text>
                </View>
                <View style={[styles.borderView, { width: "25%" }]}>
                    <Text style={styles.tableText}>{ingredient.amount}</Text>
                </View>
                <View
                    style={[
                        styles.borderView,
                        {
                            width: "25%",
                            borderRightWidth: 1,
                            borderBottomRightRadius:
                                recipeNumber === lastIngredient ? 5 : 0,
                        },
                    ]}
                >
                    <Text style={styles.tableText}>{ingredient.unit}</Text>
                </View>
            </View>
            {/* Questo è il componente che rimuove l'ingrediente selezionato dalla lista */}
            <View>
                <TouchableOpacity
                    style={{ width: 20, height: 20 }}
                    onPress={() => {
                        handleRemoveIngredient(ingredient);
                    }}
                >
                    <Ionicons name="close-circle-outline" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7f7f8",
        width: "100%",
    },
    squareAmount: {
        width: "50%",
        height: 45,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f8f4fc",
        display: "flex",
        zIndex: 2,
    },
    dropdown: {
        height: 40,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 0,
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "black",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        height: 10,
    },
    IngTable: {
        width: "25%",
        borderColor: "gray",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
    },
    placeholderStyle: {
        fontSize: 12,
    },
    selectedTextStyle: {
        fontSize: 12,
        padding: 0,
    },
    iconStyle: {
        width: 8,
        height: 8,
        right: 5,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    tableContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        marginVertical: -7,
    },
    tableText: {
        textAlign: "center",
    },
    borderView: {
        borderColor: "gray",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        height: 30,
        justifyContent: "center",
    },
});
