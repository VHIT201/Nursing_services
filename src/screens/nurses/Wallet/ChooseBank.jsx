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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import themes from "../../../../themes";
import Header from "../../../components/header/Header";
import Input from "../../../components/textInput/TextInput";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { update,getInfoUser, updateUser } from "../../../redux/slices/userSlice";
import { useSelector,useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChooseBank = ({navigation}) => {
    const dispatch = useDispatch();
    
    const [banksList, setBanksList] = useState('')
    const popularBankList = ['Vietcombank','BIDV', 'VietinBank','Techcombank','Agribank','Sacombank','ACB','MBBank']
    const [nurseBank, setNurseBank] = useState('')
    // console.log("Ngân hàng của điều dưỡng : ", nurseBank.shortName)
    const [numberAccount, setNumberAccount] = useState('')
    const [nameAccount, setNameAccount] = useState('')
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [tokenUser, setTokenUser] = useState({});
    const [dataUser, setDataUser] = useState({})
    const {user} = useSelector((state) => state.user)
    
    // console.log(user);
    useEffect(() => {
      if (user) {
          setDataUser(user);
      }
  }, [user]); 

      useEffect(() => {
        async function getBanksData() {
            try {
              const response = await axios.get('https://test-payment.momo.vn/v2/gateway/api/bankcodes');
              // console.log(response.data);
              setBanksList(Object.entries(response.data).map(([key, value]) => ({
                id: key, 
                ...value
            })));
            } catch (error) {
              console.log(error);
            }
          }
          
          
          getBanksData();
      }, []);

             //SECTION - Bắt đầu vào trang
  useEffect(() => {
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        // dispatch(getInfoUser(data))  // get info user
        setTokenUser(data);
        setDataUser(prevDataUser => ({
          ...prevDataUser, token : data
        }))
      }
    };

    getToken();
  }, []);

  const handleAddBankAccount = async () => {
    const newDataUser = { ...dataUser };
    delete newDataUser.bank;
    newDataUser.bank = [
        {
            "bankName": nurseBank.shortName,
            "nameAccount": nameAccount,
            "numberAccount": numberAccount,
        }
    ];

    // Cập nhật Redux store và local state với newDataUser
    dispatch(updateUser(newDataUser));
    dispatch(update(newDataUser));
    setDataUser(newDataUser);
    // Dispatch action để lấy thông tin user mới từ server
    dispatch(getInfoUser(newDataUser.token));
}







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
        <View style={{height:10}}></View>
        <View style={styles.allBanks}>
          <View style={{width:"100%", marginBottom:10}}>
                  <Text style={{fontSize:15,fontWeight:'600'}}>TẤT CẢ NGÂN HÀNG</Text>
          </View>
          <View style={{width:"100%",borderRadius:10,backgroundColor:"white",overflow:'hidden'}}>
          {
            banksList !== '' && (
              banksList.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={()=>setNurseBank(item)} style={styles.btnAllBanks}>
                    <View style={{ width: "30%", height: "90%", justifyContent: "center", alignItems: "center" }}>
                      <Image style={{ height: '100%', width: '100%' }} resizeMode="contain" source={{ uri: item.bankLogoUrl }} />
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>Ngân hàng {item.shortName}</Text>
                  </TouchableOpacity>
                  <View style={{ height: 1, width: '100%', alignItems: 'center' }}>
                    <View style={{ height: 1, width: '90%', backgroundColor: themes.gray}}></View>
                  </View>
                </View>
              ))
            )
}
          </View>
        </View>
        <View style={{height:100}}></View>
      </ScrollView>
      
    {
      nurseBank !== '' && 
      (
        <View style={styles.modalGetBankInfo}>
          <Header namePage={'Thông tin tài khoản ngân hàng'} nameLeftIcon={'chevron-left'}/>
          <View style={styles.bottomView}>
            <View style={{width:"100%",marginBottom:10}}>
              <Text style={{fontSize:14,fontWeight:"500",color:'black',marginBottom:6}}>Ngân hàng</Text>
              <Input leftIconName={'user'} placeholder={'Nhập số tài khoản'} value={nurseBank.shortName} height={40} width={'100%'} isTrue={true}/>
            </View>
            <View style={{width:"100%",marginBottom:10}}>
              <Text style={{fontSize:14,fontWeight:"500",color:'black',marginBottom:6}}>Số tài khoản</Text>
              <Input onChangeText={(text)=>setNumberAccount(text)} leftIconName={'user'} placeholder={'Nhập số tài khoản'} height={40} width={'100%'} isTrue={true}/>
            </View>
            <View style={{width:"100%"}}>
              <Text style={{fontSize:14,fontWeight:"500",color:'black',marginBottom:6}}>Chủ tài khoản</Text>
              <Input onChangeText={(text)=>setNameAccount(text)} leftIconName={'user'} placeholder={'Chủ tài khoản'} height={40} width={'100%'} isTrue={true}/>
            </View>
          </View>
          <View style={[styles.bottomView,{backgroundColor:"#D1FAE5",paddingTop:5,paddingBottom:5,alignItems:'center',justifyContent:"center"}]}>
            <Text style={{fontSize:12,fontWeight:'400',color:'black'}}>{`Các thông tin được nhập là thông tin bạn đăng ký tại ${nurseBank.shortName} khi mở tài khoản/thẻ`}</Text>
          </View>

          <TouchableOpacity onPress={()=>setAgreeToTerms(!agreeToTerms)} style={{flexDirection:"row",width:"90%",marginTop:10}}>
            {
              agreeToTerms == true ? 
              (
                <View style={{height:16,width:16,borderWidth:1,justifyContent:'center',alignItems:"center",marginRight:10,borderRadius:4,backgroundColor:themes.green}}>
                  <MaterialCommunityIcons color={'white'} name={'check'}/>
                </View>
              )
              :
              (
                <View style={{height:16,width:16,borderWidth:1,justifyContent:'center',alignItems:"center",marginRight:10,borderRadius:4}}>
                </View>
              )
            }

            <Text style={{fontSize:12}}>Tôi xác nhận đồng ý với điều khoản của <Text style={{fontSize:14,fontWeight:'500',color:themes.green}}> Alo điều dưỡng</Text></Text>
          </TouchableOpacity>


            <View style={{flex:1,width:'100%',alignItems:"center",justifyContent:'flex-end',paddingBottom:20}}>
              <TouchableOpacity onPress={handleAddBankAccount} style={{height:windowHeight*0.05,width:"90%",backgroundColor:themes.green,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15,fontWeight:"500",color:'white'}}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }

    </View>
  )
}

export default ChooseBank

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:'100%',
        position:"relative"
    },
    modalGetBankInfo:{
      height:windowHeight,
      width:'100%',
      position:"absolute",
      backgroundColor:'white',
      alignItems:'center'
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
    },
    bottomView:{
      paddingTop:20,
      paddingBottom:20,
      paddingLeft:"5%",
      paddingRight:"5%",
      borderWidth:1,
      borderColor:'white',
      backgroundColor:'white',
      width:'94%',
      borderRadius:10,
      marginTop:10,
      alignItems:"center",
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25, 
      shadowRadius: 3, 
      elevation: 5, 
    },
    innerItemHorizontal:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      marginBottom:10
    },
    innerItemHorizontal_title:{
      fontSize:15,
      fontWeight:"400",
      color:'gray'
    },
    innerItemHorizontal_content:{
      fontSize:15,
      fontWeight:"500",
      color:'black'
    },
    
})