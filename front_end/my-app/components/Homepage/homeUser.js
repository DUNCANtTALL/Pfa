import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AppBar from './appbar';
import DropdownMenu from './dropdown';
import { Input, Icon, Button, Divider } from 'react-native-elements';
import JobDetail from './job_detail';
import BottomTabs from './bottom_tabs';

export default function HomeUser({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <AppBar />
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Service Provider</Text>
          <Text style={styles.headerLink}>See all</Text>
        </View>

        <ScrollView style={styles.pageScrollView}>
          <JobDetail />
          <JobDetail />
          <JobDetail />
          <JobDetail />
        </ScrollView>   
        <Divider width={2} />
        <BottomTabs />

      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F4F6FA',
    flex: 1,
    paddingTop: 30,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 17,
  },
  headerText: {
    color: 'grey',
    fontSize: 18,
  },
  headerLink: {
    color: '#85D6B3',
    fontSize: 17,
  },
  pageScrollView: {
    flex: 1,
  },
});
