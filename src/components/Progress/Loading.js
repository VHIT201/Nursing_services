import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import themes from '../../../themes'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={themes.green} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        backgroundColor:'rgba(209, 213, 219, 0.2)',
        justifyContent:'center',
        alignItems:"center"
    },
})