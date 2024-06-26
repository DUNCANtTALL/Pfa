
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import { Badge } from 'react-native-elements';

export default function AppBar(){
    return (
          <View style={styles.appbar}>
            {/* Greetings and name */}
            <View>
             
            </View>
            {/* ratings and notification */}
       <View style={{
                flexDirection:'row', 
                alignItems:'center',
                paddingHorizontal:10,
                }}>    
         </View>
      <View>
          
           <Badge status="error" value={3} containerStyle={{ position: 'absolute', top: -4, right: -4, }} />
      </View>
            </View>
      );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;
const styles = StyleSheet.create({
    appbar:{
      width: isDesktop ? '40%' : "95%",
      alignItems: 'center',
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10,
      paddingTop:10
    },
    rating:{
      backgroundColor: 'white', 
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      paddingHorizontal:20,
      paddingVertical:10,
      margin:7
      },
  });