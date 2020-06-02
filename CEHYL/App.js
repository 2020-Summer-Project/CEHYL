import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthProvider from './providers/authprovider';
import SignInScreen from './screens/signin';
import DiseaseScreen from './screens/disease';
import SignUpScreen from './screens/signup';
import ProfileScreen from './screens/profile';
import ResetPasswordScreen from './screens/reset';
import PersonalPageScreen from './screens/personalpage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyTheme} from './theme/maintheme';
import {bottomtabstyle} from './styles/bottomtabstyles';

export default function App({navigation}) {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  function mainPageTab() {
    return (
      <Tab.Navigator tabBarOptions={bottomtabstyle}>
        <Tab.Screen name="Home" component={DiseaseScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="PersonalHomePage" component={PersonalPageScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <AuthProvider dispatch={dispatch}>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign In',
                  headerTitleStyle: {
                    textAlign: 'center',
                  },
                }}
              />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
              />
            </>
          ) : (
            <Stack.Screen name="TrackMyHealth" component={mainPageTab} />
          )}
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
