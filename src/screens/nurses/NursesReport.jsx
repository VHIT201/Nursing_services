import React, { useState,useEffect } from "react";
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
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListMedicalByNurseId, getListMedicalByUserId } from "../../redux/slices/medicalCaseSlice";
import { getTransaction } from "../../redux/slices/userSlice";
import { format, addMonths, subMonths,parse } from 'date-fns';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Loading from "../../components/Progress/Loading";
const NursesReport = ({navigation}) => {
  const openDrawer = () =>{
    navigation.openDrawer()
  }

  const getCurrentMonth = new Date(); // Lấy tháng hiện tại
  const [tokenUser, setTokenUser] = useState('')
  const [currentChooseTime, setCurrentChooseTime] = useState(format(getCurrentMonth, 'MM-yyyy'))
  const getCurrentDay = format(new Date(), 'MM/dd/yyyy');
  const dispatch = useDispatch()
  
const startMonth = subMonths(getCurrentMonth, 24); // Tháng bắt đầu là tháng hiện tại trừ đi 12 tháng
const endMonth = addMonths(getCurrentMonth, 12); // Tháng kết thúc là tháng hiện tại cộng thêm 12 tháng

const monthList = [];

for (let date = startMonth; date <= endMonth; date = addMonths(date, 1)) {
  monthList.push(format(date, 'MM-yyyy')); // Định dạng và thêm tháng vào danh sách
}

// console.log(monthList); // In ra danh sách các tháng

const handleChooseTime = (time) =>{
  setCurrentChooseTime(time);
  const parsedTime = parse(time, 'MM-yyyy', new Date());
  const formattedTime = format(parsedTime, 'yyyy-MM');
  // console.log(formattedTime);
  let values = {
    token : tokenUser,
    nurseId: userDataRedux.user._id,
    date : formattedTime
  }
  dispatch(getTransaction(values))
}

const userDataRedux = useSelector((state) => state.user)
const {transactions} = useSelector((state) => state.user)
// console.log(transactions)
const loadingMedical = useSelector((state) => state.medicals.loading)
const loadingUser = useSelector(state=>state.user.loading)

function convertDateFormat(dateString) {
  // Kiểm tra định dạng hiện tại của chuỗi đầu vào
  if (dateString.match(/^\d{2}-\d{4}$/)) {
    // Nếu định dạng là MM-yyyy, chuyển sang yyyy-MM
    let [month, year] = dateString.split('-');
    month = parseInt(month, 10);
    return `${year}-${String(month).padStart(2, '0')}`;
  } else if (dateString.match(/^\d{4}-\d{2}$/)) {
    // Nếu định dạng là yyyy-MM, chuyển sang MM-yyyy
    let [year, month] = dateString.split('-');
    month = parseInt(month, 10);
    return `${String(month).padStart(2, '0')}-${year}`;
  } else {
    // Nếu không phải là định dạng hợp lệ, trả về null
    return null;
  }
}

//SECTION - Bắt đầu
useEffect(() => {
  const getToken = async () => {
    const value = await AsyncStorage.getItem("userToken"); 
    let currentDay = format(new Date(), 'MM-yyyy');
    if (value !== null) {
      const data = JSON.parse(value); 
      setTokenUser(data)
      
      let values = {
        token : data,
        // status : 'waiting',
        date : convertDateFormat(currentDay),
        nurseId: userDataRedux.user._id
      }
      dispatch(getListMedicalByNurseId(values))
      dispatch(getTransaction(values))
    }
  };
  getToken()
}, []);

const groupedTransactions = transactions.reduce((acc, transaction) => {
  // Lấy thời gian tạo giao dịch
  const createdAt = new Date(transaction.createdAt);
  // Định dạng thời gian theo dạng "MM/dd/yyyy"
  const date = format(createdAt, 'MM/dd/yyyy');
  
  // Kiểm tra xem ngày đã được thêm vào mảng chưa
  if (!acc[date]) {
    acc[date] = [];
  }
  // Thêm giao dịch vào mảng tương ứng với ngày của nó
  acc[date].push(transaction);

  return acc;
}, {});

// Chuyển các khóa của đối tượng thành mảng các cặp key-value
const sortedDates = Object.entries(groupedTransactions)
  // Sắp xếp các cặp key-value theo ngày, từ lớn nhất đến nhỏ nhất
  .sort((a, b) => new Date(b[0]) - new Date(a[0]))
  // Chuyển lại thành đối tượng
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

// console.log(sortedDates);


const formatAmount = (amount) => {
  // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với dấu phân cách
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};


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
              {
                Object.keys(groupedTransactions).length === 0 ? (
                  <View style={{ height:windowHeight*0.7, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize:14,fontWeight:"500",color:"gray"}}>Không có giao dịch</Text>
                  </View>
                )
                :
                (
                  Object.keys(sortedDates).map(date => (
                  <View key={date} style={styles.coverOfDay}>
                    <View  style={{height:50,width:"100%",borderRadius:10,flexDirection:"row"}}>
                      <View style={{height:"100%",width:"14%",justifyContent:"center",alignItems:"flex-start",paddingLeft:"5%"}}>
                        <Text style={[styles.textInTopBanner,{color:"#f0883e",fontSize:20}]}>{date.substring(3, 5)}</Text>
                      </View>
                    <View style={{height:"100%",width:"56%",justifyContent:"center",alignItems:"flex-start"}}>
                    <Text style={{fontWeight:'400'}}>
                      {getCurrentDay == date ? "Hôm nay" : (`Ngày ${date.substring(3,5)}`)}
                    </Text>
                      <Text style={{fontWeight:'400'}}>{`tháng ${date.substring(0, date.indexOf('/'))} năm ${date.substring(date.indexOf('/') + 4)}`}</Text>
                    </View>
                    <View style={{height:"100%",width:"30%",justifyContent:"center",alignItems:"flex-end",paddingRight:"5%"}}>
                      <Text style={[styles.textInTopBanner,{color:"red"}]}>{date.amount}</Text>
                    </View>
                  </View>
                  <View style={{height:1,width:"90%",backgroundColor:themes.gray,marginTop:10}}></View>

                  {sortedDates[date].map(transaction => (
                    <TouchableOpacity key={transaction._id} style={{width:"100%",paddingTop:10,paddingBottom:10,flexDirection:"row",justifyContent:"center",alignItems:'center'}}>
                      <View style={{paddingTop:10,width:'60%',paddingLeft:"5%"}}>
                        <Text style={{fontWeight:'500',marginBottom:2}}>{transaction.type == 'deposit' ? 'Nạp tiền vào tài khoản' : 'Ca bệnh'}</Text>
                        <Text style={{fontWeight:'400',fontSize:13}}>
                          {`${transaction.userId.fullname} - ${transaction.userId.address}`}
                        </Text>
                      </View>
                      <View style={{paddingTop:10,width:'40%',justifyContent:"center",alignItems:"flex-end",paddingRight:"5%"}}>
                        <Text style={{ textAlign: 'right', fontWeight: '500', color: transaction.type === 'deposit' ? themes.green : 'red' }}>
                          {transaction.type == 'deposit' ? `+ ${formatAmount(transaction.amount)}` : ` ${formatAmount(transaction.amount)} `}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}

  
                </View>
                ))
                )
              }
            <View style={{height:100}}></View>
            </View>
          </ScrollView>

        
      </View>
      {
        loadingMedical == true && (
          <Loading/>
        )
      }
      {
        loadingUser == true && (
          <Loading/>
        )
      }
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
    // backgroundColor:themes.green,
    backgroundColor:'#7fc15e',
    marginTop:10,
    borderRadius:10,
    justifyContent:"center",
    alignItems:'center',

  }
  
})