import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import themes from '../../../themes'
const InfoService = ({state,service,startDay,startTime, address, user, totalMoney,handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.left}>
        {
            state === 'notReceived' ? (
            <View style={{ height: "100%", width: "20%", backgroundColor: themes.yellow }}></View>
          ) : state === 'happening' ? (
            <View style={{ height: "100%", width: "20%", backgroundColor: themes.blue }}></View>
          ) : state === 'complete' ? (
            <View style={{ height: "100%", width: "20%", backgroundColor: themes.green }}></View>
          ) : state === 'cancelled' ? (
            <View style={{ height: "100%", width: "20%", backgroundColor: themes.red }}></View>
          ) : null
        }
        
      </View>
      <View style={styles.right}>
        <Text style={{fontSize:15,fontWeight:'500',color:themes.green}}>Chăm sóc bệnh nhân tại nhà</Text>
        <Text style={styles.text}>Ngày bắt đầu : <Text style={{fontSize:13,fontWeight:'400'}}>14/11/2023</Text></Text>
        <Text style={styles.text}>Giờ bắt đầu : 09:00</Text>
        <Text style={styles.text}>Địa chỉ : <Text style={{fontWeight:"400",fontSize:13}}>298, hẻm 7, tổ 39, khu phố 11, P.Tân Phong, Biên Hòa, Đồng Nai</Text></Text>
        <Text style={styles.text}>Người đặt dịch vụ : Ngọc</Text>
        <Text style={styles.text}>Trạng thái : Đang chờ</Text>
        <Text style={styles.text}>Tổng tiền : <Text style={{fontWeight:'500',color:themes.green}}>300.000 đ</Text></Text>
      </View>
    </TouchableOpacity>
  )
}

export default InfoService

const styles = StyleSheet.create({
    container:{
        height:200,
        width:"100%",
        flexDirection:'row',
        paddingTop:'2%',
        paddingBottom:"2%",
        borderBottomWidth:1,
        borderBottomColor:themes.green,
        
    },
    left:{
      height:"100%",
      width:"10%" ,
      
    },
    right:{
        height:"100%",
        width:"90%",
        justifyContent:'space-evenly'
    },
    text:{
        fontSize:13,
        fontWeight:'500'
    }
})