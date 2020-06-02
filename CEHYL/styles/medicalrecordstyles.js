import {StyleSheet} from 'react-native';
import {MyTheme} from '../theme/maintheme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    color: '#fff',
    backgroundColor: MyTheme.colors.background,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
