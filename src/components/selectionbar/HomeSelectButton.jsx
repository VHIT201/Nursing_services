import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import themes from "../../../themes";

const HomeSelectButton = ({ title, navigation, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} resizeMode="contain" source={require('../../assets/Icon/logo.png')} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: '2%',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  logoContainer: {
    width: '20%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '60%',
    width: '60%',
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
 
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: themes.green,
  },
});

export default HomeSelectButton;