import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {formatDate} from '../../utils/formatDate';
import axios from 'axios';
import {useToast} from '../../contexts/ToastContext';
import CustomToast from '../../components/Toast';
import { Button } from 'react-native-paper';

const EventDetailsScreen = ({route}) => {
  const {toastVisible, toastConfig, showToast} = useToast();
  const [isLoading,setIsLoading]=useState(false)
  const {event} = route.params;

  const handleJoinEvents = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://hackathon-backened-production.up.railway.app/events/participate/${event._id}`
      );
      showToast('success', data.message);
    } catch (err) {
      console.error(err); // Log the error for debugging
      showToast('error', err.response.data.message);
      console.log(err);
    }
    finally{
      setIsLoading(false)
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <Image
        source={{uri: event.image}} // Replace with your image URL
        style={styles.headerImage}
      />

      {/* Event Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>

        {/* Date and Time */}
        <View style={styles.rowContainer}>
          <Image
            source={require('../../assets/Date.png')}
            style={{width: 60, height: 60, marginEnd: 8}}
          />
          <View style={{}}>
            <Text style={styles.rowText}>
              {formatDate(event.date, 'detailed')}
            </Text>
            <Text style={styles.subText}>
              {formatDate(event.date, 'day')}, 4:00 PM - 9:00 PM
            </Text>
          </View>
        </View>

        {/* Location */}

        <View style={styles.rowContainer}>
          <Image
            source={require('../../assets/Location.png')}
            style={{width: 60, height: 60, marginEnd: 8}}
          />
          <View>
            <Text style={styles.rowText}>{event.address.venue}</Text>
            <Text style={styles.subText}>
              {event.address.city + ' , ' + event.address.country}
            </Text>
          </View>
        </View>

        {/* Organizer */}
        <View style={styles.rowContainer}>
          <Image
            source={{uri: event.createdBy.profilePic}} // Replace with organizer's image URL
            style={styles.organizerImage}
          />
          <View style={{flex: 1}}>
            <Text style={styles.rowText}>{event.createdBy.name}</Text>
            <Text style={styles.subText}>Organizer</Text>
          </View>
        </View>

        {/* About Event */}
        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.aboutText}>{event.description}</Text>

        {/* Buy Ticket Button */}
        {/* <TouchableOpacity style={styles.buyButton} > */}
          <Button
          style={styles.buyButton}
            dark={true}
            loading={isLoading}
            mode="contained"
            onPress={handleJoinEvents}
            >
            Join Event
            </Button>
          {/* <Text style={styles.buyButtonText}>Join Event</Text> */}
        {/* </TouchableOpacity> */}
      </View>
      <CustomToast
        visible={toastVisible}
        onDismiss={() => {}}
        type={toastConfig.type}
        message={toastConfig.message}
      />
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
    height: 250,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  eventTitle: {
    color: '#120D26',
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
