import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const EventInputScreen = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    address: {
      venue: '',
      city: '',
      country: '',
    },
    image: null,
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddressChange = (key, value) => {
    setForm({ ...form, address: { ...form.address, [key]: value } });
  };

  const handleImagePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setForm({ ...form, image: result[0] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  const handleCreateEvent = () => {
    console.log('Event Created:', form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Event</Text>

      <Text style={styles.label}>Event Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event title"
        placeholderTextColor="grey"
        value={form.title}
        onChangeText={(text) => handleInputChange('title', text)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event description"
        placeholderTextColor="grey"
        value={form.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event date"
        placeholderTextColor="grey"
        value={form.date}
        onChangeText={(text) => handleInputChange('date', text)}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event category"
        placeholderTextColor="grey"
        value={form.category}
        onChangeText={(text) => handleInputChange('category', text)}
      />

      <Text style={styles.label}>Address</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '50%', marginRight: 10}}>
          <Text style={styles.subLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor="grey"
            value={form.address.city}
            onChangeText={(text) => handleAddressChange('city', text)}
          />
        </View>

        <View style={{width: '50%'}}>
          <Text style={styles.subLabel}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            placeholderTextColor="grey"
            value={form.address.country}
            onChangeText={(text) => handleAddressChange('country', text)}
          />
        </View>
      </View>

      <Text style={styles.subLabel}>Venue</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter venue"
        placeholderTextColor="grey"
        value={form.address.venue}
        onChangeText={(text) => handleAddressChange('venue', text)}
      />

      <Text style={styles.label}>Event Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>
      {form.image && (
        <Image
          source={{ uri: form.image.uri }}
          style={styles.imagePreview}
        />
      )}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  subLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#F5F6FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    color: 'black',
  },
  imagePicker: {
    backgroundColor: '#9775FA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventInputScreen;
