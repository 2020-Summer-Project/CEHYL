import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DiseaseTab} from '../components/diseasetab';

import * as DiseaseAPI from '../API/disease';

const getLatestWeek = () => {
  return DiseaseAPI.getLatestEpiWeekNum()
}


function DiseaseScreen() {
  const [screen, setScreen] = useState();
  const [previousFourWeeks, setPreviousFourWeeks] = useState(["", "", "", ""])
  const [disableButton, setDisableButton] = useState([false, false, false, false])
  const [listOfRecords, setListOfRecords] = useState([])
  
  useEffect(async () => {
    const latestWeek = await getLatestWeek()

    const prevFourWeeks = DiseaseAPI.getPreviousFourWeeks(latestWeek).map((week) => week.replace("-W", " Week "))
    const result = []
    prevFourWeeks.map(async (week) => {
      const response = await DiseaseAPI.getEpiWeek(week.replace(" Week ", "-W"))
      result.push(response)
    })

    pressButton(1, prevFourWeeks)
    setPreviousFourWeeks(prevFourWeeks)
    setListOfRecords(result)
  }, [])

  const pressButton = (key, dateRange) => {
    const index = parseInt(key) - 1
    const length = dateRange[index].length;
    const year = parseInt(dateRange[index].substring(0, 4))
    const week = parseInt(dateRange[index].substring(length - 2, length))
    let disableStatus = [false, false, false, false]
    disableStatus[index] = !disableStatus[index]
    setDisableButton(disableStatus) 
    setScreen(<DiseaseTab week={week} dateRange={DiseaseAPI.getDateRangeOfWeek(week, year)}></DiseaseTab>)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Disease</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity disabled={disableButton[3]} style={styles.button} onPress={() => pressButton("4", previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[3]}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disableButton[2]} style={styles.button} onPress={() => pressButton("3", previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disableButton[1]} style={styles.button} onPress={() => pressButton("2", previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disableButton[0]} style={styles.button} onPress={() => pressButton("1", previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[0]}</Text>
        </TouchableOpacity>
      </View>
      {screen}
      <Text onPress={() => console.log(listOfRecords)}>Press</Text>
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
