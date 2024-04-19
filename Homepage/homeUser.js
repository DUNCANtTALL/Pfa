import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,View,Text, ScrollView} from 'react-native';
import AppBar from './appbar';
import DropdownMenu from './dropdown';
import { Input,Icon, Button, Divider } from 'react-native-elements';
import JobDetail from './job_detail';
import BottomTabs from './bottom_tabs';

export default function HomeUser({navigation}) {
  
  return (
    <SafeAreaView style={{backgroundColor:'#F4F6FA',flex:1,marginTop:30}}>
      <StatusBar style="auto" />
       <AppBar />
       <DropdownMenu />
       
       <View style={{alignSelf:'center'}}>
        
       </View>
   
   <View style={{margin:10,backgroundColor:'white',flex:1,borderTopRightRadius:20,borderTopLeftRadius:20,marginTop:30}}>
    <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', margin:17}}>
      <Text style={{color:'grey',fontSize:18}}>Service Provider</Text>
      <Text style={{color:'#85D6B3',fontSize:17}}>See all</Text>
    </View>
    <ScrollView>
      <JobDetail />
      <JobDetail />
      <JobDetail />
    </ScrollView>
      <Divider width={1}/>
      <BottomTabs/>
   </View>
    </SafeAreaView>
  );
}
