import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '../theme/maintheme';

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
    marginBottom: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: MyTheme.colors.text,
  },
});
