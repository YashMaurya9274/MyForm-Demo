import {StyleSheet, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
});
