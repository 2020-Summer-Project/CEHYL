import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DiseaseTab} from '../components/diseasetab';

import * as DiseaseAPI from '../API/disease';

const getLatestWeek = () => {
  return DiseaseAPI.getLatestEpiWeekNum()
}


function DiseaseScreen() {
  const [screen, setScreen] = useState(<DiseaseTab week="1"/>);
  const [previousFourWeeks, setPreviousFourWeeks] = useState(["", "", "", ""])

  if (!previousFourWeeks[0]) {
    getLatestWeek().then(
      (epi_week) => {
        setPreviousFourWeeks(DiseaseAPI.getPreviousFourWeeks(epi_week).map((week) => week.replace("-W", " Week ")))
      } 
    )
  }


  const pressButton = (key) => {
    const index = parseInt(key) - 1
    const length = previousFourWeeks[index].length;
    const year = parseInt(previousFourWeeks[index].substring(0, 4))
    const week = parseInt(previousFourWeeks[index].substring(length - 2, length))
    setScreen(<DiseaseTab week={key} dateRange={DiseaseAPI.getDateRangeOfWeek(week, year)}></DiseaseTab>)
    console.log(DiseaseAPI.getDateRangeOfWeek(week, year))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Disease</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("1")}>
          <Text style={styles.textStyle}>{previousFourWeeks[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("2")}>
          <Text style={styles.textStyle}>{previousFourWeeks[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("3")}>
          <Text style={styles.textStyle}>{previousFourWeeks[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pressButton("4")}>
          <Text style={styles.textStyle}>{previousFourWeeks[3]}</Text>
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
  },
  textStyle: {
    textAlign: 'center',
  }
})

export default DiseaseScreen;
