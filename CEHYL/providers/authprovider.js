import React, {createContext} from 'react';
import dispatch from '../App';
import firebase from '../Firebase';
import {Alert} from 'react-native';
import {NavigationHelpersContext} from '@react-navigation/native';

export const AuthContext = createContext();

const AuthProvider = ({children, dispatch}) => {
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password);
          console.log('Account signed in');
          var user = firebase.auth().currentUser;
          if (user) {
            // User is signed in.
            dispatch({type: 'SIGN_IN', token: user.uid});
          }
        } catch (error) {
          console.log(error.toString());
          const alert = Alert.alert(
            'The username/password combination is invalid. Please try again.',
          );
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password);
          const alert = Alert.alert('You have successfully signed up.');
          console.log('Account created');
          var user = firebase.auth().currentUser;
          if (user) {
            // User is signed in.
            firebase
              .database()
              .ref('users/' + user.uid)
              .set({
                email: data.email,
                name: data.name,
                gender: data.gender,
                age: data.age,
              });
            dispatch({type: 'SIGN_IN', token: user.uid});
          }
        } catch (error) {
          const alert = Alert.alert(
            'The email has been taken. Please use another email for sign-up.',
          );
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
