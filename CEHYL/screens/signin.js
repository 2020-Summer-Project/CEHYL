import React from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);
  const {button, textInput, buttonText, container, colors} = useTheme();
  return (
    <ScrollView contentContainerStyle={container}>
      <TextInput
        style={textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        placeholderTextColor={colors.textColor}
      />
      <TextInput
        style={textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        placeholderTextColor={colors.textColor}
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
        <Text style={buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default SignInScreen;
