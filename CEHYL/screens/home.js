import React from 'react';
import {Button, View, Text} from 'react-native';
import {AuthContext} from '../providers/authprovider';

function HomeScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Go back to Sign In" onPress={() => signOut()} />
    </View>
  );
}

export default HomeScreen;
