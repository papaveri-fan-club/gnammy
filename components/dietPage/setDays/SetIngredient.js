import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import AutocompleteForSetMeal from '../../AutoCompleteForSetMeal';

export default function SetIngredient ({ listOfIngredients, zIndex, setIngredientChoosen }) {
    //crea un arrai di ogetti con solo titolo ed id per ogni ingrediente
    return (
        <View style={{ zIndex: zIndex }}>
            <AutocompleteForSetMeal
                zIndex={zIndex}
                defaultSuggestions={listOfIngredients}
                legend={false}
                onChangeText={setIngredientChoosen}
            />
        </View>
    );
}
