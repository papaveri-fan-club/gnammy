import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function SetDayToChange ({ setDayChoosen, setDayChanged }) {
    const [dayToChangeNotSaved, setDayToChangeNotSaved] = useState(dayjs());
    const coloTheme = {
        backgroundColor: '#fff',
        primaryTextColor: '#000',
        secondaryTextColor: '#fff',
        primaryColor: '#000',
        secondaryColor: '#000',
        shadowColor: '#000',
        shadowOpacity: 0.1,
    };

    return (
        <View style={styles.container}>
            <View style={styles.datePickerContainer}>
                <View style={styles.datePicker}>
                    <DateTimePicker
                        //minimumDate={dayjs().startOf('day')}
                        //maximumDate={dayjs().add(3, 'day').endOf('day')}
                        value={dayToChangeNotSaved}
                        onValueChange={(value) => {
                            // console.log("dayToChangeNotSaved", value);
                            setDayToChangeNotSaved(value);
                        }}
                        displayFullDays={false}
                        selectedTextStyle={{
                            fontWeight: 'bold',
                            color: coloTheme.secondaryTextColor,
                        }}
                        mode="date"
                    />
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.todayButton}
                            onPress={() => {
                                setDayChanged(dayToChangeNotSaved);
                                setDayChoosen(true);
                            }}
                        >
                            <Text style={styles.todayButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    datePickerContainer: {
        alignItems: 'center',
    },
    datePicker: {
        width: 330,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
        alignItems: 'center',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    todayButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    todayButtonText: {
        fontWeight: 'bold',
    },
});