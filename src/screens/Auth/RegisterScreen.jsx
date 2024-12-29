import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomToast from '../../components/Toast';
import {useToast} from '../../contexts/ToastContext';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation=useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {toastVisible, toastConfig, showToast} = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async () => {
    const {name, email, password, confirmPassword} = form;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      showToast('error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('error', 'Invalid email address');
      return;
    }
    if (password.length < 6) {
      showToast('error', 'Password must be  6 characters');
      return;
    }

    try {
      setIsLoading(true);
      const {data} = await axios.post(
        'https://hackathon-backened-production.up.railway.app/users/register',
        form,
      );
      setForm(null)
      showToast('success', 'Account created successfully');
    } catch (err) {
      showToast('error', err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcon name="chevron-back" size={24} color="#222" />
            </TouchableOpacity>

            <Text style={styles.title}>Let's Get Started!</Text>

            <Text style={styles.subtitle}>
              Fill in the fields below to get started with your new account.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={name => setForm({...form, name})}
                placeholder="John Doe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.name}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email Address</Text>
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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={confirmPassword =>
                  setForm({...form, confirmPassword})
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword}
              />
            </View>

            <Button onPress={handleSubmit} loading={isLoading} mode='elevated' dark={true} style={styles.btnText}>
              Register
            </Button>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{textDecorationLine: 'underline'}}>Sign in</Text>
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
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    marginTop: 40,
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  /** Form */
  form: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    // width: '100%',
    marginTop: 4,
  },
  formFooter: {
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
  
  btnText: {
    paddingVertical: 6,
    marginTop: 15,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    color: '#fff',
  },
});
