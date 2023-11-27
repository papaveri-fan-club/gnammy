import React, { useEffect } from "react";
import axios from "axios";
import { domain } from "../dns";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { set } from "react-native-reanimated";

export default function RecipePage() {
  const route = useRoute();
  const item = route.params.item;
  const [ingredients, setIngredients] = useState([{}]);
  const amount = item.amount.split(",");
  const unit = item.unit.split(",");
  const [portions, setPortions] = useState(item.portions);

  useEffect(() => {
    setPortions(item.portions);
  }, [item]);

  const handleIncrease = () => {
    const newPortions = portions + 1;
    const newIngredients = ingredients.map(ingredient => {
      const newAmount = ingredient.amount * newPortions / portions;
      return {...ingredient, amount: Number.isInteger(newAmount) ? newAmount : parseFloat(newAmount.toFixed(2))};    });
    setPortions(newPortions);
    setIngredients(newIngredients);
  }
  
  // Metodo per decrementare le porzioni
  const handleDecrease = () => {
    if (portions > 1) {
      const newPortions = portions - 1;
      const newIngredients = ingredients.map(ingredient => {
        const newAmount = ingredient.amount * newPortions / portions;
        return {...ingredient, amount: Number.isInteger(newAmount) ? newAmount : parseFloat(newAmount.toFixed(2))};      });
      setPortions(newPortions);
      setIngredients(newIngredients);
    }
  }

  //trasfoorma item.amount in un array
  useEffect(() => {
    //id deve essere un array degli id divisi da una virgola
    const idIngredients = item.ingredients
      .split(",")
      .map((numero) => Number(numero));
    console.log(idIngredients);
    axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
      .get(`${domain}/getIngredientsById`, {
        params: { ids: idIngredients },
      })
      .then((response) => {
        const data = response.data; // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
        console.log(data);
        setIngredients(
          data.map((ingredient, index) => {
            return {
              title: ingredient.title,
              amount: amount[index],
              unit: unit[index],
            };
          })
        );
        console.log(ingredients);
      })
      .catch((error) => {
        console.error(error); // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console
      });
  }, [item]);

  console.log(ingredients);
  //aggiungi ad ogni ingrediente il proprio amount e l unit
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={require("../assets/hamburger.png")}
        />
      </View>
      <View style={styles.backCard}>
        <View style={styles.orangeBlock}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
              textAlign: 'center'
            }}
          >
            <Text style={{ width: "33%", fontSize: 20, textAlign: "center", fontWeight: "bold", padding: '2%' }}>
              {item.category}
            </Text>
            <Text style={[styles.recipeTitle, { padding: '2%' }]}>
              {item.title}
            </Text>
            <Text style={[styles.subtitle, { padding: '3%' }]}>
              By {item.creator_username}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              padding: "3%",
              marginTop: "3%",
              fontSize: 20,
            }}
          >
            <Text style={{marginRight: 10}}>Contiene Glutine:</Text>
            {item.gluten === 0 ? (
              <AntDesign name="closecircleo" size={20} color="red" />
            ) : (
              <AntDesign name="checkcircleo" size={20} color="green" />
            )}
          </View>
          <View style={styles.centeredView}>
            <View>
              <Text style={styles.title}>Tempo di preparazione{'\n'}(d/h/m)</Text>
              <Text style={[styles.subtitle, {margin: 5}]}>{item.time}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
          <View>
            <Text style={styles.title}>Porzioni</Text>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={handleDecrease} style={styles.button} >
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.subtitle, {fontSize: 17}]}>{portions}</Text>
              <TouchableOpacity onPress={handleIncrease} style={styles.button} >
                  <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
            <View>
              <Text style={styles.title}>Difficoltà</Text>
              <Text style={[styles.subtitle, {margin: 10, fontSize: 16}]}>{item.difficulty}/5</Text>
            </View>
          </View>
          <View style={styles.centeredView}>
            <Text style={[styles.title, { padding: "2%" }]}>Descrizione</Text>
            <Text style={[styles.subtitle, {textAlign: 'justify'}]}>
              {item.description}
            </Text>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.title}>Ingredienti</Text>
            <View style={styles.ingredientTable}>
              {ingredients.map((ingredient, index) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ width: '75%', borderEndWidth: 1, borderBottomWidth: index != ingredients.length - 1 ? 1 : 0 }}>
                    <Text style={styles.subtitle}>
                      {ingredient.title}
                    </Text>
                  </View>
                  <View style={{ width: '25%', borderBottomWidth: index != ingredients.length - 1 ? 1 : 0 }}>
                    <Text style={styles.subtitle}>
                    {ingredient.unit === 'qb' ? '*' : ingredient.amount} {ingredient.unit}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.title}>Preparazione</Text>
            <Text style={[styles.subtitle, { textAlign: 'justify', padding: "4%" }]}>{item.preparation}</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEFAF",
    width: "100%",
  },

  backCard: {
    backgroundColor: "#FFC90E",
    borderRadius: 20,
    width: "90%",
    marginHorizontal: "5%",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    paddingBottom: 20,
  },

  orangeBlock: {
    backgroundColor: "#FF7F27",
    borderRadius: 10,
    width: "85%",
    marginTop: 20,
    justifyContent: "center",
  },

  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "85%",
    marginTop: 20,
    alignItems: "center",
  },

  recipeTitle: {
    width: "80%",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },

  ingredientTable: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
  },

  centeredView: {
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
  },

  button: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'orange',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 10,
    margin: 10,
  },

});
