import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Autocomplete from "../components/AutocompleteForMeal";
import AutocompleteForSetMeal from "../components/AutoCompleteForSetMeal";
import { storeData, getData } from "../components/functions/AsyncStorage";
import { Pressable } from "react-native";
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function DietPage({ setShowDietPage }) {
    const defaultIngredientsOfTheWeek = {
        'breakfast': [[]],
        'morningSnack': [[]],
        'lunch': [[]],
        'afternoonSnack': [[]],
        'dinner': [[]],
    };
    const [ingredientsOfTheWeek, setIngredientsOfTheWeek] = useState(defaultIngredientsOfTheWeek);
    const [downloaded, setDownloaded] = useState(false);
    const getIngredientsOfTheWeek = async () => {
        // if (ingredientsOfTheWeek != defaultIngredientsOfTheWeek) {
        //     return;
        // }
        const ingredientsOfTheWeekSaved = await getData("ingredientsOfTheWeek");
        setDownloaded(true);
        console.log("ingredientsOfTheWeekSaved", ingredientsOfTheWeekSaved);
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

const SetIngredients = ({ ingredientsOfTheWeek, setNewIngredientsOfTheWeek }) => {
    const [breakfastIngredients, setBreakfastIngredients] = useState([[]]);
    const [morningSnackIngredients, setMorningSnackIngredients] = useState([[]]);
    const [lunchIngredients, setLunchIngredients] = useState([[]]);
    const [afternoonSnackIngredients, setAfternoonSnackIngredients] = useState([[]]);
    const [dinnerIngredients, setDinnerIngredients] = useState([[]]);

    useEffect(() => {
        setBreakfastIngredients(ingredientsOfTheWeek.breakfast);
        setMorningSnackIngredients(ingredientsOfTheWeek.morningSnack);
        setLunchIngredients(ingredientsOfTheWeek.lunch);
        setAfternoonSnackIngredients(ingredientsOfTheWeek.afternoonSnack);
        setDinnerIngredients(ingredientsOfTheWeek.dinner);
    }, [ingredientsOfTheWeek])


    return (
        <View>
            <View style={styles.backCard}>
                <Meal typeOfMeal="Breakfast" setIngredients={setBreakfastIngredients} ingredients={breakfastIngredients} zIndex={5} />
                <Meal typeOfMeal="Morning snack" setIngredients={setMorningSnackIngredients} ingredients={morningSnackIngredients} zIndex={4} />
                <Meal typeOfMeal="Lunch" setIngredients={setLunchIngredients} ingredients={lunchIngredients} zIndex={3} />
                <Meal typeOfMeal="Afternoon snack" setIngredients={setAfternoonSnackIngredients} ingredients={afternoonSnackIngredients} zIndex={2} />
                <Meal typeOfMeal="Dinner" setIngredients={setDinnerIngredients} ingredients={dinnerIngredients} zIndex={1} />
            </View>
            <Pressable
                style={{ width: 100, height: 50, backgroundColor: "#E9C46A", borderRadius: 10, alignSelf: "center", margin: 50, marginBottom: 130 }}
                onPress={() => {
                    const ingredientsOfTheWeek = {
                        'breakfast': breakfastIngredients,
                        'morningSnack': morningSnackIngredients,
                        'lunch': lunchIngredients,
                        'afternoonSnack': afternoonSnackIngredients,
                        'dinner': dinnerIngredients,
                    };
                    setNewIngredientsOfTheWeek(ingredientsOfTheWeek);
                }}
            >
                <Text style={{ textAlign: "center", marginTop: 15 }}>Save</Text>
            </Pressable>
        </View>
    );
}
const Meal = ({ typeOfMeal, setIngredients, zIndex, ingredients }) => {
    const setIngredientsByIndex = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    }
    return (
        <View style={[styles.card, { zIndex: zIndex }]}>
            <Text style={styles.cardTitle}>{typeOfMeal}</Text>
            <Text>dividi il tuo pasto per i diversi cibi che mangi e scegli un ingrediente (tra quelli che aggiungi) per ogni gruppo che crei</Text>
            {/* crea due pulsanti + e meno che aggiungono gruppi e tolgono in modo da poter aggiungere diversi ingredienti per ogni gruppo*/}
            {/* <FlatList
                scrollEnabled={false}
                data={ingredients}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                        <MealGroup
                            setIngredientsByIndex={setIngredientsByIndex}
                            numberOfGroup={index}
                            ingredients={item}
                            deleteThisGroup={() => {
                                // Create a new array of ingredients without the object to delete that is the index of the group
                                var newIngredients = [...ingredients];
                                newIngredients.splice(index, 1);
                                setIngredients(newIngredients);
                            }}
                        />
                )}
            /> */}
            {ingredients.map((item, index) => {
                return (
                    <MealGroup
                        key={item.length != 0 ? item[0].title : index}
                        setIngredientsByIndex={setIngredientsByIndex}
                        numberOfGroup={index}
                        ingredients={item}
                        deleteThisGroup={() => {
                            // Create a new array of ingredients without the object to delete that is the index of the group
                            var newIngredients = [...ingredients];
                            newIngredients.splice(index, 1);
                            setIngredients(newIngredients);
                        }}
                    />
                )
            })}
            {/* <MealGroup
                setIngredientsByIndex={setIngredientsByIndex}
                numberOfGroup={ingredients.length}
                ingredients={[]}
                deleteThisGroup={() => {
                    // Create a new array of ingredients without the object to delete that is the index of the group
                    var newIngredients = [...ingredients];
                    newIngredients.pop();
                    setIngredients(newIngredients);
                }}
            /> */}
            <Pressable
                style={{ width: 24 }}
                onPress={() => {
                    if (ingredients[ingredients.length - 1].length == 0) {
                        return (
                            alert("You have to fill the last group before adding a new one")
                        )
                    }
                    var newIngredients = [...ingredients];
                    newIngredients.push([]);
                    setIngredients(newIngredients);
                }}>
                <Ionicons name="add-circle-outline" size={24} color="green" />
            </Pressable>
        </View>
    );
}
const MealGroup = ({ ingredients, setIngredientsByIndex, numberOfGroup, deleteThisGroup }) => {
    var newIngredients = [...ingredients];
    useEffect(() => {
        if (newIngredients != ingredients == 0) {
            return;
        }
    })
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

const SetDays = ({ ingredientsOfTheWeek }) => {
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

const SetDayToChange = ({ setDayChoosen, setDayChanged }) => {
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
                            console.log("dayToChangeNotSaved", value);
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

const SetMealsOfTheDay = ({ day, ingredientsOfTheWeek, ingredientsOfTheDay }) => {
    const [breakfastIngredients, setBreakfastIngredients] = useState(ingredientsOfTheDay.breakfast);
    const [morningSnackIngredients, setMorningSnackIngredients] = useState(ingredientsOfTheDay.morningSnack);
    const [lunchIngredients, setLunchIngredients] = useState(ingredientsOfTheDay.lunch);
    const [afternoonSnackIngredients, setAfternoonSnackIngredients] = useState(ingredientsOfTheDay.afternoonSnack);
    const [dinnerIngredients, setDinnerIngredients] = useState(ingredientsOfTheDay.dinner);

    const setTheIngredientsOfTheDay = async (meals) => {
        const mealsJSON = JSON.stringify(meals);
        const dayJSON = JSON.stringify(day);
        const mealsAndDay = { mealsJSON, dayJSON };
        console.log("mealsAndDay", mealsAndDay);
        var mealsAlreadySaved = await getData("mealsOfdays");
        mealsAlreadySaved = JSON.parse(mealsAlreadySaved);
        //fai un consoloe.log di tutti gli elementi in colonna di ogni elemento nell'array
        if (mealsAlreadySaved && mealsAlreadySaved.length > 0) {
            console.log("mealsAlreadySaved", mealsAlreadySaved);
            var newMealsAlreadySaved = [...mealsAlreadySaved, mealsAndDay];
            //controolla che nessun giorno abbia lo syesso giorno di quello che stai salvando
            for (let i = 0; i < newMealsAlreadySaved.length-1; i++) {
                if (newMealsAlreadySaved[i].dayJSON == dayJSON) {
                    newMealsAlreadySaved[i] = mealsAndDay;
                    newMealsAlreadySaved.pop();                    
                    return;
                }
            }
            // console.log("newMealsAlreadySaved", newMealsAlreadySaved);
            const stringMealsAlreadySavedJSON = JSON.stringify(newMealsAlreadySaved);
            console.log("stringMealsAlreadySavedJSON", stringMealsAlreadySavedJSON);
            await storeData(stringMealsAlreadySavedJSON, "mealsOfdays");
        } else {
            // console.log("mealsAndDay", mealsAndDay);
            const stringMealsAndDay = JSON.stringify([mealsAndDay]);
            await storeData(stringMealsAndDay, "mealsOfdays");
        }
    }

    return (
        <View>
            <View style={styles.backCard}>
                <SetMeal typeOfMeal="Breakfast" groupsOfmeal={ingredientsOfTheWeek.breakfast} zIndex={5} setIngredients={setBreakfastIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.breakfast} />
                <SetMeal typeOfMeal="Morning snack" groupsOfmeal={ingredientsOfTheWeek.morningSnack} zIndex={4} setIngredients={setMorningSnackIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.morningSnack} />
                <SetMeal typeOfMeal="Lunch" groupsOfmeal={ingredientsOfTheWeek.lunch} zIndex={3} setIngredients={setLunchIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.lunch} />
                <SetMeal typeOfMeal="Afternoon snack" groupsOfmeal={ingredientsOfTheWeek.afternoonSnack} zIndex={2} setIngredients={setAfternoonSnackIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.afternoonSnack} />
                <SetMeal typeOfMeal="Dinner" groupsOfmeal={ingredientsOfTheWeek.dinner} zIndex={1} setIngredients={setDinnerIngredients} ingredientAlreadyAdded={ingredientsOfTheDay.dinner} />
            </View>
            <Pressable
                style={{ width: 100, height: 50, backgroundColor: "#E9C46A", borderRadius: 10, alignSelf: "center", margin: 20, marginBottom: 30 }}
                onPress={() => {
                    const ingredientsOfTheWeek = {
                        'breakfast': breakfastIngredients,
                        'morningSnack': morningSnackIngredients,
                        'lunch': lunchIngredients,
                        'afternoonSnack': afternoonSnackIngredients,
                        'dinner': dinnerIngredients,
                    };
                    console.log("ingredientsOfTheWeek", ingredientsOfTheWeek);
                    setTheIngredientsOfTheDay(ingredientsOfTheWeek);
                }}
            >
                <Text style={{ textAlign: "center", marginTop: 15 }}>Save</Text>
            </Pressable>
        </View>
    );

}

//setmeal è un componente che permete di aggiungere un ingrediente per ogni gruppo del pasto dayToChange
const SetMeal = ({ typeOfMeal, groupsOfmeal, zIndex, setIngredients, ingredientAlreadyAdded }) => {
    const [ingredientsChoosen, setIngredientsChoosen] = useState([[]]);
    console.log("ingredientAlreadyAdded", ingredientAlreadyAdded);

    useEffect(() => {
        console.log("ingredientsChoosen", ingredientsChoosen);
        setIngredients(ingredientsChoosen);
    }, [ingredientsChoosen])

    return (
        <View style={[styles.setMeal, { zIndex: zIndex }]} >
            <Text>{typeOfMeal}</Text>
            {groupsOfmeal.map((group, key) => {
                return (
                    <View style={{ width: '90%' }}>
                        <Text>Group {key + 1}</Text>
                        <SetIngredient listOfIngredients={group} zIndex={groupsOfmeal.length - key} setIngredientChoosen={(value) => {
                            ingredientAlreadyAdded = ingredientAlreadyAdded[key];
                            const newIngredientsChoosen = [...ingredientsChoosen];
                            newIngredientsChoosen[key] = value;
                            setIngredientsChoosen(newIngredientsChoosen);
                        }}
                        />
                    </View>
                )
            })}
            <View style={{ width: '90%', marginTop: 20 }}>
                <Text>ingredienti extra</Text>
                <SetIngredient listOfIngredients={[]} zIndex={0} setIngredientChoosen={(value) => {
                    const newIngredientsChoosen = [...ingredientsChoosen];
                    newIngredientsChoosen[ingredientsChoosen.length] = value;
                    setIngredientsChoosen(newIngredientsChoosen);
                }} />
            </View>
        </View>
    );
}

const SetIngredient = ({ listOfIngredients, zIndex, setIngredientChoosen }) => {
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
    },

    card: {
        backgroundColor: "#E9C46A",
        borderRadius: 10,
        padding: 10,
        paddingRight: 5,
        paddingEnd: 5,
        margin: 10,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
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
    setMeal: {
        backgroundColor: "#E9C46A",
        borderRadius: 10,
        padding: 10,
        paddingRight: 5,
        paddingEnd: 5,
        margin: 10,
    },
});
