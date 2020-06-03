import {StyleSheet} from 'react-native';
import {MyTheme} from '../theme/maintheme';

export const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.colors.card,
    padding: 10,
    borderColor: MyTheme.colors.border,
    borderRadius: 5,
    borderWidth: 1,
  },
  onPressed: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.colors.border,
    padding: 10,
    borderColor: MyTheme.colors.border,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonsContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  container: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
  header: {...MyTheme.header, color: 'white'},
});
