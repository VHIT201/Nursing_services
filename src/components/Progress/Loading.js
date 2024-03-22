import { StyleSheet, Text, View,ActivityIndicator,Dimensions } from 'react-native'
import React from 'react'
import themes from '../../../themes'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={themes.green} />
      <View style={{height:80}}></View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:windowWidth,
        backgroundColor:'rgba(209, 213, 219, 0.3)',
        justifyContent:'center',
        alignItems:"center"
    },
})