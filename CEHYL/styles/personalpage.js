import {StyleSheet} from 'react-native';
import {MyTheme} from '../theme/maintheme';

export const styles =  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    item: {
        width: '50%',
        height: '50%',
        alignItems: 'center',
        backgroundColor: MyTheme.colors.card,
        padding: 10,
        borderColor: MyTheme.colors.border,
        borderRadius: 5,
        borderWidth: 1,
    }
})