import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from 'react-native';
import TemperatureScreen from './temperature';
import { MyTheme } from '../theme/maintheme'
import { styles } from '../styles/personalpage'

function PersonalPageHomeScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={MyTheme.header}>Personal Page</Text>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Temperature')}>
                <Text>Temperature</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Temperature')}>
                <Text>Diet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Temperature')}>
                <Text>Medical Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Temperature')}>
                <Text>Notes</Text>
            </TouchableOpacity>
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