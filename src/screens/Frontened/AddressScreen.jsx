import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import GoBackBtn from '../../components/GoBackBtn';

const AddressInputScreen = () => {
  const [form, setForm] = useState({
    name: '',
    country: '',
    city: '',
    phone: '',
    address: '',
    isPrimary: false,
  });

  const handleInputChange = (key, value) => {
    setForm({...form, [key]: value});
  };

  const toggleSwitch = () => {
    setForm({...form, isPrimary: !form.isPrimary});
  };

  const handleSaveAddress = () => {
    // Add save logic here
    console.log('Saved Address:', form);
  };

  return (
    <View style={styles.container}>
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
          Address
        </Text>
      </View>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Mrh Raju"
              placeholderTextColor='grey'
              value={form.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Country</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bangladesh"
                  placeholderTextColor='grey'
                  value={form.country}
                  onChangeText={text => handleInputChange('country', text)}
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sylhet"
                  value={form.city}
                  onChangeText={text => handleInputChange('city', text)}
                />
              </View>
            </View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+880 1453-987533"
              placeholderTextColor='grey'
              value={form.phone}
              keyboardType="phone-pad"
              onChangeText={text => handleInputChange('phone', text)}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Chhatak, Sunamgonj 12/8AB"
              placeholderTextColor='grey'
              value={form.address}
              onChangeText={text => handleInputChange('address', text)}
            />
            <View style={styles.switchRow}>
              <Text style={styles.label}>Save as primary address</Text>
              <Switch
                trackColor={{false: '#ccc', true: '#34C759'}}
                thumbColor={form.isPrimary ? '#fff' : '#fff'}
                onValueChange={toggleSwitch}
                value={form.isPrimary}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveAddress}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

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
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 16,
    paddingTop:80,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F6FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    color:'black'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  saveButton: {
    backgroundColor: '#9775FA',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddressInputScreen;
