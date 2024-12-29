import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '../../contexts/AuthContext';
import {useToast} from '../../contexts/ToastContext';
import CustomToast from '../../components/Toast';

export default function LoginScreen({navigation}) {
  const {toastVisible, toastConfig, showToast} = useToast();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const {dispatch} = useAuth();
  const handleLogin = async () => {
    const {email, password} = form;

    // Basic validation
    if (!email) {
      showToast('error', 'Email is required');
      return;
    }

    if (!password) {
      showToast('error', 'Password is required');
      return;
    }

    try {
      setIsLoading(true);
      const {data} = await axios.post(
        'https://hackathon-backened-production.up.railway.app/users/login',
        form,
      );

      
      const token = data.data.token;
      
      axios.defaults.headers.common['Authorization'] = token;

      await AsyncStorage.setItem('token', token)

      dispatch({type:'SET_USER',payload:data.data.user}); 
      showToast('success', 'Login successful');

    } catch (err) {
      showToast('error', err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#e8ecf4',
          paddingHorizontal: 20,
          paddingTop: 90,
        }}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../../assets/logo.png')} style={styles.headerImg} />
             


          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({...form, email})}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({...form, password})}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <Button
              onPress={handleLogin}
              loading={isLoading}
              mode="elevated"
              dark={true}
              style={styles.btnText}>
              Login
            </Button>

            {/* <TouchableOpacity
              onPress={() => {
                Alert.alert('Reset Password', 'Password reset link sent!');
              }}
            >
              <Text style={styles.formLink}>Forgot password?</Text>
            </TouchableOpacity> */}
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
        <CustomToast
          visible={toastVisible}
          onDismiss={() => {}}
          type={toastConfig.type}
          message={toastConfig.message}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles remain unchanged
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  headerImg: {
    width: 155,
    height: 110,
    alignSelf: 'center',
    // marginBottom: 30,
  },
  /** Form */
  form: {
    marginBottom: 0,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    // marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    paddingTop: 0,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */

  btnText: {
    paddingVertical: 6,
    marginTop: 6,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    color: '#fff',
  },
});
