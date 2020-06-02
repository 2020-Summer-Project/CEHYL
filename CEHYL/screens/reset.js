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
import {styles} from '../styles/signinstyle';

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
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        style={styles.textInput}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={() => reset({email})}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ResetPasswordScreen;
