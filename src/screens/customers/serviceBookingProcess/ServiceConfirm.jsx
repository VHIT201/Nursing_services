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
  Button,
  useWindowDimensions
} from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getListServices, getListSubServices, getListSubServicesByIDService } from "../../../redux/slices/servicesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header/Header";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import themes from "../../../../themes";
import NumberPlease from 'react-native-number-please';
import { getRelativeUser,editRelativeUser,getRelativeUserData,deleteRelativeUser } from '../../../redux/slices/relativeSlice'
import RelativeItem from "../../../components/ListRelative/ItemRelative";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceConfirm = () => {
  return (
    <View>
      <Text>ServiceConfirm</Text>
    </View>
  )
}

export default ServiceConfirm

const styles = StyleSheet.create({})