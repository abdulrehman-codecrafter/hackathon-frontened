import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomToast = ({visible, onDismiss, message, type = 'info'}) => {
  // Define colors and icons for different types
  const typeConfig = {
    info: {color: '#2196F3', icon: 'information'},
    success: {color: '#4CAF50', icon: 'check-circle'},
    warning: {color: '#FFC107', icon: 'alert-circle'},
    error: {color: '#F44336', icon: 'close-circle'},
  };

  const {color, icon} = typeConfig[type] || typeConfig.info;

  return (
    <Portal>
      {visible && (
        <View style={[styles.toastContainer, {backgroundColor: color}]}>
          <View style={styles.toastContent}>
            <MaterialCommunityIcons name={icon} size={24} color="#FFF" />
            <Text style={styles.toastText}>{message}</Text>
          </View>
        </View>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    zIndex: 99999999,
    top: 30,
    alignSelf: 'center',
    padding: 16,
    borderRadius: 12,
    width: '80%',
    height: 55,
  },
  toastContent: {
    flexDirection: 'row',
  },
  toastText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
    marginStart: 10,
  },
});

export default CustomToast;
