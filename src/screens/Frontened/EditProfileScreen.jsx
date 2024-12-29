import React, {useContext, useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Avatar, Button, IconButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {useAuth} from '../../contexts/AuthContext';
import {useToast} from '../../contexts/ToastContext';
import CustomToast from '../../components/Toast';
import GoBackBtn from '../../components/GoBackBtn';

export default function SettingsPage() {
  const {user, dispatch} = useAuth();
  const {toastVisible, toastConfig, showToast} = useToast();

  const [state, setState] = useState({
    name: user.name,
    bio: user.bio,
    phone: user.phone,
    profilePic: user.profilePic,
    tempProfilePic: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setState({...state, [name]: value});
  };

  const pickImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (res && res[0]) {
        const {uri, type, name} = res[0];
        setState({
          ...state,
          tempProfilePic: {uri, type, name},
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled image picker');
      } else {
        console.error('Document Picker Error:', err);
      }
    }
  };

  const uploadCloudinary = async () => {
    if (!state.tempProfilePic) return null;

    const imageToUpload = state.tempProfilePic;

    try {
      const data = new FormData();
      data.append('file', {
        uri: imageToUpload.uri,
        type: imageToUpload.type,
        name: imageToUpload.name,
      });
      data.append('upload_preset', 'socialApp');
      data.append('cloud_name', 'deni18m0m');
      data.append('folder', 'socialApp');

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/deni18m0m/image/upload',
        data,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );

      return res.data.secure_url;
    } catch (err) {
      console.error('Image upload error:', err.response?.data || err.message);
    }
  };

  const handleSave = async () => {
    if (state.name === '' || state.bio === '' || state.phone === '') {
      return showToast('error', "Fields can't be empty");
    }
    setLoading(true);
    try {
      const profilePicUrl = await uploadCloudinary();
      const updatedData = {
        name: state.name,
        bio: state.bio,
        phone: state.phone,
        profilePic: profilePicUrl || state.profilePic,
      };
      const res = await axios.put(
        'https://hackathon-backened-production.up.railway.app/users/updateProfile',
        updatedData,
      );

      showToast('success', 'Profile updated successfully');
      console.log('Updated user:', res.data.data);
      dispatch({type: 'UPDATE_USER', payload: res.data.data});
    } catch (err) {
      showToast('error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.stickyHeaderContainer}>
        <GoBackBtn />
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 13,
            marginLeft: 110,
          }}>
          Edit Profile
        </Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          
          <View style={styles.profileSection}>
            <Avatar.Image
              size={130}
              source={{
                uri: state.tempProfilePic?.uri || state.profilePic,
              }}
              style={{marginBottom: 10}}
            />
            <IconButton
              icon="camera"
              size={30}
              iconColor="#2e64e5"
              onPress={pickImage}
              style={styles.cameraIcon}
            />
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold',marginTop:-40,textAlign:'center', marginBottom: 20}}>
            User Profile
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={state.name}
              onChangeText={value => handleChange('name', value)}
              style={styles.input}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              value={state.bio}
              onChangeText={value => handleChange('bio', value)}
              style={styles.input}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              value={state.phone}
              onChangeText={value => handleChange('phone', value)}
              style={styles.input}
              placeholder="Enter your phone number"
            />
          </View>

          <Button
            mode="elevated"
            onPress={handleSave}
            dark={true}
            loading={loading}
            // disabled={!isModified || loading} // Disable if not modified
            style={styles.saveButton}>
            Save Changes
          </Button>

          <CustomToast
            visible={toastVisible}
            onDismiss={() => {}}
            type={toastConfig.type}
            message={toastConfig.message}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  stickyHeaderContainer: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 7,
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    flex: 1,
    paddingTop:100,
    padding: 20,
    backgroundColor: 'white',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  cameraIcon: {
    left: 40,
    bottom: 60,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F6FA',
    padding: 12,
    paddingVertical: 17,
    borderRadius: 8,
    marginBottom: 0,
    color: 'black',
  },
  saveButton: {
    marginVertical: 20,
    // backgroundColor: '#2e64e5',
    // borderRadius: 10,
  },
});
