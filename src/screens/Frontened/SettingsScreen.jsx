// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import BottomDrawer from '../../components/BottomDrawer'; // Ensure you have BottomDrawer imported
// import { useAuth } from '../../contexts/AuthContext';

// export default function ProfileScreen({ navigation }) {
//   const [isDrawerVisible, setIsDrawerVisible] = useState(false);
//   const [drawerContent, setDrawerContent] = useState(''); // State to hold content for the drawer
//   const {user}=useAuth()

//   // Menu items for the profile screen
//   const menuItems = [
//     {
//       label: 'Edit Profile',
//       icon: 'user',
//       onPress: () => navigation.navigate('EditProfile'), // Direct navigation action
//     },
//     {
//       label: 'Favorite',
//       icon: 'heart',
//       onPress: () => alert('Navigate to Favorites'), // Direct action
//     },
//     {
//       label: 'Delivery Address',
//       icon: 'map-pin',
//       onPress: () => alert('Navigate to Delivery Address'), // Direct action
//     },
//     {
//       label: 'Phone Number',
//       icon: 'phone',
//       onPress: () => alert('Navigate to Phone Number'), // Direct action
//     },
//     {
//       label: 'Abouts',
//       icon: 'info',
//       onPress: () => {
//         setDrawerContent(<>
//           <Text style={styles.aboutTitle}>About the App</Text>
//           <Text style={styles.aboutDescription}>
//             Welcome to our app! This is the place where you can manage your profile, track orders, and discover new features that make your life easier.
//           </Text>
//           <Text style={styles.aboutDescription}>
//             Version: 1.0.0
//           </Text>
//           <Text style={styles.aboutDescription}>
//             Our goal is to provide a seamless and enjoyable experience for all users. We strive to offer the best customer service and continuously improve our app.
//           </Text>
          
//         </>);
//         setIsDrawerVisible(true); // Open BottomDrawer
//       }, // Open BottomDrawer
//     },
//     {
//       label: 'Help and Support',
//       icon: 'help-circle',
//       onPress: () => alert('Navigate to Help and Support'), // Direct action
//     },
//     {
//       label: 'Terms and Conditions',
//       icon: 'file-text',
//       onPress: () => alert('Navigate to Terms and Conditions'), // Direct action
//     },
//     {
//       label: 'Log Out',
//       icon: 'log-out',
//       onPress: () => alert('Log Out action'), // Direct action
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Profile Header */}
//         <View style={styles.profileHeader}>
//           <Image
//             source={{
//               uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
//             }}
//             style={styles.profileImage}
//           />
//           <TouchableOpacity style={styles.editIconWrapper}>
//             <FeatherIcon name="edit" size={16} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.profileName}>Daniel Martinez</Text>
//           <Text style={styles.profileBio}>Bio</Text>
//         </View>

//         {/* Menu Items */}
//         <View style={styles.menuSection}>
//           {menuItems.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.menuItem}
//               onPress={item.onPress} // Call onPress from menu item
//             >
//               <View style={styles.menuLabelWrapper}>
//                 <FeatherIcon
//                   name={item.icon}
//                   size={20}
//                   color="#4A4A4A"
//                   style={styles.menuIcon}
//                 />
//                 <Text style={styles.menuLabel}>{item.label}</Text>
//               </View>
//               <FeatherIcon name="chevron-right" size={20} color="#CCCCCC" />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Bottom Drawer */}
//       {
//         isDrawerVisible && (
//           <BottomDrawer
//             visible={isDrawerVisible}
//             setVisible={setIsDrawerVisible}
//             content={drawerContent} // Pass the drawer content
//           />
          
