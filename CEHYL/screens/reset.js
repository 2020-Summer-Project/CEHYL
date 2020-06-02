import React from 'react';
import {
  Text,
  Button,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firebase from '../Firebase';
import {useTheme} from '@react-navigation/native';

function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = React.useState('');

  const {button, textInput, buttonText, container} = useTheme();

  var auth = firebase.auth();

  async function reset(email) {
    try {
      await auth.sendPasswordResetEmail(email.email);
      // Email sent.
      Alert.alert('Check your email to reset your password.');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Please key in a valid registered email address.');
    }
  }

  return (
    <View style={container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        style={textInput}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={button} onPress={() => reset({email})}>
        <Text style={buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ResetPasswordScreen;
