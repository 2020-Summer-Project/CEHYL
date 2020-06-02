import React from 'react';
import {Text, Button, View, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {styles} from '../styles/signinstyle';

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState('');
  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Gender"
        style={styles.textInput}
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Age"
        style={styles.textInput}
        value={age}
        onChangeText={setAge}
        keyboardType={'number-pad'}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="white"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => signUp({email, password, age, gender, name})}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen;
