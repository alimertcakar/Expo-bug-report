import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UpdateControl from "./UpdateControl";
import Constants from "expo-constants";

export default function App() {
  return (
    <UpdateControl>
      <View style={styles.container}>
        <Text>HELLO! v{Constants.manifest.version} </Text>
        <StatusBar style="auto" />
      </View>
    </UpdateControl>

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
