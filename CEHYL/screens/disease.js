import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DiseaseTab from '../components/diseasetab';

import * as DiseaseAPI from '../API/disease';

const getLatestWeek = () => {
  return DiseaseAPI.getLatestEpiWeekNum();
};

function DiseaseScreen() {
  const [tabScreen, setTabScreen] = useState();
  const [previousFourWeeks, setPreviousFourWeeks] = useState(['', '', '', '']);
  const [disableButton, setDisableButton] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [buttonStyle, setButtonStyle] = useState([
    styles.button,
    styles.button,
    styles.button,
    styles.button,
  ]);
  const [diseaseTabList, setDiseaseTabList] = useState([
    null,
    null,
    null,
    null,
  ]);

  useEffect(async () => {
    const latestWeek = await getLatestWeek();

    const prevFourWeeks = DiseaseAPI.getPreviousFourWeeks(latestWeek).map(
      week => week.replace('-W', ' Week '),
    );

    pressButton(1, prevFourWeeks);
    setPreviousFourWeeks(prevFourWeeks);
  }, []);

  const pressButton = (key, dateRange) => {
    const index = parseInt(key) - 1;
    const length = dateRange[index].length;
    const year = parseInt(dateRange[index].substring(0, 4));
    const week = parseInt(dateRange[index].substring(length - 2, length));
    changeButtonStatus(index);
    changeButtonStyle(index);

    let tabScreen = diseaseTabList[index];
    if (tabScreen === null) {
      const epiWeek = `${year}-W` + (week <= 9 ? '0' + week : week);
      tabScreen = (
        <DiseaseTab
          key={key}
          week={week}
          dateRange={DiseaseAPI.getDateRangeOfWeek(week, year)}
          epiWeek={epiWeek}
        />
      );
      const updatedDiseaseTabList = [...diseaseTabList];
      updatedDiseaseTabList[index] = tabScreen;
      setDiseaseTabList(updatedDiseaseTabList);
    }
    setTabScreen(tabScreen);
  };

  const changeButtonStatus = index => {
    let disableStatus = [false, false, false, false];
    disableStatus[index] = !disableStatus[index];
    setDisableButton(disableStatus);
  };

  const changeButtonStyle = index => {
    let buttonStyle = [
      styles.button,
      styles.button,
      styles.button,
      styles.button,
    ];
    buttonStyle[index] = styles.onPressed;
    setButtonStyle(buttonStyle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Infection Count</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          disabled={disableButton[3]}
          style={buttonStyle[3]}
          onPress={() => pressButton('4', previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[3]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableButton[2]}
          style={buttonStyle[2]}
          onPress={() => pressButton('3', previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableButton[1]}
          style={buttonStyle[1]}
          onPress={() => pressButton('2', previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableButton[0]}
          style={buttonStyle[0]}
          onPress={() => pressButton('1', previousFourWeeks)}>
          <Text style={styles.textStyle}>{previousFourWeeks[0]}</Text>
        </TouchableOpacity>
      </View>
      {tabScreen}
      {console.log('rendered ran')}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#34F5C5',
    padding: 10,
    borderColor: '#21D082',
    borderRadius: 5,
    borderWidth: 1,
  },
  onPressed: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#21D082',
    padding: 10,
    borderColor: '#21D082',
    borderRadius: 5,
    borderWidth: 1,
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
  },
});

export default DiseaseScreen;
