import React, { useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Autocomplete from '../../AutocompleteForMeal';

export default function MealGroup ({ ingredients, setIngredientsByIndex, numberOfGroup, deleteThisGroup }) {
    console.log("ingredients meal group", ingredients);
    return (
        <View>
            <Text>Group {numberOfGroup + 1}</Text>
            <Pressable onPress={deleteThisGroup} style={{ width: 24 }}>
                <Ionicons name="remove-circle-outline" size={24} color="red" />
            </Pressable>
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