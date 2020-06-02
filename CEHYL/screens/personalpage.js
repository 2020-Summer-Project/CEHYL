import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PageButton from '../components/pagebutton';
import TemperatureScreen from './temperature';


function PersonalPageHomeScreen({ navigation }) {
    return(
        <View>
            <Text>Personal Page</Text>
            <PageButton name="Temperature" onPress={() => navigation.navigate('Temperature')}></PageButton>
            <PageButton name="Diet" onPress={() => navigation.navigate('Temperature')}></PageButton>
            <PageButton name="MedicalRecords" onPress={() => navigation.navigate('Temperature')}></PageButton>
            <PageButton name="Notes" onPress={() => navigation.navigate('Temperature')}></PageButton>
        </View>
    );
}

const PersonalPageStack = createStackNavigator()

function PersonalPageScreen() {
    return (
        <PersonalPageStack.Navigator initialRouteName="PersonalPageHome" screenOptions={{
            headerShown: false
          }}>
            <PersonalPageStack.Screen name="PersonalPageHome" component={PersonalPageHomeScreen}/>
            <PersonalPageStack.Screen name="Temperature" component={TemperatureScreen}/>
            <PersonalPageStack.Screen name="Diet" component={TemperatureScreen}/>
            <PersonalPageStack.Screen name="MedicalRecords" component={TemperatureScreen}/>
            <PersonalPageStack.Screen name="Notes" component={TemperatureScreen}/>
        </PersonalPageStack.Navigator>
    );
}

export default PersonalPageScreen