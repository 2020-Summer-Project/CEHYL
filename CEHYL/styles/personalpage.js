import {StyleSheet} from 'react-native';
import {MyTheme} from '../theme/maintheme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    marginBottom: '30%',
    marginHorizontal: 10,
    width: '40%',
    height: '80%',
    alignItems: 'center',
    backgroundColor: MyTheme.colors.background,
    borderColor: MyTheme.colors.border,
    borderRadius: 5,
    borderWidth: 1,
  },
  text: {
    color: '#FFFFFF',
    padding: '15%',
  },
  box: {
    flexDirection: 'row',
    padding: '5%',
  },
});
