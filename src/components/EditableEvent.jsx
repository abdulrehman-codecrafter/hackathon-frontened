import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet'; // Import RBSheet
import { formatDate } from '../utils/formatDate';

const EventCard = ({ event }) => {
  const navigation = useNavigation();
  const refRBSheet = useRef(); // Reference to RBSheet

  // Handle edit button press
  const handleEdit = () => {
    navigation.navigate('UpdateEvent', { event }); // Navigate to EditEvent screen
    refRBSheet.current.close(); // Close the bottom sheet
  };

  // Handle delete button press
  const handleDelete = () => {
    // Implement your delete functionality here (e.g., call API or remove event from state)
    console.log('Deleting event:', event);
    refRBSheet.current.close(); // Close the bottom sheet after delete
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => refRBSheet.current.open()}>
        {/* Image Section */}
        <Image source={{ uri: event.image }} style={styles.eventImage} />

        {/* Event Details Section */}
        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.locationSection}>
            <Icon name="map-marker" size={19} color="gray" style={{ marginTop: 1 }} />
            <Text style={styles.eventLocation}>
              {event.address.city + ' , ' + event.address.country}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet
        ref={refRBSheet} // Bind the reference to RBSheet
        height={200} // Height of the bottom sheet
        openDuration={250} // Duration for opening the sheet
        closeDuration={250} // Duration for closing the sheet
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}
      >
        <View style={styles.sheetContent}>
          {/* Edit Button */}
          <TouchableOpacity style={styles.sheetButton} onPress={handleEdit}>
            <Text style={styles.sheetButtonText}>Edit</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity style={styles.sheetButton} onPress={handleDelete}>
            <Text style={styles.sheetButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
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
  sheetContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sheetButton: {
    backgroundColor: '#5669FF',
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  sheetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventCard;
