import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

//<div>Icons made by <a href="https://www.flaticon.com/authors/dimitry-miroliubov" title="Dimitry Miroliubov">Dimitry Miroliubov</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>



const fetchFonts = () => {
  return Font.loadAsync({
    'lacquer': require('./assets/fonts/Lacquer-Regular.ttf'),
    'long-cang': require('./assets/fonts/LongCang-Regular.ttf')
  })
}


export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)
 
  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() =>
      setDataLoaded(true)}/>
   }

  
  return (
    <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
