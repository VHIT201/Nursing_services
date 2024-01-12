import React, { useEffect, useState } from "react";
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
import themes from "../../../../themes";
import Header from "../../../components/header/Header";
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChooseBank = () => {
    const [banksList, setBanksList] = useState('')
    const popularBankList = ['Vietcombank','BIDV', 'VietinBank','Techcombank','Agribank','Sacombank','ACB','MBBank']

      useEffect(() => {
        async function getBanksData() {
            try {
              const response = await axios.get('https://api.vietqr.io/v2/banks');
              // console.log(response.data.data);
              setBanksList(response.data.data)
            } catch (error) {
              console.log(error);
            }
          }
          
          
          getBanksData();
      }, []);



      const getDataBank = (shortName) => {
        if (banksList !== '') {
          // console.log(banksList);
          const filteredData = banksList.find((bank) => bank.shortName === shortName);
          // console.log('filteredData : ', filteredData);
          return (
            <TouchableOpacity style={styles.btnPopularBank} key={shortName}>
              <Image style={{height:'100%',width:'100%'}} resizeMode='center' source={{uri:filteredData.logo}}/>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      };




  return (
    <View style={styles.container}>
      <StatusBar/>
      <Header namePage={'Liên kết ngân hàng'} nameLeftIcon={'chevron-left'}/>
        <ScrollView>
        <View style={styles.boxSearch}>
            <View style={styles.innerBoxSearch}>
                <View style={{height:"100%",width:"5%",justifyContent:"center",alignItems:'center',marginRight:'3%'}}>
                    <Feather name='search' size={20} color={themes.gray}/>
                </View>
                <TextInput style={{height:"100%",width:"92%"}} placeholder="Tìm kiếm ngân hàng">

                </TextInput>
            </View>

        </View>
        <View style={styles.popularBank}>
            <View style={{width:"100%", marginBottom:10}}>
                <Text style={{fontSize:15,fontWeight:'600'}}>NGÂN HÀNG PHỔ BIẾN</Text>
            </View>
            <View style={{flex:1, width:'100%'}}>
              <View style={{flexDirection:'row',height:'50%',width:"100%", justifyContent:"space-around",alignItems:'center'}}>
                {popularBankList.slice(0, 4).map((item, index) => (
                  getDataBank(item, index)
                ))}
              </View>
              <View style={{flexDirection:'row',height:'50%',width:"100%", justifyContent:"space-around",alignItems:'center'}}>
                {popularBankList.slice(4, 8).map((item, index) => (
                  getDataBank(item, index)
                ))}
              </View>
            </View>
        </View>
        <View style={{height:20}}></View>
        <View style={styles.allBanks}>
          <View style={{width:"100%", marginBottom:10}}>
                  <Text style={{fontSize:15,fontWeight:'600'}}>TẤT CẢ NGÂN HÀNG</Text>
          </View>
          <View style={{width:"100%",borderRadius:10,backgroundColor:"white",overflow:'hidden'}}>
          {
            banksList !== '' && (
              banksList.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.btnAllBanks}>
                    <View style={{ width: "30%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                      <Image style={{ height: '100%', width: '100%' }} resizeMode="contain" source={{ uri: item.logo }} />
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>Ngân hàng {item.shortName}</Text>
                  </TouchableOpacity>
                  <View style={{ height: 1, width: '100%', alignItems: 'center' }}>
                    <View style={{ height: 1, width: '90%', backgroundColor: themes.gray }}></View>
                  </View>
                </View>
              ))
            )
}



            
          </View>
        </View>
        <View style={{height:100}}></View>
      </ScrollView>
    </View>
  )
}

export default ChooseBank

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:'100%',
    },
    boxSearch:{
        height:80,
        width:"100%",
        paddingLeft:"5%",
        paddingRight:"5%",
        justifyContent:'center',
        alignItems:"center"
    },
    innerBoxSearch: {
        height:40,
        width:"100%",
        borderRadius:20,
        borderWidth:1,
        borderColor:themes.gray,
        overflow:"hidden",
        paddingLeft:'5%',
        paddingRight:"5%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"
    },
    popularBank:{
        height:220,
        width:"100%",
        paddingLeft:"5%",
        paddingRight:'5%'
    },
    btnPopularBank:{
      height:'90%',
      width:"23%",
      backgroundColor:"white",
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center"
    },
    allBanks:{
      width:"100%",
      paddingLeft:"5%",
      paddingRight:'5%',
      alignItems:'center'
    },
    btnAllBanks:{
      height:50,
      width:"100%",
      backgroundColor:"white",
      justifyContent:"flex-start",
      alignItems:"center",
      flexDirection:'row',
      paddingLeft:'2%',
      paddingRight:'5%',
    }
})