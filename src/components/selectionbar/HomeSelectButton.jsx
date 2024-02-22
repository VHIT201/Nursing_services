import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import themes from "../../../themes";

const HomeSelectButton = ({ title, navigation, handlePress,countMedicalExamination }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} resizeMode="contain" source={require('../../assets/Icon/logo.png')} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{height:"100%",width:'10%',alignItems:"center",justifyContent:"flex-start",paddingTop:4}}>

          {
            countMedicalExamination == null || countMedicalExamination == 0 ? 
            (
              <></>
            )
            :
            (
                <View style={{height:20,width:30,borderRadius:10,backgroundColor:"#FCA5A5",justifyContent:"center",alignItems:'center'}}>
                  <Text style={{color:"white",fontSize:12}}>{countMedicalExamination}</Text>
                </View>
            )
          }
          
        
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
    paddingRight: '3%',
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
    width:"70%",
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