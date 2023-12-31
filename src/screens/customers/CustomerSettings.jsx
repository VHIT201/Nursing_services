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

  //NOTE - Data user từ async
  const [user, setUser] = useState({});
  // useEffect(() => {
  //   console.log(user);
  // }, []);

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

  //NOTE - sửa thông tin

  //Chỉnh sửa thông tin
  const handleFullName = (text) => {
    setUser((prevUserDataRedux) => ({ ...prevUserDataRedux, fullname: text }));
  };
  const handleChangePhoneNumber = (text) => {
    setUser((prevUserDataRedux) => ({ ...prevUserDataRedux, phoneNumber: text }));
  };
  const handleChangeEmail = (text) => {
    setUser((prevUserDataRedux) => ({ ...prevUserDataRedux, email: text }));
  };
  const handleChangeAddress = (text) => {
    setUser((prevUserDataRedux) => ({ ...prevUserDataRedux, address: text }));
  };

  const [tempAvatar, setTempAvatar] = useState("");
  const handleUpdateUser = async () => {
    let dataUpdateUser = {
      token: tokenUser,
      fullname: userDataRedux.fullname,
      email: userDataRedux.email,
      gender: "Male",
      avatar: userDataRedux.avatar,
      birthOfDate: userDataRedux.birthOfDate,
      address: userDataRedux.address,
    };

    console.log("Thông tin update : ", dataUpdateUser);
    dispatch(update(dataUpdateUser))
  
   setTempAvatar('')
    setBeingSelected(1000);
    dispatch(getInfoUser(tokenUser))
  };
  useEffect(() => {
    dispatch(getInfoUser(tokenUser))
  }, []);

  //NOTE - Sửa ảnh

  const uploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const name = "avatar";
        const type = "image/png";
        const source = { uri, name, type };

        handleUpdata(source);
      }
    } catch (error) {
      console.log("Lỗi khi tải ảnh lên: " + error);
    }
  };

  //NOTE - hàm upload cloud viết tạm test
  const handleUpdata = (photo) => {
    const data = new FormData();
    data.append("image", photo);
    fetch("https://nursing-app-api.vercel.app/api/v1/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setPicture(data.url)
        console.log("có ảnh : ", data.data.path);
        setTempAvatar(data.data.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //NOTE - hàm upload pdf viết tạm test
  const handleUpPDF = (file) => {
    const data = new FormData();
    data.append("cv", file);
    fetch("https://nursing-app-api.vercel.app/api/v1/upload/pdf", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("có cv : ", data.data.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // State để lưu file PDF
  const [pdfFile, setPdfFile] = useState(null);

  const pickPDFFile = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      const { name, uri, type, size } = docRes;

      const file = {
        name: name.split(".")[0],
        uri: uri,
        type: type,
        size: size,
      };
      console.log(file)
      handleUpPDF(file)
    } catch (error) {
      console.log(error);
    }
  };

  //NOTE - Sinh nhật
  // Ngày sinh nhật
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(new Date());
  const [openModalDatePicker, setOpenModalDatePicker] = useState(false);
  const hanldeModalDatapicker = () => {
    setOpenModalDatePicker(true);
  };


  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePicker(currentDate);
    setOpenModalDatePicker(false);
    setUser((prevUser) => ({ ...prevUser, dateOfBirth: currentDate }));
  };
  

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const handleLeftButton = () => {
    setBeingSelected(6);
  };


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

  if (beingSelected === 0) {
    return (
      <View style={[styles.container, { paddingTop: 30 }]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          style={{ flex: 1, width: "100%" }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: themes.green,
                marginBottom: 20,
              }}
            >
              Thông tin người dùng
            </Text>
          </View>

          <View
            style={{
              height: 100,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 100,
                overflow: "hidden",
                position: "relative",
                width: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: themes.gray,
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              {/* //NOTE - ảnh đại diện */}
              <Image style={{height: 100, width: 100,borderRadius:50}} resizeMode="contain" 
              source={tempAvatar !== '' ? {uri : tempAvatar} : {uri: userDataRedux?.avatar}   } />

              <TouchableOpacity
                onPress={uploadImage}
                style={{
                  height: "26%",
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "rgba(156, 163, 175, 0.)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="camera"
                  size={14}
                  color={"rgba(156, 163, 175, 0.6)"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={[
                styles.text,
                { fontSize: 18, color: themes.green, lineHeight: 20 },
              ]}
            >
              {userDataRedux.fullname ? userDataRedux.fullname : "Unkown user"}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
            }}
          >
            <Text style={styles.text}>Họ & tên</Text>
            <View
              style={{
                height: 50,
                width: "100%",
                marginTop:10
              }}
            >

            <Input placeholder={'Họ và tên'} value={userDataRedux.fullname} leftIconName={'user'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    fullname: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "40%", gap: 4 }}>
              <Text style={[styles.text,{marginBottom:6}]}>Giới tính</Text>
              <TouchableOpacity
                style={{
                  position: "relative",
                  height: 40,
                  width: "100%",
                  paddingLeft: "10%",
                  paddingRight: "4%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderRadius:10,
                  backgroundColor:"white",
                }}
              >
                <FontAwesome name="intersex" size={16} color={themes.gray}/>
                <Text style={{marginLeft:10,fontSize:14,fontWeight:'500'}}>Nữ</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", gap: 4 }}>
              <Text style={[styles.text,{marginBottom:6}]}>Ngày sinh</Text>
              <View
                style={{
                  height: 40,
                  width: "100%",
                  paddingLeft: "4%",
                  paddingRight: "4%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor:'white',
                  borderRadius:10
                }}
              >
                <TouchableOpacity onPress={hanldeModalDatapicker}>
                    <AntDesign name={"calendar"} size={20} color={themes.green} />
                </TouchableOpacity>
                <Text style={{marginLeft:10,fontSize:14,fontWeight:"500"}}>{moment(userDataRedux.dateOfBirth).format("DD/MM/YYYY")}</Text>
                
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
            }}
          >
            <Text style={styles.text}>Số điện thoại</Text>
            <View
              style={{
                height: 50,
                width: "100%",
                marginTop:10

              }}
            >

              <Input placeholder={'Số điện thoại'} value={userDataRedux.phoneNumber} leftIconName={'phone'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    phoneNumber: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
            }}
          >
            <Text style={styles.text}>Email</Text>
            <View
              style={{

                height: 50,
                width: "100%",
                marginTop:10

              }}
            >

              <Input placeholder={'Email'} value={userDataRedux.email} leftIconName={'at-sign'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    email: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
              maxHeight: 72,
            }}
          >
            <Text style={styles.text}>Địa chỉ</Text>
            <View
              style={{
                // height:50,
                width: "100%",
                maxHeight: 200,
                marginTop:10
              }}
            >
              <Input placeholder={'Địa chỉ'} value={userDataRedux.address} leftIconName={'navigation'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    address: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 30,
            }}
          >
            <Text style={styles.text}>Tải lên hồ sơ cá nhân</Text>
            <View
              style={{
                height: 60,
                width: "100%",
                paddingLeft: "1%",
                paddingRight: "5%",
              }}
            >
              <TouchableOpacity onPress={pickPDFFile}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: themes.gray,
                  }}
                  resizeMode="contain"
                  source={require("../../assets/Icon/upload.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              height: 200,
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: "10%",
            }}
          >
            <TouchableOpacity
              onPress={handleUpdateUser}
              style={{
                height: "30%",
                width: "90%",
                backgroundColor: themes.green,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                Lưu thay đổi
              </Text>
            </TouchableOpacity>
          </View>

          {openModalDatePicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display="calendar"
              onChange={onChangeDatePicker}
            />
          )}

          {
        userDataRedux.loading && 
        (<View style={styles.modal}>
          <Loading/>
         </View>)
      }
        </KeyboardAwareScrollView>
      </View>
    );
  }
  if (beingSelected === 2) {
    return (
      <View style={styles.container}>
        <Header
          handleLeftButton={() => handleLeftButton()}
          nameLeftIcon={"chevron-left"}
          namePage={listSettings[beingSelected].label}
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
          namePage={listSettings[beingSelected].label}
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
          namePage={listSettings[beingSelected].label}
        />
      </View>
    );
  }
  if (beingSelected === 5) {
    async function removeUserData() {
      try {
        setBeingSelected(100);
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem('stateLogin')
        const temp = false
        await AsyncStorage.setItem('stateLogin', JSON.stringify(false));
        alert("Đã đăng xuất");
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
                onPress={() => navigation.navigate('CustomerProfile')}
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
