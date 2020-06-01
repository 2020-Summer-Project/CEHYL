import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FirstRoute, SecondRoute } from '../components/tab'

const Tab = createMaterialTopTabNavigator()

const myOwnFirst = () => {
  return <FirstRoute name="kenny" navigation=""></FirstRoute>
}

function DiseaseScreen() {
  return (

  );
}

export default DiseaseScreen;