import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {DiseaseTab} from '../components/diseasetab';



function DiseaseScreen() {
  const [screen, setScreen] = useState(<DiseaseTab week="1"/>);

  const pressButton = (key) => {
    setScreen(<DiseaseTab week={key}></DiseaseTab>)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Disease</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("1")}>
          <Text>Week 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("2")}>
          <Text>Week 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("3")}>
          <Text>Week 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("4")}>
          <Text>Week 4</Text>
        </TouchableOpacity>
      </View>
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'skyblue',
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
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  }
})

export default DiseaseScreen;