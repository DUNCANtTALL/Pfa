
import { Divider } from 'react-native-elements';
import {View,Text, TouchableOpacity,Image} from 'react-native';

export default function JobDetail(){
    return (
        <View style={{borderWidth:1,borderColor:'#CACACA',margin:12,borderRadius:10}}>
        <View style={{flexDirection:'row',padding:10}}>
            <Image source={require('../assets/img.jpeg')} style={{width:50,height:50,borderRadius:7}}/>
          <View>
            <Text style={{paddingHorizontal:10,fontSize:18,fontWeight:'bold'}}>Paindre une maison</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around',paddingVertical:7,}}>
              <Text>Nom Prenom</Text>
              <Text>ville</Text>
            </View>
          </View>
        </View>
          <Divider width={1} color='#CACACA'/>
        <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
          <View>
            <Text style={{color:'grey',padding:5}}>Categorie</Text>
            <Text style={{backgroundColor:'#FEEAE6',paddingHorizontal:12,paddingVertical:5,color:'red'}}>painture</Text>
          </View>
          <View>
            <Text style={{color:'grey',padding:5}}>prix proposé</Text>
            <Text style={{backgroundColor:'#D2F8E7',paddingHorizontal:12,paddingVertical:5,color:'green'}}>2400DH</Text>
          </View>
          
          <View>
            <Text style={{padding:5}}></Text>
            <TouchableOpacity style={{backgroundColor:'#529A69',paddingHorizontal:10,paddingVertical:7,borderRadius:4}}>
              <Text style={{color:'white'}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}