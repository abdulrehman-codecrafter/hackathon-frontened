// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Modal, Portal, Text} from 'react-native-paper';

// const BottomDrawer = ({visible, setVisible,children}) => {
//   return (
//     <Portal>
//       <Modal
//         visible={visible}
//         onDismiss={() => {
//           setVisible(false);
//         }}
//         contentContainerStyle={styles.modalContainer}>

//             <Text>Bottom Drawer</Text>
//         {/* Dynamic Content */}
//         {/* <View style={styles.contentContainer}>{children}</View> */}
//       </Modal>
//     </Portal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     zIndex: 1000,
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 25,
//     paddingVertical: 20,
//     maxHeight: '60%',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -3},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   header: {
//     alignItems: 'center', // Center the back arrow
//     marginBottom: 10,
//   },
//   backIcon: {
//     position: 'absolute',
//     left: 20, // Position the back icon on the left side with padding
//   },
//   contentContainer: {
//     flex: 1,
//     marginVertical: 10,
//   },
// });

// export default BottomDrawer;

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomDrawer = ({ visible, setVisible, children }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          {/* Drawer Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.drawerTitle}>Bottom Drawer</Text>
            {/* Dynamic Content */}
            <View style={styles.childrenContainer}>
              {children}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignItems: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 10,
  },
  childrenContainer: {
    marginTop: 10,
  },
});

export default BottomDrawer;
