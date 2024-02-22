import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  StatusBar,
  Button
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import InfoService from "../../components/selectionbar/InfoService";
import Header from "../../components/header/Header";
import themes from "../../../themes";
import { format, addMonths, subMonths } from 'date-fns';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NursesReport = ({navigation}) => {
  const openDrawer = () =>{
    navigation.openDrawer()
  }


  const getCurrentMonth = new Date(); // Lấy tháng hiện tại
  const [currentChooseTime, setCurrentChooseTime] = useState(format(getCurrentMonth, 'MM-yyyy'))


const startMonth = subMonths(getCurrentMonth, 12); // Tháng bắt đầu là tháng hiện tại trừ đi 12 tháng
const endMonth = addMonths(getCurrentMonth, 12); // Tháng kết thúc là tháng hiện tại cộng thêm 12 tháng

const monthList = [];

for (let date = startMonth; date <= endMonth; date = addMonths(date, 1)) {
  monthList.push(format(date, 'MM-yyyy')); // Định dạng và thêm tháng vào danh sách
}

// console.log(monthList); // In ra danh sách các tháng

const handleChooseTime = (time) =>{
  setCurrentChooseTime(time)
}

  return (
    <View style={styles.container}>
      <Header handleLeftButton={openDrawer} nameLeftIcon={'navicon'} namePage={'Báo cáo'}/>
      <View style={styles.body}>
        <View style={{height:'6%',width:'100%'}}>
          <FlatList style={{height:'100%',width:"100%"}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={monthList}
            initialScrollIndex={monthList.indexOf(currentChooseTime)}
            renderItem={({item}) =>
                <TouchableOpacity onPress={()=> handleChooseTime(item)} style={item == currentChooseTime ? styles.btnListTimeAct : styles.btnListTime}>
                  <Text style={item == currentChooseTime ? styles.textBtnListTimeAct : styles.textBtnListTime}>{item}</Text>
                </TouchableOpacity>
            }
            keyExtractor={item => item}
          />

        </View>
        <ScrollView style={styles.listDetails}>
            <View style={{flex:1,width:"100%",alignItems:"center"}}>
              <View style={styles.topItemTotalInfo}>
                <View style={{width:"90%",flexDirection:"row",justifyContent:'space-between'}}>
                  <Text style={styles.textInTopBanner}>Tiền vào</Text>
                  <Text style={styles.textInTopBanner}>400.000</Text>
                </View>
                <View style={{height:10}}></View>
                <View style={{width:"90%",flexDirection:"row",justifyContent:'space-between'}}>
                  <Text style={[styles.textInTopBanner]}>Tiền ra</Text>
                  <Text style={[styles.textInTopBanner, {color:'red'}]}>200.000</Text>
                </View>
                <View style={{height:10}}></View>
                <View style={{height:1,width:"90%",backgroundColor:'#f0f6fc'}}></View>
                <View style={{width:"90%",flexDirection:"row",justifyContent:'space-between',marginTop:10}}>
                  <Text style={styles.textInTopBanner}></Text>
                  <Text style={styles.textInTopBanner}>200.000</Text>
                </View>
              </View>

            {/* //SECTION - ItemListDayInMonth */}
            <View style={styles.coverOfDay}>
              <View style={{height:50,width:"100%",borderRadius:10,flexDirection:"row"}}>
                <View style={{height:"100%",width:"14%",justifyContent:"center",alignItems:"flex-start",paddingLeft:"5%"}}>
                  <Text style={[styles.textInTopBanner,{color:"#f0883e",fontSize:20}]}>20</Text>
                </View>
                <View style={{height:"100%",width:"56%",justifyContent:"center",alignItems:"flex-start"}}>
                  <Text style={{fontWeight:'400'}}>Hôm nay</Text>
                  <Text style={{fontWeight:'400'}}>tháng 02-2024</Text>
                </View>
                <View style={{height:"100%",width:"30%",justifyContent:"center",alignItems:"flex-end",paddingRight:"5%"}}>
                  <Text style={[styles.textInTopBanner,{color:"red"}]}>200.000</Text>
                </View>
              </View>
              <View style={{height:1,width:"90%",backgroundColor:themes.gray,marginTop:10}}></View>

            {/* //SECTION - ItemofListInDay */}
              <TouchableOpacity style={{width:"100%",paddingTop:10,paddingBottom:10,flexDirection:"row",justifyContent:"center",alignItems:'center'}}>
                <View style={{paddingTop:10,width:'60%',paddingLeft:"5%"}}>
                  <Text style={{fontWeight:'500',marginBottom:2}}>Ca bệnh BH1500</Text>
                  <Text style={{fontWeight:'400',fontSize:13}}>Phạm Văn Hoàng - 35t - Biên Hòa</Text>
                </View>
                <View style={{paddingTop:10,width:'40%',justifyContent:"center",alignItems:"flex-end",paddingRight:"5%"}}>
                  <Text style={{textAlign:'right'}}>200.000</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{width:"100%",paddingTop:10,paddingBottom:10,flexDirection:"row",justifyContent:"center",alignItems:'center'}}>
                <View style={{paddingTop:10,width:'60%',paddingLeft:"5%"}}>
                  <Text style={{fontWeight:'500',marginBottom:2}}>Rút tiền khỏi tài khoản</Text>
                  <Text style={{fontWeight:'400',fontSize:13}}>Phạm Văn Hoàng - 19:30pm</Text>
                </View>
                <View style={{paddingTop:10,width:'40%',justifyContent:"center",alignItems:"flex-end",paddingRight:"5%"}}>
                  <Text style={{color:"red",textAlign:'right'}}>-200.000</Text>
                </View>
              </TouchableOpacity>

            {/* //!SECTION */}
            </View>
             {/* //!SECTION */}



            <View style={{height:100}}></View>
            </View>
          </ScrollView>

        
      </View>
      
    </View>
  )
}

