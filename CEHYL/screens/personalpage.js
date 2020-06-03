import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import TemperatureScreen from './temperature';
import NotesScreen from './notes';
import {MyTheme} from '../theme/maintheme';
import {styles} from '../styles/personalpage';

function PersonalPageHomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={MyTheme.header}>Personal Page</Text>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Temperature')}>
          <Text style={styles.text}>Temperature</Text>
          <Image source={require('../icons8-temperature-100.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Notes')}>
          <Text style={styles.text}>Notes</Text>
          <Image source={require('../icons8-create-document-100.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PersonalPageStack = createStackNavigator();

function PersonalPageScreen() {
  return (
    <PersonalPageStack.Navigator
      initialRouteName="PersonalPageHome"
      screenOptions={{
        headerShown: false,
      }}>
      <PersonalPageStack.Screen
        name="PersonalPageHome"
        component={PersonalPageHomeScreen}
      />
      <PersonalPageStack.Screen
        name="Temperature"
        component={TemperatureScreen}
      />
      <PersonalPageStack.Screen name="Diet" component={TemperatureScreen} />
      <PersonalPageStack.Screen name="Notes" component={NotesScreen} />
    </PersonalPageStack.Navigator>
  );
}

export default PersonalPageScreen;
