import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { domain } from '../dns';
import { useState, useEffect, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { set } from 'react-native-reanimated';


export default function SearchFilter({ setShowSearchFilter }) {

    const dissolvenza = useRef(new Animated.Value(0)).current;

    const chiudiAnimazione = () => {
        Animated.timing(
            dissolvenza,
            {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }
        ).start(() => setShowSearchFilter(false));
    };

    useEffect(() => {
        Animated.timing(
            dissolvenza,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }
        ).start();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedGLuten, setSelectedGluten] = useState('');

    const categories = ['Antipasti', 'Primi', 'Secondi', 'Dolci'];
    const difficulties = ['1', '2', '3', '4', '5'];

    const selectCategory = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    }

    const selectDifficulty = (difficulty) => {
        if (selectedDifficulty === difficulty) {
            setSelectedDifficulty(null);
        } else {
            setSelectedDifficulty(difficulty);
        }
    }

    const selectGluten = (value) => {
        setSelectedGluten(value);
    };

    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const onChange = (event, value) => {
        setDate(value);
        setIsPickerShow(false);
    };

    return (
        <Animated.View style={{
            ...styles.container,
            opacity: dissolvenza,
        }}>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
                <Ionicons name="close-outline" size={30} color="black" onPress={chiudiAnimazione} />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Categorie</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                ...styles.category,
                                backgroundColor: selectedCategory === category ? '#81c57bd9' : '#Ffe890',
                                borderRadius: 10,
                                padding: 10,
                                marginRight: 10
                            }}
                            onPress={() => selectCategory(category)}
                        >
                            <Text style={{ fontWeight: 'bold' }}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, textAlign: 'center' }}>Difficoltà</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 10, }}>
                        {difficulties.map((difficulty, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    ...styles.difficulty,
                                    backgroundColor: selectedDifficulty === difficulty ? '#81c57bd9' : '#Ffe890',
                                    borderRadius: 10,
                                    padding: 10,
                                    marginRight: 10,
                                    marginBottom: 10, // Aggiungi marginBottom per creare spazio tra le righe
                                    flexDirection: 'row',
                                    width: difficulty === '4' || difficulty === '5' ? '28%' : '20%', // Cambia la larghezza per i riquadri di difficoltà 4 e 5
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => selectDifficulty(difficulty)}
                            >
                                <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{difficulty}</Text>
                                <AntDesign name="staro" size={20} color="black" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, textAlign: 'center' }}>Contiene glutine</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
                        <TouchableOpacity style={{ backgroundColor: selectedGLuten === '1' ? '#81c57bd9' : '#Ffe890', borderRadius: 10, padding: 10, marginRight: 10, alignItems: 'center' }} onPress={() => selectGluten('1')}>
                            <Text style={{ fontWeight: 'bold' }}>Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: selectedGLuten === '0' ? '#d53032' : '#Ffe890', borderRadius: 10, padding: 10, marginRight: 10, alignItems: 'center' }} onPress={() => selectGluten('0')}>
                            <Text style={{ fontWeight: 'bold' }}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, textAlign: 'center', marginBottom: 6}}>Tempo di preparazione</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Max</Text>
                        <DateTimePicker
                            value={date}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={{ marginRight: 10 }}
                        />
                        <AntDesign name="clockcircleo" size={20} color="black" />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={{ backgroundColor: '#81c57bd9', borderRadius: 10, padding: 10, marginTop: 30, alignItems: 'center' }} onPress={chiudiAnimazione}>
                        <Text style={{ fontWeight: 'bold' }}>Cerca</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        width: '80%',
        height: '78%',
        backgroundColor: 'white',
        zIndex: 1,
        borderRadius: 10,
        top: '17%',
        left: '10%',
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
    },
})
