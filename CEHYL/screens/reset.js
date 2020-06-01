import React from 'react';
import {Button, View, TextInput, Alert} from 'react-native';
import firebase from '../Firebase';

function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = React.useState('');

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
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Reset Password" onPress={() => reset({email})} />
    </View>
  );
}

export default ResetPasswordScreen;
