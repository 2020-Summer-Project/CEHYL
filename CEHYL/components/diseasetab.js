import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../components/card';

export const DiseaseTab = (props) => {
    return(
        <View>
            <Text>{props.dateRange}</Text>
            <View style={styles.headerStyle}>
                <Text style={styles.header}>Disease Name</Text>
                <Text style={styles.header}>Number of occurence</Text>
            </View>
            <View>
                <Card>
                    <Text></Text>
                    <View style={styles.title1}>
                        <Text>Covid-19</Text>
                    </View>
                    <View style={styles.title2}>
                        <Text>100</Text>
                    </View>
                </Card>
                <Card>
                    <Text></Text>
                    <View style={styles.title1}>
                        <Text>Sars</Text>
                    </View>
                    <View style={styles.title2}>
                        <Text>1</Text>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    header: {
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
        marginHorizontal: 40,
    },
    title1: {
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 220, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title2: {
        position: 'absolute',
        top: 0, 
        left: 165,
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
})