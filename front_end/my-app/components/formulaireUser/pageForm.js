import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,View,Text, ScrollView} from 'react-native';
import AppBar from './appbar';
import { Input,Icon, Button, Divider } from 'react-native-elements';
import BottomTabs from './bottom_tabs';
import Form from './formulaire';


export default function PageForm() {
  
  return (
    <SafeAreaView style={{flex:1,marginTop:0}}>
      <StatusBar style="auto" />
      <View style={{flex:1, paddingTop:30}}>
      <ScrollView>
        <AppBar />
        <Form/>
      </ScrollView>
      <Divider width={1}/>
      <BottomTabs/>
      </View>
    </SafeAreaView>
  );
}
