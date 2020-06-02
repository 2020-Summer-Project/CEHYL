import React from 'react';
import {Text, Button, View, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('0');
  const [gender, setGender] = React.useState('');
  const {signUp} = React.useContext(AuthContext);

  const {button, textInput, buttonText, container} = useTheme();

  return (
    <View style={container}>
      <TextInput
        placeholder="Full Name"
        style={textInput}
        value={name}
        onChangeText={setName}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Gender"
        style={textInput}
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Age"
        style={textInput}
        value={age}
        onChangeText={setAge}
        keyboardType={'number-pad'}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Email"
        style={textInput}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Password"
        style={textInput}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="white"
        secureTextEntry
      />
      <TouchableOpacity
        style={button}
        onPress={() => signUp({email, password, age, gender, name})}>
        <Text style={buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen;
