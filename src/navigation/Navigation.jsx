import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import 'react-native-gesture-handler';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login from '../screens/accounts/Login';
import Register from '../screens/accounts/Register';
import Waitview from '../screens/waitviews/Waitview';
import ChooseRole from '../screens/accounts/ChooseRole';
import SelectServices from '../screens/accounts/Nurse/SelectServices';
import SelectServicesDetail from '../screens/accounts/Nurse/SelectServicesDetail';
import ReceiveCode from '../screens/accounts/ReceiveCode';
import ChangePasswordForgot from '../screens/accounts/ChangePasswordForgot';
//import Nurses View
import NursesCalendar from '../screens/nurses/NursesCalendar';
import NursesHome from '../screens/nurses/NursesHome';
import NursesNotification from '../screens/nurses/NursesNotification';
import NursesReport from '../screens/nurses/NursesReport';
import NursesSettings from '../screens/nurses/NursesSettings';
import NursesStatistic from '../screens/nurses/NursesStatistic';
import NursesWallet from '../screens/nurses/NursesWallet';
import JobsReceived from '../screens/nurses/JobsReceived';

//import Customer View
import CustomerCalendar from '../screens/customers/CustomerCalendar';
import CustomerHome from '../screens/customers/CustomerHome';
import CustomerNotification from '../screens/customers/CustomerNotification';
import CustomerServices from '../screens/customers/CustomerServices';
import CustomerSettings from '../screens/customers/CustomerSettings';
import CustomerStatistic from '../screens/customers/CustomerStatistic';
import RelativeInfomation from '../screens/customers/RelativeInfomation';
import CustomerChooseSerVice from '../screens/customers/CustomerChooseSerVice';
import RegisterAsANurse from '../screens/customers/RegisterAsANurse';
import CustomerProfile from '../screens/customers/CustomerProfile';
import ServiceForm from '../screens/customers/serviceBookingProcess/ServiceForm';
import ServiceConfirm from '../screens/customers/serviceBookingProcess/ServiceConfirm';
//import redux
import { store } from '../redux/Store';
import themes from '../../themes';
import { Provider } from 'react-redux';

