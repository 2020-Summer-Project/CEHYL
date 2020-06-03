import {StyleSheet} from 'react-native';
import {MyTheme} from '../theme/maintheme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
    },
    addIcon: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    textCenter: {
        textAlign: 'center',
    }
})