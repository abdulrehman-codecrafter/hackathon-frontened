import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';
import CustomToast from '../../components/Toast';
import { useEventsContext } from '../../contexts/EventContexts';

const EventInputScreen = () => {

  const {dispatch} = useEventsContext();
  const {toastVisible, toastConfig, showToast} = useToast();
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    visibility: 'public', // Default to public visibility
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddressChange = (key, value) => {
    setForm({ ...form, address: { ...form.address, [key]: value } });
  };

  const handleDateSelect = (selectedDate) => {
    setShowDatePicker(false);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setForm({ ...form, date: formattedDate });
  };

  const uploadImageToCloudinary = async (uri) => {
    const data = new FormData();
    data.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    data.append('upload_preset', 'socialApp');
    data.append('cloud_name', 'deni18m0m');
    data.append('folder', 'socialApp');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/deni18m0m/image/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setForm({ ...form, image: { uri: result[0].uri } });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  const handleCreateEvent = async () => {
    if (!form.title || !form.description || !form.date || !form.category || 
        !form.address.venue || !form.address.city || !form.address.country) {
      showToast('error', 'All fields are required');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = form.image?.uri;
      if (form.image) {
        imageUrl = await uploadImageToCloudinary(form.image.uri);
        if (!imageUrl) {
          showToast('error', 'Failed to upload image');
          return;
        }
      }

      const response = await axios.post(
        'https://hackathon-backened-production.up.railway.app/events/create', 
        {
          title: form.title,
          description: form.description,
          date: form.date,
          category: form.category,
          address: form.address,
          image: imageUrl,
          visibility: form.visibility, // Include visibility
        }
      );

      showToast('success', 'Event created successfully');
      // console.log('Event created:', response.data.data);
      dispatch({ type: 'ADD_EVENT', payload: response.data.data });
      setForm({
        title: '',
        description: '',
        date: '',
        category: '',
        address: { venue: '', city: '', country: '' },
        image: null,
        visibility: 'public', // Reset visibility to default
      });

    } catch (error) {
      showToast('error', 'Failed to create event');
      console.error('Failed to create event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Event</Text>

      <Text style={styles.label}>Event Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event title"
        value={form.title}
        onChangeText={(text) => handleInputChange('title', text)}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter event description"
        value={form.description}
        onChangeText={(text) => handleInputChange('description', text)}
        multiline
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity 
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{color: form.date ? '#000' : '#888'}}>{form.date || 'Select date'}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={showDatePicker}
        date={form.date ? new Date(form.date) : new Date()}
        mode="date"
        onConfirm={handleDateSelect}
        onCancel={() => setShowDatePicker(false)}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event category"
        value={form.category}
        onChangeText={(text) => handleInputChange('category', text)}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Address</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.subLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={form.address.city}
            onChangeText={(text) => handleAddressChange('city', text)}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.subLabel}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            value={form.address.country}
            onChangeText={(text) => handleAddressChange('country', text)}
            placeholderTextColor="#888"
          />
        </View>
      </View>

      <Text style={styles.subLabel}>Venue</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter venue"
        value={form.address.venue}
        onChangeText={(text) => handleAddressChange('venue', text)}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Event Visibility</Text>
      <View style={styles.visibilityContainer}>
        <TouchableOpacity
          style={[styles.visibilityButton, form.visibility === 'public' && styles.selectedVisibility]}
          onPress={() => handleInputChange('visibility', 'public')}
        >
          <Text style={styles.visibilityButtonText}>Public</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.visibilityButton, form.visibility === 'private' && styles.selectedVisibility]}
          onPress={() => handleInputChange('visibility', 'private')}
        >
          <Text style={styles.visibilityButtonText}>Private</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Event Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>

      {form.image && (
        <Image source={{ uri: form.image.uri }} style={styles.imagePreview} />
      )}

      <TouchableOpacity 
        style={[styles.createButton, loading && styles.disabledButton]} 
        onPress={handleCreateEvent} 
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? 'Creating...' : 'Create Event'}
        </Text>
      </TouchableOpacity>

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
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    width: '48%',
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
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#A8A8A8',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  visibilityContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  visibilityButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    width: '48%',
  },
  selectedVisibility: {
    backgroundColor: '#34C759',
  },
  visibilityButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default EventInputScreen;
