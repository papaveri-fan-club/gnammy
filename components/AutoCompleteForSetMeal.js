import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { domain } from '../dns';


import RNSingleSelect from "@freakycoder/react-native-single-select";

export default function AutocompleteForSetMeal({ myStyle, onChangeText, defaultSuggestions = [], zIndex }) {
  const [inputText, setInputText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [ingredient, setIngredient] = useState({ title: '', amount: '', unit: '' });

  const borderColor = isFocused ? 'blue' : 'gray'; // Colore del contorno durante lo stato di focus

  useEffect(() => {
    if (inputText.length == 0) {
      setFilteredSuggestions('');
      return;
    }
    if (defaultSuggestions.length != 0) {
      //prendi dai suggerimenti predefiniti i suggerimenti, massimo 5, che iniziano con inopputtext
      const filtered = defaultSuggestions.filter((suggestion) => suggestion.title.toLowerCase().startsWith(inputText.toLowerCase())).slice(0, 5);
      if (filtered.length != 0) {
        setFilteredSuggestions(filtered);
        return;
      }
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

  return (
    <View style={myStyle}>
      <IndexTable />
      <View style={{ flexDirection: 'row', zIndex: 1000 }}>
        <View style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
          <FlatList
            style={[styles.listContainerStyle, { borderColor: borderColor, borderWidth: filteredSuggestions.length > 0 ? 1 : 0, display: 'flex' }]}
            scrollEnabled={false}
            data={filteredSuggestions}
            inverted={true}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) =>
              <Pressable key={item} style={{ width: '100%', padding: 2, borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  // console.log(item);
                  try {
                    setIngredient({ title: item.title, amount: item.amount, unit: item.unit });
                    setInputText(item.title);
                    setFilteredSuggestions('');
                  } catch (error) {
                    console.log(error);
                  }
                  // pressSuggestion(item.title);
                }}>
                <Text style={{ fontSize: 12 }}>{item.title}</Text>
                {item.amount != undefined ?
                  <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10 }}>{item.amount} {item.unit}</Text>
                    <Text style={{ fontSize: 10 }}> |</Text>
                    <Text style={{ fontSize: 10 }}>times a week: {item.timesAWeek}</Text>
                  </View>
                  : null
                }
              </Pressable>}
            keyExtractor={(item) => item.title}
          />

          <TextInput
            style={[styles.textInput, { borderColor: borderColor, borderBottomWidth: 1, borderLeftWidth: 1, borderTopWidth: 1, }]}
            maxLength={40}
            placeholder="digitare..."
            value={inputText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => {const newIngredient = { ...ingredient, title: text }; setIngredient(newIngredient); handleInputChange(text)}}
          />
        </View>
        <View style={{ width: '50%', height: 23, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', zIndex: zIndex }}>
          <SquareAmount ingredient={ingredient} setIngredient={setIngredient} />
          <SquareUnit ingredient={ingredient} setIngredient={setIngredient} style={{zIndex: zIndex}} />
        </View>
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
    <View style={{ width: '20%', flex: 1 }}>
      <RNSingleSelect width={'100%'} height={45} menuBarContainerWidth={60} menuBarContainerBackgroundColor={'#f8f4fc'}
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
      <Text style={{ width: '50%', textAlign: 'center', fontSize: 10 }}>Ingredienti</Text>
      <Text style={{ width: '17.5%', textAlign: 'center', fontSize: 10 }}>Quantità</Text>
      <Text style={{ width: '20%', textAlign: 'center', fontSize: 10 }}>Unità</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f8',
    width: '100%',
  },
  textInput: {
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 5,
    backgroundColor: "#f8f4fc",
    display: 'flex',
    width: '100%',
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
    width: '35%',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginVertical: -7,
  },
  tableText: {
    textAlign: 'center',
    fontSize: 12,
  },
  borderView: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    height: 30,
    justifyContent: 'center'
  }
});
