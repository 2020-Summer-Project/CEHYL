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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 220,
    bottom: 0,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'baseline',
    color: 'black',
  },
  cardViewRight: {
    position: 'absolute',
    top: 0,
    left: 165,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: MyTheme.textColor,
  },
  headerDate: {
    paddingRight: 70,
    color: MyTheme.textColor,
  },
});
