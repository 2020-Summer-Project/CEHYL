import React from 'react';
import {Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const {signUp} = React.useContext(AuthContext);

  const {button, textInput, buttonText, container, colors} = useTheme();

  return (
    <ScrollView contentContainerStyle={container}>
      <TextInput
        placeholder="Full Name"
        style={textInput}
        value={name}
        onChangeText={setName}
        placeholderTextColor={colors.textColor}
      />
      <TextInput
        placeholder="Gender"
        style={textInput}
        value={gender}
        onChangeText={setGender}
        placeholderTextColor={colors.textColor}
      />
      <TextInput
        placeholder="Age"
        style={textInput}
        value={age}
        onChangeText={setAge}
        keyboardType={'number-pad'}
        placeholderTextColor={colors.textColor}
      />
      <TextInput
        placeholder="Email"
        style={textInput}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={colors.textColor}
      />
      <TextInput
        placeholder="Password"
        style={textInput}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={colors.textColor}
        secureTextEntry
      />
      <TouchableOpacity
        style={button}
        onPress={() => signUp({email, password, age, gender, name})}>
        <Text style={buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default SignUpScreen;
