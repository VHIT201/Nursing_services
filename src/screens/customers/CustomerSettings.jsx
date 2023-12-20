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

import JobsReceived from "../nurses/JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import { getInfoUser, update, updatePassword } from "../../redux/slices/userSlice";
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
  const userDataRedux = useSelector((state) => state.user);
  // console.log(userDataRedux)

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
    setBeingSelected(1000);
  };

  useEffect(() => {
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken");
      if (value !== null) {
        const data = JSON.parse(value);
        // console.log('Thông tin token : ',data)
        setTokenUser(data);
        setDataUpdatePassword((prevDataUpdatePassword) => ({
          ...prevDataUpdatePassword,
          token: data,
        }));
      }
    };

    const getPassword = async () => {
      const value = await AsyncStorage.getItem("userPassword");
      if (value !== null) {
        const data = JSON.parse(value);
        // console.log('Thông tin password : ',data)
        setUserPassword(data);
        setDataUpdatePassword((prevDataUpdatePassword) => ({
          ...prevDataUpdatePassword,
          oldPassword: data,
        }));
      }
    };
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("userStoreData");
        if (value !== null) {
          const data = JSON.parse(value);
          // console.log("Thông tin data : ", data);

          setUser(data);
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log("Lỗi khi đọc dữ liệu:", error);
        navigation.navigate("Login");
      }
    };
    getToken();
    getData();
    getPassword();
  }, []);

  // console.log('data user : ' ,user)
  //data

  const [avatar, setAvatar] = useState(null);
  //redux
  const dispatch = useDispatch();

  //NOTE - sửa thông tin

  //Chỉnh sửa thông tin
  const handleFullName = (text) => {
    setUser((prevUser) => ({ ...prevUser, fullname: text }));
  };
  const handleChangePhoneNumber = (text) => {
    setUser((prevUser) => ({ ...prevUser, phoneNumber: text }));
  };
  const handleChangeEmail = (text) => {
    setUser((prevUser) => ({ ...prevUser, email: text }));
  };
  const handleChangeAddress = (text) => {
    setUser((prevUser) => ({ ...prevUser, address: text }));
  };

  const [tempAvatar, setTempAvatar] = useState("");
  const handleUpdateUser = async () => {
    let dataUpdateUser = {
      token: tokenUser,
      fullname: user.fullname,
      email: user.email,
      gender: "Male",
      avatar: tempAvatar || user.avatar,
      birthOfDate: user.birthOfDate,
      address: user.address,
    };

    console.log("Thông tin update : ", dataUpdateUser);
   const response = await dispatch(update(dataUpdateUser));
  
   setTempAvatar('')
    setBeingSelected(1000);
  };
  useEffect(() => {
    dispatch(getInfoUser(tokenUser))
  }, []);

  //NOTE - Sửa ảnh

  // State lưu đường dẫn ảnh
  const [imageUri, setImageUri] = useState("");

  // State lưu file ảnh
  const [image, setImage] = useState(user.avatar);

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
    // data.append('upload_preset','test_upload_avatar')
    // data.append("clould_name","dcq1kx1wa")
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
console.log("temp avatar : ",tempAvatar)
console.log("user : ", user)
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

      setPdfFile(file);
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
  //biến giữ giá trị sn datePicker
  // console.log(moment(datePicker).format('YYYY-MM-DD'))

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
    { key: 0, name: "profile", label: "Chi tiết tài khoản" },
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
              {/* <Image
                style={{ height: 100, width: 100, borderRadius: 50 }}
                resizeMode="contain"
                source={{
                  uri: "https://res.cloudinary.com/ddg0aosts/image/upload/v1702390216/nursing/users/l5a4qd55o9gwz1xhc0mp.jpg",
                }}
              /> */}

              {/* //NOTE - ảnh đại diện */}
              <Image style={{height: 100, width: 100,borderRadius:50}} resizeMode="contain" source={tempAvatar === '' ? {uri: user.avatar} :  {uri : tempAvatar}} />

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
              {user.fullname ? user.fullname : "Unkown user"}
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
                borderWidth: 1,
                height: 34,
                width: "100%",
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <TextInput
                onChangeText={handleFullName}
                value={user.fullname}
                style={{ height: "100%", width: "100%" }}
                placeholder="Họ và tên"
              ></TextInput>
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
              <Text style={styles.text}>Giới tính</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  position: "relative",
                  height: 34,
                  width: "100%",
                  paddingLeft: "4%",
                  paddingRight: "4%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Nữ</Text>
                <Ionicons name="person" size={16} />
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", gap: 4 }}>
              <Text style={styles.text}>Ngày sinh</Text>
              <View
                style={{
                  borderWidth: 1,
                  height: 34,
                  width: "100%",
                  paddingLeft: "4%",
                  paddingRight: "4%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingRight: "10%",
                }}
              >
                <Text>{moment(user.dateOfBirth).format("DD/MM/YYYY")}</Text>
                <TouchableOpacity onPress={hanldeModalDatapicker}>
                  <AntDesign name={"calendar"} size={20} color={themes.green} />
                </TouchableOpacity>
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
                borderWidth: 1,
                height: 34,
                width: "100%",
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <TextInput
                onChangeText={handleChangePhoneNumber}
                value={user.phoneNumber}
                style={{ height: "100%", width: "100%" }}
                placeholder="Số điện thoại"
              ></TextInput>
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
                borderWidth: 1,
                height: 34,
                width: "100%",
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <TextInput
                onChangeText={handleChangeEmail}
                value={user.email}
                style={{ height: "100%", width: "100%" }}
                placeholder="Email"
              ></TextInput>
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
                borderWidth: 1,
                width: "100%",
                paddingLeft: "2%",
                paddingRight: "2%",
                maxHeight: 72,
              }}
            >
              <TextInput
                multiline
                onChangeText={handleChangeAddress}
                value={user.address}
                style={{ width: "100%" }}
                placeholder="Địa chỉ"
              ></TextInput>
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
        </KeyboardAwareScrollView>
      </View>
    );
  }
  if (beingSelected === 1) {
    return (
      <View style={styles.container}>
        <Header
          handleLeftButton={() => handleLeftButton()}
          nameLeftIcon={"chevron-left"}
          namePage={listSettings[beingSelected].label}
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
              borderWidth: 1,
              marginTop: 6,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "2%",
            }}
          >
            <TextInput
              onChangeText={handleOldPassword}
              style={{ fontSize: 14, height: "100%", width: "100%" }}
              placeholder="Nhập mật khẩu hiện tại"
            />
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
              borderWidth: 1,
              marginTop: 6,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "2%",
            }}
          >
            <TextInput
              style={{ fontSize: 14, height: "100%", width: "100%" }}
              placeholder="Mật khẩu mới"
              onChangeText={handleNewPassword}
            />
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
              borderWidth: 1,
              marginTop: 6,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "2%",
            }}
          >
            <TextInput
              onChangeText={confirmNewPassword}
              style={{ fontSize: 14, height: "100%", width: "100%" }}
              placeholder="Xác nhận mật khẩu mới"
            />
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
        await AsyncStorage.removeItem("userStoreData");
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
        {/* {
        userDataRedux.loading && 
        (<View style={styles.modal}>
          <Loading/>
         </View>)
      } */}
      </View>
    );
  }
};

export default CustomerSettings;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    position: 'relative'
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
