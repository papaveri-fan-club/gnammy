import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const GoBack = () => {

    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={goBack} style={{ marginRight: 20 }}>
            <View>
                <AntDesign name="arrowleft" size={30} style={{ marginLeft: 20, marginTop: 10}} color="black" />
            </View>
        </TouchableOpacity>
    );
};

export default GoBack;