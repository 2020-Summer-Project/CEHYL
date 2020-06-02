import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';

function PageButton(props) {
    return(
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Text>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PageButton