import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './Home.js';
import Search from './Search.js';
import Account from './Account.js';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Home2 from './components/Home2.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Button, IconButton } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HeaderRightButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 15 }}>
      <Ionicons name="search" size={24} color="white" />
    </TouchableOpacity>
  );
};


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={
          {headerTitle:"", 
            tabBarIcon: ({color, size}) => (
              <Ionicons name="ios-home" color={color} size={size}/>
            ),
            // headerRight: () => (
            //   <TouchableOpacity onPress={() => {
            //     navigation.navigate('Search')
            //   }}>
            //   <Image style={{width: 25, height: 25, }} source={require("./assets/search.png")}/>
            //   </TouchableOpacity>
            //  )
            headerRight: () => {
              <HeaderRightButton />
            }
          }
        }>
        </Tab.Screen>
        <Tab.Screen name="Search" component={Search} isLoggedIn={isLoggedIn}/>
        <Tab.Screen name="Account" component={Account} options={{headerTitle:"", tabBarIcon:({color, size}) => (<MaterialCommunityIcons name='account' size={size} color={color} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;