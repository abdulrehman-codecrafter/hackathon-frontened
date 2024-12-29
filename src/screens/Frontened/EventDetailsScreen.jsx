import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const EventDetailsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <Image
        source={{ uri: 'https://example.com/concert-image.jpg' }} // Replace with your image URL
        style={styles.headerImage}
      />

      {/* Event Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>International Band Music Concert</Text>

        {/* Date and Time */}
        <View style={styles.rowContainer}>
          <Image source={require('../../assets/Date.png')} style={{ width: 60, height: 60,marginEnd:8 }} />
          <View style={{}}>
          <Text style={styles.rowText}>14 December, 2021</Text>
          <Text style={styles.subText}>Tuesday, 4:00 PM - 9:00 PM</Text>
          </View>
        </View>

        {/* Location */}

        <View style={styles.rowContainer}>
          <Image source={require('../../assets/Location.png')} style={{ width: 60, height: 60,marginEnd:8 }} />
          <View>
            <Text style={styles.rowText}>Gala Convention Center</Text>
            <Text style={styles.subText}>36 Guild Street London, UK</Text>
          </View>
        </View>


        {/* Organizer */}
        <View style={styles.rowContainer}>
          <Image
            source={require('../../assets/user.jpeg')} // Replace with organizer's image URL
            style={styles.organizerImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowText}>Ashfak Sayem</Text>
            <Text style={styles.subText}>Organizer</Text>
          </View>
        
        </View>

        {/* About Event */}
        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.aboutText}>
          Enjoy your favorite dish and a lovely time with your friends and family. Food from local food trucks will be available for purchase.
          Enjoy your favorite dish and a lovely time with your friends and family. Food from local food trucks will be available for purchase.
        </Text>

        {/* Buy Ticket Button */}
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Join Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  eventTitle: {
    color:'#120D26',
    fontSize: 30,
    fontWeight: 400,
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rowText: {
    marginLeft: 8,
    marginTop: -13,
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 8,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
  organizerImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 8,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  buyButton: {

    backgroundColor: '#3D56F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 10,
    marginTop: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 17,
    letterSpacing: 0.7,
    fontWeight: 500,
  },
});

export default EventDetailsScreen;
