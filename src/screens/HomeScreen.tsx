import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Form from '../components/Form';

const HomeScreen = () => {
  return (
    <View style={styles.homeContainer}>
      <Text
        style={{
          color: 'purple',
          fontSize: 24,
          fontWeight: '600',
          textAlign: 'center',
        }}>
        Sample Form
      </Text>

      {/* My Form */}
      <Form />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
  },
});
