import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import 'react-native-gesture-handler';

import Login from '../screens/accounts/Login';
import Register from '../screens/accounts/Register';
import Waitview from '../screens/waitviews/Waitview';
import ChooseRole from '../screens/accounts/ChooseRole';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {

    const DrawerNavigator = ()=>{
        return(
            <Drawer.Navigator>
                
            </Drawer.Navigator>
        )
    }

    

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Waitview'>
            <Stack.Screen options={{
                title: 'Waitview Title', 
                headerStyle: {
                    backgroundColor: 'green', 
                },
                headerShown: false, 
                }} name="Waitview" component={Waitview} />
            <Stack.Screen options={{
                title: 'Login', 
                headerStyle: {
                    backgroundColor: 'green', 
                },
                headerShown: false, 
                }} name="Login" component={Login} />
            <Stack.Screen options={{
                title: 'Register', 
                headerStyle: {
                    backgroundColor: 'green', 
                },
                headerShown: false, 
                }} name="Register" component={Register} />
            <Stack.Screen options={{
                title: 'ChooseRole', 
                headerStyle: {
                    backgroundColor: 'green', 
                },
                headerShown: false, 
                }} name="ChooseRole" component={ChooseRole} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
    </NavigationContainer> 
  )
}

export default Navigation

const styles = StyleSheet.create({})