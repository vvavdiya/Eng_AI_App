import React from 'react'
import MainStackNavigator from './src/navigation/MainStackNavigator'
import { Root } from "native-base";
export default function App() {
  console.disableYellowBox = true;
  return <Root>
    <MainStackNavigator />
  </Root>;
}