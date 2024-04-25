import React, {useState, useEffect} from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Pressable } from "react-native";

import axios from "axios";
import { domain } from "../dns";

export default function IngredientsAutocomplete({ inputText, setInputText, setIngredient}) {    
    
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    //se il textinput contiene apostrofi strani li sosituisce con quelli normali
    const handleInputChange = (text) => {
        text = text.replace(/'/g, "’");
        setInputText(text);
    };

    //quando l'utente preme su una delle opzioni suggerite
    const pressSuggestion = (suggestion) => {
        setFilteredSuggestions("");
        setInputText(suggestion);
        setIngredient({ title: suggestion, amount: "", unit: "" });
        console.log(suggestion);
    };

    //effettua una richiesta get al server per ottenere gli ingredienti che corrispondono a ciò che l'utente ha digitato
    useEffect(() => {
        if (inputText.length == 0) {
            setFilteredSuggestions("");
            return;
        }
        const lastIngredient = encodeURIComponent(inputText);
        axios
            .get(`${domain}/getIngredientsByName/${lastIngredient}`)
            .then((response) => {
                setFilteredSuggestions(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    // Errore dalla risposta del server (es. errore HTTP)
                    console.error(
                        "Errore nella risposta del server:",
                        error.response.data
                    );
                } else if (error.request) {
                    // Nessuna risposta dal server
                    console.error(
                        "Nessuna risposta dal server:",
                        error.request
                    );
                } else {
                    // Errore durante la richiesta
                    console.error(
                        "Errore durante la richiesta:",
                        error.message
                    );
                }
            });
    }, [inputText]);

    const borderColor = isFocused ? "blue" : "gray"; // Colore del contorno durante lo stato di focus

    return (
        <View>
            {/* FlatList per visualizzare le opzioni suggerite */}
            <FlatList
                style={[
                    styles.listContainerStyle,
                    {
                        borderColor: borderColor,
                        borderWidth: filteredSuggestions.length > 0 ? 1 : 0,
                        display: "flex",
                    },
                ]}
                scrollEnabled={false}
                data={filteredSuggestions}
                inverted={true}
                keyboardShouldPersistTaps="always"
                renderItem={({ item }) => (
                    /* Pressable per selezionare una delle opzioni suggerite */
                    <Pressable
                        key={item}
                        style={{
                            height: 25,
                            width: 150,
                            padding: 2,
                            borderTopWidth: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            pressSuggestion(item.title);
                        }}
                    >
                        <Text>{item.title}</Text>
                    </Pressable>
                )}
                keyExtractor={(item) => item.title}
            />
            {/* TextInput per la ricerca degli ingredienti */}
            <TextInput
                style={[
                    styles.button,
                    {
                        borderColor: borderColor,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                    },
                ]}
                maxLength={40}
                placeholder="Inizia a digitare..."
                value={inputText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={handleInputChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainerStyle: {
        alignContent: "center",
        borderRadius: 5,
        position: "absolute",
        width: "100%",
        backgroundColor: "#f8f4fc",
        zIndex: 1,
        bottom: 38,
        paddingTop: 3,
    },
    button: {
        alignItems: "center",
        padding: 10,
        borderTopLeftRadius: 5,
        backgroundColor: "#f8f4fc",
        display: "flex",
        width: 150,
        height: 45,
        zIndex: 2,
    },
});
