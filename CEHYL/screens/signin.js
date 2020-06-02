import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);
  const {button, textInput, buttonText, container} = useTheme();
  return (
    <View style={container}>
      <TextInput
        style={textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        placeholderTextColor="white"
      />
      <TextInput
        style={textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        placeholderTextColor="white"
        secureTextEntry
      />
      <TouchableOpacity
        style={button}
        onPress={() => signIn({email, password})}>
        <Text style={buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={buttonText}>Register Here</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={buttonText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignInScreen;
