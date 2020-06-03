import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '../theme/maintheme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  addIcon: {
    padding: 10,
    margin: 5,
    paddingTop: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  cardViewLeft: {
    width: '70%',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center',
    marginLeft: '10%',
  },
  cardViewRight: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  flatList: {
    marginHorizontal: 10,
    marginBottom: Dimensions.get('window').height * 0.4,
  },
  card: {
    paddingVertical: 10,
  },
  screenView: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: MyTheme.colors.card,
    width: '40%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 15,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    margin: 5,
  },
  headerTemp: {
    color: MyTheme.colors.textColor,
  },
  headerDate: {
    paddingRight: 70,
    color: MyTheme.colors.textColor,
  },
});
