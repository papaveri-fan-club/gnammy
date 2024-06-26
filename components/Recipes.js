import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { initRecipes } from './initRecipes';

import Recipe from './Recipe';

const Recipes = ({ recipes, updateRecipes, idUser, isLoggedIn = false, userFavouriteRecipes = [0], setUserFavouriteRecipes, refreshing = false, endRefreshing, onRefresh = () => { }, onEndRefresh }) => {
  const addFavouriteRecipe = (idRecipe) => {
    const updatedRecipes = [...userFavouriteRecipes, idRecipe];
    setUserFavouriteRecipes(updatedRecipes);
  };

  const removeFavouriteRecipe = (idRecipe) => {
    const updatedRecipes = userFavouriteRecipes.filter(recipeId => recipeId !== idRecipe);
    setUserFavouriteRecipes(updatedRecipes);
  };

  initRecipes(recipes, updateRecipes);

  const { width, height } = Dimensions.get('screen');
  const ITEM_WIDTH = width * 0.77;
  const ITEM_HEIGHT = 350;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const scrollX = new Animated.Value(0);

  const renderRecipeItem = ({ item, index }) => {
    if (index === recipes.length - 1) {
      return (
        <View>
          <Recipe
            key={index}
            idUser={idUser}
            isLoggedIn={isLoggedIn}
            item={item}
            index={index}
            updateRecipes={updateRecipes}
            recipes={recipes}
            userFavouriteRecipes={userFavouriteRecipes}
            addFavouriteRecipe={addFavouriteRecipe}
            removeFavouriteRecipe={removeFavouriteRecipe}
            ITEM_HEIGHT={ITEM_HEIGHT}
            ITEM_WIDTH={ITEM_WIDTH}
            scrollY={scrollY}
            height={height}
            inputRange={[
              (index - 1) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 1) * ITEM_HEIGHT,
            ]}
            verse={"vertical"}
            />
          <View style={{ height: 40 }}>
            <ActivityIndicator style={{ marginBottom: 20, alignSelf: 'center' }} animating={endRefreshing} size="large" />
          </View>
        </View>
      );
    }
    return (
      <Recipe
      key={index}
      idUser={idUser}
      isLoggedIn={isLoggedIn}
      item={item}
      index={index}
      updateRecipes={updateRecipes}
      recipes={recipes}
      userFavouriteRecipes={userFavouriteRecipes}
      addFavouriteRecipe={addFavouriteRecipe}
      removeFavouriteRecipe={removeFavouriteRecipe}
      ITEM_HEIGHT={ITEM_HEIGHT}
      ITEM_WIDTH={ITEM_WIDTH}
      scrollY={scrollY}
      height={height}
      inputRange={[
        (index - 1) * ITEM_HEIGHT,
        index * ITEM_HEIGHT,
        (index + 1) * ITEM_HEIGHT,
      ]}
      verse={"vertical"}
      />
    );
  };

  return (
    <View style={{ justifyContent: 'center', height: '100%' }} >
      <Animated.FlatList
        style={styles.container}
        data={recipes}
        renderItem={renderRecipeItem}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndRefresh}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            <View style={{ height: 60 }}/>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Recipes;
