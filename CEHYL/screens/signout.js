import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';

function SignOutScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {button, textInput, buttonText, container} = useTheme();

  return (
    <View style={container}>
      <Text style={textInput}>You have successfully signed out.</Text>
      <TouchableOpacity
        style={button}
        onPress={() => signIn({email, password})}>
        <Text style={buttonText}>Sign In Again</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignOutScreen;
