import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext
import EditableEvent from '../../components/EditableEvent';
import { useEventsContext } from '../../contexts/EventContexts'; // Import EventContext

export default function MyEventsScreen() {
  const { user } = useAuth(); // Access the current user
  const { events } = useEventsContext(); // Access all events from the EventContext

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    // Filter events based on the userId or user-related property in the event data
    const filteredEvents = events.filter(event => event.createdBy._id === user._id); // Adjust this if the field is different
    setUserEvents(filteredEvents);
  }, [events, user]); // Re-run when events or user data changes

  // Render a non-sticky header
  const renderNonStickyHeader = () => (
    <View>
      <View style={styles.welcome}>
        <Text style={styles.title}>My Events</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {userEvents.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/noevent.png')} style={{ width: 200, height: 200 }} />
          <Text style={styles.title}>No Events Found</Text>
        </View>
      ) : (
        <FlatList
          data={userEvents} // Use the filtered user events
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <EditableEvent event={item} />}
          ListHeaderComponent={renderNonStickyHeader}
        />
      )}
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
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
