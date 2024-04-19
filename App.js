import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import AppBar from './components/HomeProvider/appbar';
import { Input, Icon, Button, Divider } from 'react-native-elements';
import JobDetail from './components/HomeProvider/job_detail';
import BottomTabs from './components/HomeProvider/bottom_tabs';
import Home from './components/HomeProvider/home';
import HomeUser from './components/Homepage/homeUser';
import PageForm from './components/formulaireUser/pageForm';
import WelcomeScreen from './components/Login&SignUp/WelcomeScreen';
import SignUpScreen from './components/Login&SignUp/SignUpScreen';
import RoleSelectionScreen from './components/Login&SignUp/RoleSelectionScreen';
import LoginScreen from './components/Login&SignUp/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form from './components/formulaireUser/formulaire';
import ProfilePage from './components/Profile/ProfilePage';

const Stack = createNativeStackNavigator();
 
export default function App() {

  
  return (
  
    <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">

                <Stack.Screen 
                    name="Welcome" 
                    component={WelcomeScreen} 
                    options={{ headerShown: false }} />
                <Stack.Screen 
                    name="RoleSelection" 
                    component={RoleSelectionScreen} 
                    options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUpScreen} 
                    options={{ headerShown: false }} />
                    <Stack.Screen 
                    name="homeUser" 
                    component={Home} 
                    options={{ headerShown: false }} />
                    <Stack.Screen 
                    name="form" 
                    component={PageForm} 
                    options={{ headerShown: false }} />
                    <Stack.Screen 
                    name="Profile" 
                    component={ProfilePage} 
                    options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>

  );
}
