import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { IconButton } from 'react-native-paper'

export default function GoBackBtn() {
  const navigation = useNavigation()
  return (
    <IconButton
      icon="arrow-left"
      iconColor="black"
      containerColor="#D9D9D9"
      size={25}
      onPress={() => navigation.goBack()}
    />
  )
}