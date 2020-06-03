import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '../theme/maintheme';
import {AuthContext} from '../providers/authprovider';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    color: '#fff',
    alignItems: 'flex-start',
    backgroundColor: MyTheme.colors.background,
    alignItems: 'center',
  },
  text: {
    color: '#fff',

    width: Dimensions.get('window').width * 0.8,
  },
  button: {
    alignItems: 'flex-end',
    color: '#FF0000',
    marginBottom: '2%',
  },
  inputText: {
    backgroundColor: MyTheme.colors.card,
    width: '40%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: Dimensions.get('window').height * 0.2,
  },
  buttonText: {
    textAlign: 'center',
    color: MyTheme.colors.text,
  },
  header: {
    textAlign: 'center',
    color: '#FFF',
    padding: '2%',
    fontSize: 22,
  },
});