export default NursesReport

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
    backgroundColor:"white"
  },
  body:{
    flex:1,
    width:"100%",
    
  },
  box:{
    width:'100%',
    marginTop:20,
    height:200,
    borderRadius:10,
    borderWidth:1,
    borderColor:themes.gray,
    backgroundColor:"white"
  },
  top:{
    height:'20%',
    width:'100%',
    backgroundColor:themes.green,
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:'5%',
    paddingRight:'5%',
    flexDirection:'row',
    borderTopRightRadius:10,
    borderTopLeftRadius:10
  },
  text:{
    fontSize:15,
    fontWeight:'500',
    
  },
  btnListTime:{
    height:'100%',
    width: windowWidth * 0.2,
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:1,
    borderBottomColor:themes.gray
  },
  btnListTimeAct:{
    height:"100%",
    width: windowWidth * 0.2,
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:1,
    borderBottomColor:themes.green
  },
  textBtnListTime:{
    color:themes.gray,
  },
  textBtnListTimeAct:{
    color:themes.green
  },
  listDetails:{
    flex:1,
    width:"100%",
  },
  textInTopBanner:{
    fontSize:15,
    fontWeight:"600",
    textAlign:"center",
    textAlignVertical:"center",
    color:"white"
  },
  coverOfDay:{
    width:"94%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    borderWidth:1,
    marginTop:20,
    borderRadius:10,
    paddingTop:10,
    paddingBottom:10,
    borderColor: themes.gray,
    shadowColor: '#000', // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Độ dài và độ cao của bóng
    shadowOpacity: 0.25, // Độ mờ của bóng
    shadowRadius: 3, // Bán kính của bóng
    elevation: 5, // Elevation chỉ có hiệu lực trên Android
  },
  topItemTotalInfo:{
    height:140,
    width:"94%",
    backgroundColor:themes.green,
    marginTop:10,
    borderRadius:10,
    justifyContent:"center",
    alignItems:'center',

  }
  
})