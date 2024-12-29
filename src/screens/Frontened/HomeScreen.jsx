
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Avatar, IconButton, Button} from 'react-native-paper';
import {dummyEvents} from '../../data/dummyEvents';
import EventCard from '../../components/Event';

export default function HomeScreen({navigation}) {

  
  const renderNonStickyHeader = () => (
    <View>
      {/* Welcome Section */}
      <View style={styles.welcome}>
        <Text style={styles.title}>EventHub</Text>
        <Text style={styles.subtitle}>Welcome to EventHub</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="grey"
          cursorColor="black"
        />
        <IconButton
          icon="magnify"
          iconColor="white"
          size={25}
          style={styles.searchButton}
          onPress={() => console.log('Search pressed')}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
      
        <Button
          mode="contained"
          onPress={() => navigation.navigate('UpcomingEvents')}
          style={styles.upcomingButton}
          labelStyle={styles.buttonLabel}
        >
          Upcoming
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PastEvents')}
          style={styles.pastButton}
          labelStyle={styles.buttonLabel}
        >
          Past Events
        </Button>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>New Arrival</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <EventCard event={item} />}
        ListHeaderComponent={renderNonStickyHeader}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  welcome: {
    marginBottom: 20,
  },
  title: {
    letterSpacing: 0.3,
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
  },
  subtitle: {
    color: 'grey',
    fontSize: 16,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#F5F6FA',
    paddingStart: 20,
    borderRadius: 10,
    color: 'black',
    width: '85%',
    height: 50,
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: '#9775FA',
    marginTop: 0,
    borderRadius: 10,
    height: 50,
    width: 50,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  upcomingButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#4CAF50',
  },
  pastButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#FF5722',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 17,
    paddingStart: 5,
    marginBottom: 10,
  },
});
