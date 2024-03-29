import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { domain } from '../dns';
import { Ionicons } from '@expo/vector-icons';


import RNSingleSelect from "@freakycoder/react-native-single-select";

export default function Autocomplete({ myStyle, listStyle, defaultValue, onChangeText, legend = true }) {
  const [inputText, setInputText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({ title: '', amount: '', unit: '' });
  const [buttonPressed, setButtonPressed] = useState(false); // Stato di focus per gli ingredienti


  const borderColor = isFocused ? 'blue' : 'gray'; // Colore del contorno durante lo stato di focus

  useEffect(() => {
    if (inputText.length == 0) {
      setFilteredSuggestions('');
      return;
    }
    const lastIngredient = encodeURIComponent(inputText);
    axios.get(`${domain}/getIngredientsByName/${lastIngredient}`)
      .then((response) => {
        setFilteredSuggestions(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Errore dalla risposta del server (es. errore HTTP)
          console.error("Errore nella risposta del server:", error.response.data);
        } else if (error.request) {
          // Nessuna risposta dal server
          console.error("Nessuna risposta dal server:", error.request);
        } else {
          // Errore durante la richiesta
          console.error("Errore durante la richiesta:", error.message);
        }
      });

  }, [inputText]);

  const handleInputChange = (text) => {
    text = text.replace(/'/g, "’");
    setInputText(text);
    //se il textinput contiene apostrofi strani li sosituisce con quelli normali
  };

  const pressSuggestion = (suggestion) => {
    setFilteredSuggestions('');
    setInputText(suggestion);
    setIngredient({ title: suggestion, amount: '', unit: '' });
    console.log(suggestion);
  };

  useEffect(() => {
    console.log('buttonPressed', buttonPressed);
    setButtonPressed(false);
    if (inputText == '') { console.log('ingredient.title == ""'); return; }
    if (ingredient.amount == '') { console.log('ingredient.amount == ""'); return; }
    if (ingredient.unit == '') { console.log('ingredient.unit == ""'); return; }

    // Crea un nuovo oggetto con le modifiche
    const newIngredient = {
      title: inputText,
      amount: ingredient.amount,
      unit: ingredient.unit,
    };

    // Aggiungi il nuovo ingrediente all'array ingredien
    setIngredients([...ingredients, newIngredient]);

    // Resetta gli stati
    setIngredient({ title: '', amount: '', unit: '' });
    setInputText('');
  }, [buttonPressed]);

  useEffect(() => {
    console.log('ingredients', ingredients);
    onChangeText(ingredients);
  }, [ingredients]);


  return (
    <View style={[myStyle, { zIndex: 10000 }]}>
      <IndexTable />
      <View style={{ display: 'flex', flexDirection: 'row', zIndex: 1000 }}>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <FlatList
            style={[styles.listContainerStyle, { borderColor: borderColor, borderWidth: filteredSuggestions.length > 0 ? 1 : 0, display: 'flex' }]}
            scrollEnabled={false}
            data={filteredSuggestions}
            inverted={true}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) =>
              <Pressable key={item} style={{ height: 25, width: 150, padding: 2, borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  pressSuggestion(item.title);
                }}>
                <Text>{item.title}</Text>
              </Pressable>}
            keyExtractor={(item) => item.title}
          />

          <TextInput
            style={[styles.button, { borderColor: borderColor, borderBottomWidth: 1, borderLeftWidth: 1, borderTopWidth: 1, }]}
            maxLength={40}
            placeholder="Inizia a digitare..."
            value={inputText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={handleInputChange}
          />
        </View>
        <View style={{ width: '50%', height: 23, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <SquareAmount ingredient={ingredient} setIngredient={setIngredient} />
          <SquareUnit ingredient={ingredient} setIngredient={setIngredient} />
        </View>
        <Pressable style={{ width: '10%', height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            setButtonPressed(true);
          }}>
          <Ionicons name="add-circle-outline" size={30} />
        </Pressable>
      </View>
      <View style={{ width: '100%' }}>
        <FlatList
          style={{ width: '100%', zIndex: 0, borderBottomWidth: 1, borderColor: 'grey', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, overflow: 'hidden', backgroundColor: 'white' }}
          data={ingredients}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <IngredientTable ingredient={item} recipeNumber={index} lastIngredient={ingredients.length - 1} ingredients={ingredients} setIngredients={setIngredients} />
          )}
          keyExtractor={(item) => item.title}
        />

        {legend ? (
          <View>
            <Text style={{ marginTop: 20, fontSize: 12 }}>Legenda quantità: </Text>
            <Text style={{ fontSize: 12 }}>•g = grammi{'\n'}•pz = pezzi{'\n'}•qb = quanto basta{'\n'}•ml = millilitri{'\n'}•cc = cucchiaini{'\n'}•c = cucchiai</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const SquareAmount = ({ ingredient, setIngredient }) => {
  const [isFocused, setIsFocused] = useState(false)

  var editableAmount = true;

  if (ingredient.unit == 'qb') {
    ingredient.amount = '*';
    editableAmount = false;
  }

  return (
    <TextInput style={[styles.squareAmount, { borderColor: isFocused ? 'blue' : 'grey' }]}
      maxLength={4}
      editable={editableAmount}
      value={ingredient.amount}
      keyboardType='numeric'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={(value) => {
        value = value.replace(',', '.');
        const newIngredient = { ...ingredient, amount: value };
        setIngredient(newIngredient);
      }}
    />
  );
}

const SquareUnit = ({ ingredient, setIngredient }) => {
  const [value, setValue] = useState();

  const staticData = [
    { id: 0, value: "g" },
    { id: 1, value: "pz" },
    { id: 2, value: "qb" },
    { id: 3, value: "ml" },
    { id: 4, value: "cc" },
    { id: 5, value: "c" },
  ];

  return (
    <View style={{ width: '40%', flex: 1 }}>
      <RNSingleSelect width={75} height={45} menuBarContainerWidth={60} menuBarContainerBackgroundColor={'#f8f4fc'}
        buttonContainerStyle={{ borderRadius: 0, borderTopLeftRadius: 0, backgroundColor: '#f8f4fc', borderWidth: 1, borderColor: 'grey' }}
        placeholderTextStyle={{ fontSize: 12, color: 'black', padding: 0, margin: 0, width: 25, right: 10, textAlign: 'center', width: '100%' }}
        menuItemTextStyle={{ fontSize: 12, padding: 0, margin: 0 }}

        placeholder={ingredient.unit ? ingredient.unit : 'Unit'}
        menuBarContainerStyle={{ width: '100%', height: 300, backgroundColor: '#f8f4fc', borderWidth: 1, borderColor: 'grey', zIndex: 9999 }}
        arrowImageStyle={styles.iconStyle}
        menuBarTextStyle={{ fontSize: 12, padding: 0, margin: 0 }}
        searchEnabled={false}
        darkMode
        data={staticData}
        onSelect={(selectedItem) => {
          setValue(selectedItem.value);
          const newIngredient = { ...ingredient, unit: selectedItem.value };
          setIngredient(newIngredient);
        }
        }
      />
    </View>
  );
}

const IndexTable = ({ }) => {
  return (
    <View style={{ width: 300, height: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
      <Text style={{ width: '50%', textAlign: 'center' }}>Ingredienti</Text>
      <Text style={{ width: '25%', textAlign: 'center' }}>Quantità</Text>
      <Text style={{ width: '25%', textAlign: 'center' }}>Unità</Text>
    </View>
  )
}




const IngredientTable = ({ ingredient, recipeNumber, lastIngredient, ingredients, setIngredients }) => {
  const handleRemoveIngredient = (ingredient) => {
    // Filtra gli ingredienti per rimuovere quello specifico
    console.log(ingredient);
    const newIngredients = ingredients.filter((item) => item.title !== ingredient.title);
    console.log(newIngredients);
    setIngredients(newIngredients);
    console.log(ingredients);
  }

  return (
    <View style={{ width: 300, flexDirection: 'row' }}>
      <View style={styles.tableContainer}>
        <View style={[styles.borderView, { width: '50%', borderBottomLeftRadius: recipeNumber === lastIngredient ? 5 : 0 }]}>
          <Text style={styles.tableText}>{ingredient.title}</Text>
        </View>
        <View style={[styles.borderView, { width: '25%' }]}>
          <Text style={styles.tableText}>{ingredient.amount}</Text>
        </View>
        <View style={[styles.borderView, { width: '25%', borderRightWidth: 1, borderBottomRightRadius: recipeNumber === lastIngredient ? 5 : 0 }]}>
          <Text style={styles.tableText}>{ingredient.unit}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={{ width: 20, height: 20 }}
          onPress={() => {
            handleRemoveIngredient(ingredient);
          }}>
          <Ionicons name="close-circle-outline" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f8',
    width: '100%',
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 5,
    backgroundColor: "#f8f4fc",
    display: 'flex',
    width: 150,
    height: 45,
    zIndex: 2,
  },
  listContainerStyle: {
    alignContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    width: '100%',
    backgroundColor: "#f8f4fc",
    zIndex: 1,
    bottom: 38,
    paddingTop: 3,
  },
  squareAmount: {
    width: '50%',
    height: 45,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f4fc",
    display: 'flex',
    zIndex: 2,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    height: 10,
  },
  IngTable: {
    width: '25%',
    borderColor: 'gray',
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
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginVertical: -7,
  },
  tableText: {
    textAlign: 'center'
  },
  borderView: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    height: 30,
    justifyContent: 'center'
  }
});
