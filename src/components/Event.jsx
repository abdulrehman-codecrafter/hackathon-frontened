import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EventCard = ({ event }) => {
  
    const navigation = useNavigation();
  return (
    
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('EventDetails', {event})}>
      {/* Image Section */}
      <Image source={{ uri: event.image }} style={styles.eventImage} />

      {/* Event Details Section */}
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.locationSection}>
          <Icon name="map-marker" size={19} color="gray" style={{marginTop:1}} />
          <Text style={styles.eventLocation}>{event.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    padding: 10,
    // alignItems: 'center',
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 17,
    
  },
  eventDetails: {
    flex: 1,
  },
  eventDate: {
    color: '#5669FF',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
  },
  eventTitle: {
    color: 'black',
    fontSize: 16.5,
    fontWeight: '600',
    marginVertical: 4,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventLocation: {
    color: 'gray',
    fontSize: 15,
    marginLeft: 5,
  },
});

export default EventCard;
