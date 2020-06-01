import React from 'react';
import { Text, View } from 'react-native';


export const DiseaseTab = (props) => {
    return(
        <View>
            <Text>{props.dateRange}</Text>
            <Text>Hi from tab {props.week}</Text>
        </View>
    );
}