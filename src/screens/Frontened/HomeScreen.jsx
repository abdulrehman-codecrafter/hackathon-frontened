import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import BottomDrawer from '../../components/BottomDrawer';
import {useAuth} from '../../contexts/AuthContext';
import CustomToast from '../../components/Toast';
import {useToast} from '../../contexts/ToastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const {toastVisible, toastConfig, showToast} = useToast();

  const {user, dispatch} = useAuth();
  return (
    <View>
      <Text>Welcome {user?.name}</Text>

      <Button title="Show Toast" onPress={() => showToast('error', 'Danger')} />

      <Button
        title="Show Toast"
        onPress={() => showToast('success', 'Hello')}
      />
      <Button
        title="Logout"
        onPress={ async () => {
          // console.log('Logging out');
          await AsyncStorage.removeItem('token');
          dispatch({type: 'LOGOUT'});
        }}
      />

      <CustomToast
        visible={toastVisible}
        onDismiss={() => {}}
        type={toastConfig.type}
        message={toastConfig.message}
      />
    </View>
  );
}