//         )
//       }
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginVertical: 24,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   editIconWrapper: {
//     position: 'absolute',
//     bottom: 63,
//     right: '37%',
//     backgroundColor: '#007BFF',
//     width: 27,
//     height: 27,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2C2C2C',
//     marginTop: 12,
//   },
//   profileBio: {
//     fontSize: 14,
//     color: '#6C6C6C',
//     marginTop: 4,
//   },
//   menuSection: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     shadowColor: '#000',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   menuLabelWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   menuIcon: {
//     marginRight: 16,
//   },
//   menuLabel: {
//     fontSize: 16,
//     color: '#4A4A4A',
//   },

//   aboutTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2C2C2C',
//     marginBottom: 10,
//   },
//   aboutDescription: {
//     fontSize: 14,
//     color: '#6C6C6C',
//     marginBottom: 10,
//     lineHeight: 22,
//   },
//   aboutLink: {
//     fontSize: 14,
//     color: '#007BFF',
//     marginBottom: 8,
//   },
// });

import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Button
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import BottomDrawer from '../../components/BottomDrawer'; // Ensure you have BottomDrawer imported
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(''); // State to hold content for the drawer
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false); // State for phone modal
  const [phoneNumber, setPhoneNumber] = useState(''); // State for the phone number
  const { user } = useAuth();

  // Menu items for the profile screen
  const menuItems = [
    {
      label: 'Edit Profile',
      icon: 'user',
      onPress: () => navigation.navigate('EditProfile'), // Direct navigation action
    },
    {
      label: 'Favorite',
      icon: 'heart',
      onPress: () => navigation.navigate('Favorites'), // Direct action to Favorites screen
    },
    {
      label: 'Delivery Address',
      icon: 'map-pin',
      onPress: () => navigation.navigate('Address'), // Direct action to Delivery Address screen
    },
    {
      label: 'Phone Number',
      icon: 'phone',
      onPress: () => setIsPhoneModalVisible(true), // Open phone number modal
    },
    {
      label: 'Abouts',
      icon: 'info',
      onPress: () => {
        setDrawerContent(
          <>
            <Text style={styles.aboutTitle}>About the App</Text>
            <Text style={styles.aboutDescription}>
              Welcome to our app! This is the place where you can manage your profile, track orders, and discover new features that make your life easier.
            </Text>
            <Text style={styles.aboutDescription}>Version: 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Our goal is to provide a seamless and enjoyable experience for all users. We strive to offer the best customer service and continuously improve our app.
            </Text>
          </>
        );
        setIsDrawerVisible(true); // Open BottomDrawer
      },
    },
    {
      label: 'Help and Support',
      icon: 'help-circle',
      onPress: () => {
        setDrawerContent(<Text>Help content here...</Text>);
        setIsDrawerVisible(true); // Open BottomDrawer
      },
    },
    {
      label: 'Terms and Conditions',
      icon: 'file-text',
      onPress: () => {
        setDrawerContent(<Text>Terms and conditions content...</Text>);
        setIsDrawerVisible(true); // Open BottomDrawer
      },
    },
    {
      label: 'Log Out',
      icon: 'log-out',
      onPress: () => {
        setDrawerContent(<Text>Logging out...</Text>);
        setIsDrawerVisible(true); // Open BottomDrawer
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
              uri: user?.profileImage || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIconWrapper}>
            <FeatherIcon name="edit" size={16} color="white" />
          </TouchableOpacity>
          <Text style={styles.profileName}>{user?.name || 'Daniel Martinez'}</Text>
          <Text style={styles.profileBio}>{user?.bio || 'Bio'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress} // Call onPress from menu item
            >
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

      {/* Phone Number Modal */}
      <Modal
        visible={isPhoneModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPhoneModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Phone Number</Text>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            <Button title="Save" onPress={() => {
              // Handle phone number save logic here
              setIsPhoneModalVisible(false);
              alert('Phone number updated!');
            }} />
            <Button title="Cancel" onPress={() => setIsPhoneModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Bottom Drawer */}
      {isDrawerVisible && (
        <BottomDrawer
          visible={isDrawerVisible}
          setVisible={setIsDrawerVisible}
          content={drawerContent} // Pass the drawer content
        />
      )}
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
  editIconWrapper: {
    position: 'absolute',
    bottom: 63,
    right: '37%',
    backgroundColor: '#007BFF',
    width: 27,
    height: 27,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowColor: '#000',
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
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#6C6C6C',
    marginBottom: 10,
    lineHeight: 22,
  },
  aboutLink: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 8,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  phoneInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 8,
  },
});
