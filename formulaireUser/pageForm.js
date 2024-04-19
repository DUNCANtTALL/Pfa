import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,View,Text, ScrollView} from 'react-native';
import AppBar from './appbar';
import { Input,Icon, Button, Divider } from 'react-native-elements';
import BottomTabs from './bottom_tabs';
import Form from './formulaire';


export default function PageForm() {
  
  return (
    <SafeAreaView style={{backgroundColor:'#F4F6FA',flex:1,marginTop:30}}>
      <StatusBar style="auto" />
       <AppBar />
       
       <View style={{alignSelf:'center'}}>
        
       </View>
   
   <View style={{margin:10,backgroundColor:'white',flex:1,borderTopRightRadius:20,borderTopLeftRadius:20,marginTop:30}}>
    <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', margin:17}}>
     
    </View>
    <ScrollView>
      <Form/>
    </ScrollView>
      <Divider width={1}/>
      <BottomTabs/>
   </View>
    </SafeAreaView>
  );
}