// import test 
import Test from '../screens/Test';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {

    const NursingDrawerNavigation = ()=>{
        return(
            
                <Drawer.Navigator
                initialRouteName='NursesHome' 
                screenOptions={{
                    drawerStyle: {
                    backgroundColor: 'white',
                    },
                    headerShown: false,
                    drawerActiveTintColor:themes.green,
                    drawerLabelStyle:{
                        
                        
                    }
                }}
                
                >
                <Drawer.Screen
                    name='NursesHome'
                    component={NursesHome}
                    options={{
                    drawerLabel: 'Trang chủ',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name='home' size={size} color={color} />
                    ),
                    }}
                />
                <Drawer.Screen
                    name='NursesCalendar'
                    component={NursesCalendar}
                    options={{
                    drawerLabel: 'Lịch của tôi',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name='calendar' size={size} color={color} />
                    ),
                    }}
                />
                <Drawer.Screen
                    name='NursesReport'
                    component={NursesReport}
                    options={{
                    drawerLabel: 'Báo cáo',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name='file-text' size={size} color={color} />
                    ),
                    }}
                />
                <Drawer.Screen
                    name='NursesNotification'
                    component={NursesNotification}
                    options={{
                    drawerLabel: 'Thông báo',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name='bell' size={size} color={color} />
                    ),
                    }}
                />
                <Drawer.Screen
                    name='NursesStatistic'
                    component={NursesStatistic}
                    options={{
                    drawerLabel: 'Thống kê',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name='pie-chart' size={size} color={color} />
                    ),
                    }}
                />
                <Drawer.Screen
                    name='NursesWallet'
                    component={NursesWallet}
                    options={{
                    drawerLabel: 'Ví',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='wallet' size={size} color={color} />
                    ),
                    }}
                />
                <Drawer.Screen
                    name='NursesSettings'
                    component={NursesSettings}
                    options={{
                    drawerLabel: 'Cài đặt',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='settings' size={size} color={color} />
                    ),
                    }}
                />
            </Drawer.Navigator>
        )
    }

    const CustomerDrawerNavigation = () =>{
        return (
            <Drawer.Navigator
  initialRouteName='CustomerHome' 
  screenOptions={{
    drawerStyle: {
      backgroundColor: 'white',
    },
    headerShown: false,
    drawerActiveTintColor: themes.green,
    drawerLabelStyle: {
      textAlign: 'left',
    },
  }}
>
  <Drawer.Screen
    name='CustomerHome'
    component={CustomerHome}
    options={{
      drawerLabel: 'Trang chủ',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='home-outline' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='CustomerCalendar'
    component={CustomerCalendar}
    options={{
      drawerLabel: 'Lịch hẹn',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='calendar-outline' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='RelativeInfomation'
    component={RelativeInfomation}
    options={{
      drawerLabel: 'Thông tin người thân',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='person-outline' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='CustomerServices'
    component={CustomerServices}
    options={{
      drawerLabel: 'Dịch vụ',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='briefcase-outline' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='CustomerStatistic'
    component={CustomerStatistic}
    options={{
      drawerLabel: 'Thống kê',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='bar-chart-outline' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='CustomerNotification'
    component={CustomerNotification}
    options={{
      drawerLabel: 'Thông báo',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='notifications-outline' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='RegisterAsANurse'
    component={RegisterAsANurse}
    options={{
      drawerLabel: 'Đăng ký điều dưỡng',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='briefcase-sharp' size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name='CustomerSettings'
    component={CustomerSettings}
    options={{
      drawerLabel: 'Cài đặt',
      drawerIcon: ({ color, size }) => (
        <Ionicons name='settings-outline' size={size} color={color} />
      ),
    }}
  />
</Drawer.Navigator>
        )
    }

    

  return (
    <Provider store={store}>
    <NavigationContainer>
       
        <Stack.Navigator initialRouteName='Waitview'>
            <Stack.Screen options={{title: 'Waitview Title', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="Waitview" component={Waitview} />
            <Stack.Screen options={{title: 'Login', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="Login" component={Login} />
            <Stack.Screen options={{title: 'Register', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="Register" component={Register} />
            <Stack.Screen options={{title: 'ChooseRole', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="ChooseRole" component={ChooseRole} />
            <Stack.Screen options={{title: 'SelectServices', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="SelectServices" component={SelectServices} />
            <Stack.Screen options={{title: 'SelectServicesDetail', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="SelectServicesDetail" component={SelectServicesDetail} />
            <Stack.Screen options={{title: 'JobsReceived', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="JobsReceived" component={JobsReceived} />
            <Stack.Screen options={{title: 'ReceiveCode', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="ReceiveCode" component={ReceiveCode} />
            <Stack.Screen options={{title: 'ChangePasswordForgot', headerStyle: {backgroundColor: 'green', },headerShown: false, }} name="ChangePasswordForgot" component={ChangePasswordForgot} />
            <Stack.Screen options={{headerShown:false}} name="NursingDrawerNavigation" component={NursingDrawerNavigation} />
            <Stack.Screen options={{headerShown:false}} name="CustomerDrawerNavigation" component={CustomerDrawerNavigation} />
            <Stack.Screen options={{headerShown:false}} name='CustomerChooseSerVice' component={CustomerChooseSerVice}/>
            <Stack.Screen options={{headerShown:false}} name='CustomerProfile' component={CustomerProfile}/>
            <Stack.Screen options={{headerShown:false}} name='ServiceForm' component={ServiceForm}/>
            <Stack.Screen options={{headerShown:false}} name='ServiceConfirm' component={ServiceConfirm}/>
            {/* <Stack.Screen options={{headerShown:false}} name='Test' component={Test}/> */}
       
        </Stack.Navigator>
    </NavigationContainer> 
    </Provider>
  )
}

export default Navigation

const styles = StyleSheet.create({
  // 
})