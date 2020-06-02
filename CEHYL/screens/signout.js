import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../providers/authprovider';
import {styles} from '../styles/signoutstyle';

function SignOutScreen() {
  const {button, textInput, buttonText, container} = useTheme();

  const {reSignIn} = React.useContext(AuthContext);
  return (
    <View style={container}>
      <Text style={styles.text}>You have successfully signed out.</Text>
      <TouchableOpacity style={button} onPress={reSignIn}>
        <Text style={buttonText}>Sign In Again</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignOutScreen;
