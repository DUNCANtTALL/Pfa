
import { Divider } from 'react-native-elements';
import {View,Text, TouchableOpacity,Image} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import { Badge } from 'react-native-elements';


export default function JobDetail(){
    return (
        <View style={{borderWidth:1,borderColor:'#CACACA',margin:12,borderRadius:10}}>
        <View style={{flexDirection:'row',padding:10}}>
            <Image source={require('../assets/painter.jpg')} style={{width:50,height:50,borderRadius:7}}/>
          <View>
            <Text style={{paddingHorizontal:10,fontSize:18,fontWeight:'bold'}}>Service</Text>
            <View style={{paddingLeft:200}}>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                     <Ionicons name='star' color='#F99A0E' size={20} />
                  <View style={{width:5}}/>
                <Text>4.89</Text>
             </View>
             </View>
            <View style={{flexDirection:'row', justifyContent:'space-around',paddingVertical:7,}}>
              <Text>Nom Prenom</Text>
              <Text>ville</Text>
            </View>
          </View>
        </View>
          <Divider width={1} color='#CACACA'/>
        
          
          <View>
            <Text style={{padding:5}}></Text>
            <TouchableOpacity style={{backgroundColor:'#529A69',paddingHorizontal:10,paddingVertical:7,borderRadius:4}}>
              <Text style={{color:'white'}}>Accepter</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}