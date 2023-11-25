import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

import SetDayToChange from './SetDayToChange';
import SetMealsOfTheDay from './SetMealsOfTheDay';

export default function SetDays ({ ingredientsOfTheWeek }) {
    const [dayChoosen, setDayChoosen] = useState(false);
    const [day, setDay] = useState(dayjs());
    const [ingredientsOfTheDay, setIngredientsOfTheDay] = useState({
        'breakfast': [[]],
        'morningSnack': [[]],
        'lunch': [[]],
        'afternoonSnack': [[]],
        'dinner': [[]],
    });

    const getMealsOfTheDays = async () => {
        var mealsOfTheDay = await getData("mealsOfdays");
        return mealsOfTheDay;
    }
    useEffect(() => {
        const days = getMealsOfTheDays();
        const daysJSON = JSON.stringify(days);
        //prendi solo il giorno che ti serve
        for(let i=0; i<daysJSON.length; i++) {
            if(daysJSON[i].day == day) {
                setIngredientsOfTheDay(daysJSON[i].mealsJSON);
            }
        }
        console.log("ingredientsOfTheDay", ingredientsOfTheDay);
    }, [day])        
        
    if (dayChoosen) {
        return (
            <View style={[styles.setDays]}>
                <View style={styles.setMealsOfTheDay}>
                    <SetMealsOfTheDay day={day} ingredientsOfTheWeek={ingredientsOfTheWeek} ingredientsOfTheDay={ingredientsOfTheDay} />
                </View>
            </View>
        );
    } else {
        return (
            <SetDayToChange setDayChoosen={setDayChoosen} setDayChanged={setDay} />
        );
    }
}

const styles = StyleSheet.create({
    setDays: {
        alignContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#FFEFAF",
        alignItems: 'center',
    },
    setMealsOfTheDay: {
        width: '90%',
        backgroundColor: "#F4F1DE",
        borderRadius: 10,
        padding: 5,
        margin: 10,
    },
});