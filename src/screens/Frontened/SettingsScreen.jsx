import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from '../../components/ActionSheet'; // Custom ActionSheet component
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const actionSheetRef = useRef();

  const [actionSheetContent, setActionSheetContent] = useState(null);

  const {user,dispatch} = useAuth();

  // Function to open the ActionSheet with dynamic content
  const openActionSheet = content => {
    setActionSheetContent(content);
    actionSheetRef.current.open();
  };

  const menuItems = [
    {
      label: 'Edit Profile',
      icon: 'user',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      label: 'Favorite',
      icon: 'heart',
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      label: 'Delivery Address',
      icon: 'map-pin',
      onPress: () => navigation.navigate('Address'),
    },
    {
      label: 'Help and Support',
      icon: 'help-circle',
      onPress: () =>
        openActionSheet(
          <ScrollView>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginTop: 10,
                marginBottom: 15,
              }}>
              Help and Support
            </Text>
            <Text style={{fontWeight: 400, fontSize: 15}}>
              Welcome to our Help & Support center! We're here to assist you
              with any questions or issues you might have. Please check out the
              sections below for common questions or feel free to reach out to
              us directly for more personalized assistance.
            </Text>
            <Text style={{fontWeight: 500, fontSize: 17, marginVertical: 10}}>
              FAQs (Frequently Asked Questions)
            </Text>
            <Text style={{fontWeight: 500, fontSize: 16}}>
              1. How can i create account{'\n'}
            </Text>
            <Text style={{fontWeight: 400, fontSize: 15}}>
              To create an account, simply click on the "Sign Up" button at the
              top of the page. Fill in your personal details, create a secure
              password, and confirm your email address. Once completed, you'll
              have full access to our platform!
            </Text>
            <Text style={{fontWeight: 500, fontSize: 16,marginVertical:2}}>
              2. How do I contact customer support?
            </Text>

            <Text style={{fontWeight: 400, fontSize: 15}}>
              You can reach our customer support team by clicking on the
              "Contact Us" button at the bottom of this page. You can also reach
              us by email at support@example.com, or by calling our toll-free
              number at 1-800-123-4567.   
            </Text>

            <Text style={{fontWeight: 500, fontSize: 17, marginVertical: 10}}>
            Getting Started Guide
            </Text>
            <Text style={{fontWeight: 400, fontSize: 16,marginVertical:7}}>
            Step 1: Create an
            account or log in to your existing account.
            </Text>
            <Text style={{fontWeight: 400, fontSize: 16,marginVertical:7}}>
            Step 2: Explore our
              features and services.
            </Text>

            <Button 
            mode="contained"
            style={{marginTop: 20}}
            onPress={() => alert('Contact Us')}>
            Contact Us
            </Button>
          </ScrollView>,
        ),
    },
    {
      label: 'Log Out',
      icon: 'log-out',
      onPress: async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'LOGOUT'}); 
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri:
                user?.profilePic ||
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {user?.name || 'Daniel Martinez'}
          </Text>
          <Text style={styles.profileBio}>{user?.bio || 'Bio'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuLabelWrapper}>
                <FeatherIcon
                  name={item.icon}
                  size={20}
                  color="#4A4A4A"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Action Sheet */}
      <ActionSheet ref={actionSheetRef} content={actionSheetContent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 12,
  },
  profileBio: {
    fontSize: 14,
    color: '#6C6C6C',
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#4A4A4A',
  },
});
