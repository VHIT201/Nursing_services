import React, { useState, useEffect } from "react";
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
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Input from "../../components/textInput/TextInput";
import JobsReceived from "../nurses/JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import { getInfoUser, update, updatePassword, uploadPDF } from "../../redux/slices/userSlice";
import InfoService from "../../components/selectionbar/InfoService";
import * as ImagePicker from "expo-image-picker";
import placeholder from "../../assets/Icon/user.png";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import DatePicker from 'react-native-date-picker'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomerSettings = ({ navigation }) => {
  //dispatch
  const dispatch = useDispatch();

  //useState Textnput
  const [oldPasswordIsTrue, setOldPasswordIsTrue] = useState(true)
  const [newPasswordIsTrue, setNewPasswordIsTrue] = useState(true)
  const [confirmPasswordIsTrue, setConfirmPasswordIsTrue] = useState(true)
  //time
  const now = new Date();
  const time = now.toLocaleTimeString();



  const [tokenUser, setTokenUser] = useState({});
  const [userPassword, setUserPassword] = useState("");
  const [dataUpdatePassword, setDataUpdatePassword] = useState({
    token: tokenUser,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  

  //NOTE - update password
  const handleOldPassword = (text) => {
    setDataUpdatePassword((prevDataUpdatePassword) => ({
      ...prevDataUpdatePassword,
      oldPassword: text,
    }));
  };
  const handleNewPassword = (text) => {
    setDataUpdatePassword((prevDataUpdatePassword) => ({
      ...prevDataUpdatePassword,
      newPassword: text,
    }));
  };
  const confirmNewPassword = (text) => {
    setDataUpdatePassword((prevDataUpdatePassword) => ({
      ...prevDataUpdatePassword,
      confirmNewPassword: text,
    }));
  };

  const handleUpdatePassword = async () => {
    console.log("data update password : ", dataUpdatePassword);
    dispatch(updatePassword(dataUpdatePassword));
    // setBeingSelected(1000);
  };

  //SECTION - Bắt đầu vào trang
  useEffect(() => {
    console.log("bắt đầu tìm kiếm data")
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        dispatch(getInfoUser(data))  // get info user
        setTokenUser(data);
        setDataUpdatePassword((prevDataUpdatePassword) => ({
          ...prevDataUpdatePassword,
          token: data,
        }));
      }
    };

    getToken();
 

  }, []);

  useEffect(() => {
    dispatch(getInfoUser(tokenUser))
  }, []);

  //redux
  const data = useSelector((state) => state.user.user);
  const [userDataRedux, setUserDataRedux] = useState(data)
  const [avatar, setAvatar] = useState(null);

 const error = useSelector((state) => state.user.error)
// console.log('Đây là error : ' ,error[0].message)

//NOTE - Thay đổi message
useEffect(() => {
  if(error[0]?.message === 'Password does not match!'){
    setOldPasswordIsTrue(false)
  }
  if(error[0]?.message === 'Confirm password does not match!'){
    setConfirmPasswordIsTrue(false)
  }
}, [error[0]?.message]);

  // useEffect(() => {
  //   dispatch(getInfoUser(tokenUser))
  // }, []);


  const openDrawer = () => {
    navigation.openDrawer();
  };
  const handleLeftButton = () => {
    setBeingSelected(6);
  };

  const handleProfileCustomer = () => {
    console.log('Chuyển qua trang chi tiết tài khoản');
    navigation.navigate('CustomerProfile')
  }


  const [beingSelected, setBeingSelected] = useState(6);
  const [language, setLanguage] = useState("vi");
  const listSettings = [
    { key: 1, name: "changePassword", label: "Đổi mật khẩu" },
    { key: 2, name: "language", label: "Ngôn ngữ" },
    { key: 3, name: "rules", label: "Điều khoản sử dụng" },
    { key: 4, name: "privacyPolicy", label: "Chính sách bảo mật" },
    { key: 5, name: "exit", label: "Thoát" },
  ];
  // console.log(beingSelected)

  if (beingSelected === 1) {
    return (
      <View style={styles.container}>
        <Header
          handleLeftButton={() => handleLeftButton()}
          nameLeftIcon={"chevron-left"}
          namePage={listSettings[beingSelected-1].label}
        />
        <View
          style={{
            height: 300,
            width: "100%",
            paddingTop: "10%",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome5 name="lock" size={16} color={themes.green} />
            <View style={{ width: 10 }}></View>
            <Text
              style={{ fontSize: 16, fontWeight: "500", color: themes.green }}
            >
              Mật khẩu hiện tại
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: "100%",
              marginTop: 6,
            }}
          >

            <Input leftIconName={'key'} onChangeText={(text)=> setDataUpdatePassword((prevDataUpdatePassword) => ({
                    ...prevDataUpdatePassword,
                    oldPassword: text,
                    }))}
                    isTrue={true}
                    placeholder="Nhập mật khẩu hiện tại"/>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
            }}
          >
            <FontAwesome5 name="lock" size={16} color={themes.green} />
            <View style={{ width: 10 }}></View>
            <Text
              style={{ fontSize: 16, fontWeight: "500", color: themes.green }}
            >
              Mật khẩu mới
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: "100%",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "flex-start",

            }}
          >

            <Input leftIconName={'key'} onChangeText={(text)=> setDataUpdatePassword((prevDataUpdatePassword) => ({
                    ...prevDataUpdatePassword,
                    newPassword: text,
                    }))}
                    isTrue={true}
              placeholder="Mật khẩu mới"/>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
            }}
          >
            <FontAwesome5 name="lock" size={16} color={themes.green} />
            <View style={{ width: 10 }}></View>
            <Text
              style={{ fontSize: 16, fontWeight: "500", color: themes.green }}
            >
              Xác nhận mật khẩu mới
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: "100%",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >

            <Input isTrue={true} leftIconName={'key'} onChangeText={(text)=> setDataUpdatePassword((prevDataUpdatePassword) => ({
      ...prevDataUpdatePassword,
      confirmNewPassword: text,
    }))}
              placeholder="Xác nhận mật khẩu mới"/>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleUpdatePassword}
            style={{
              height: "10%",
              width: "90%",
              backgroundColor: themes.green,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
              Lưu thay đổi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (beingSelected === 2) {
    return (
      <View style={styles.container}>
        <Header
          handleLeftButton={() => handleLeftButton()}
          nameLeftIcon={"chevron-left"}
          namePage={listSettings[beingSelected-1].label}
        />
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingLeft: "5%",
            paddingRight: "5%",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => setLanguage("vi")}
            style={{
              width: "100%",
              height: 50,
              borderBottomWidth: 1,
              borderBottomColor: themes.green,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Tiếng Việt</Text>
            <Ionicons
              name={language === "vi" ? "radio-button-on" : "radio-button-off"}
              size={20}
              color={themes.green}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLanguage("en")}
            style={{
              width: "100%",
              height: 50,
              borderBottomWidth: 1,
              borderBottomColor: themes.green,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>English</Text>
            <Ionicons
              name={language === "en" ? "radio-button-on" : "radio-button-off"}
              size={20}
              color={themes.green}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (beingSelected === 3) {
    return (
      <View style={styles.container}>
        <Header
          handleLeftButton={() => handleLeftButton()}
          nameLeftIcon={"chevron-left"}
          namePage={listSettings[beingSelected-1].label}
        />
      </View>
    );
  }
  if (beingSelected === 4) {
    return (
      <View style={styles.container}>
        <Header
          handleLeftButton={() => handleLeftButton()}
          nameLeftIcon={"chevron-left"}
          namePage={listSettings[beingSelected-1].label}
        />
      </View>
    );
  }
  if (beingSelected === 5) {
    async function removeUserData() {
      try {
        setBeingSelected(100);
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("stateLogin")
        const temp = false
        await AsyncStorage.setItem('stateLogin', JSON.stringify(false));
        navigation.navigate("Login");
      } catch (e) {}
    }
    removeUserData();
  } else {
    return (
      <View style={styles.container}>
        <Header
          namePage={"Cài đặt"}
          nameLeftIcon={"navicon"}
          handleLeftButton={openDrawer}
        />
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "5%",
          }}
        >
        <TouchableOpacity
                onPress={handleProfileCustomer}
                style={{
                  height: 60,
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: themes.green,
                }}
              >
                <Text style={{ fontWeight: "500", fontSize: 15 }}>
                  Chi tiết tài khoản
                </Text>
                <AntDesign name={"right"} />
        </TouchableOpacity>
          <FlatList
            data={listSettings}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setBeingSelected(item.key)}
                style={{
                  height: 60,
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: themes.green,
                }}
              >
                <Text style={{ fontWeight: "500", fontSize: 15 }}>
                  {item.label}
                </Text>
                <AntDesign name={"right"} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          ></FlatList>
        </View>
        {
        userDataRedux.loading && 
        (<View style={styles.modal}>
          <Loading/>
         </View>)
      }
      </View>
    );
  }
};

export default CustomerSettings;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    position: 'relative',
    // backgroundColor:themes.gray
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: themes.green,
  },
  modal:{
    position:"absolute",
    height:windowHeight*1.2,
    width:"100%",
    alignItems: "center",
    
  },
});
