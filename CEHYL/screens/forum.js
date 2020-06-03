import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import CreatePostScreen from './CreatePostScreen';
import ForumPostsScreen from './ForumPostsScreen';

const styles = StyleSheet.create({
  btn: {
    padding: 20,
    marginVertical: 15,
    fontSize: 20,
  },
});

function ForumHome({navigation}) {
  const {button, buttonText, container} = useTheme();
  return (
    <View style={container}>
      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('ViewPosts')}>
        <Text style={{...buttonText, ...styles.btn}}>View Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('CreatePost')}>
        <Text style={{...buttonText, ...styles.btn}}>Create Posts</Text>
      </TouchableOpacity>
    </View>
  );
}

function ForumScreen() {
  const ForumStack = createStackNavigator();
  return (
    <ForumStack.Navigator
      initialRouteName="ForumHome"
      screenOptions={{
        headerShown: false,
      }}>
      <ForumStack.Screen name="ForumHome" component={ForumHome} />
      <ForumStack.Screen name="ViewPosts" component={ForumPostsScreen} />
      <ForumStack.Screen name="CreatePost" component={CreatePostScreen} />
    </ForumStack.Navigator>
  );
}

export default ForumScreen;
