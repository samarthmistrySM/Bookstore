import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  loginWithGoogle,
  registerUser,
} from '../../redux/slices/authSlice.ts';
import {AppDispatch, RootState} from '../../redux/store.ts';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');

  const {loading} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    console.log('login');
    dispatch(await loginUser({email: email.toLowerCase(), password}));
  };

  const handleRegister = async () => {
    dispatch(
      await registerUser({
        email: email.toLowerCase(),
        password,
        phoneNumber: parseInt(phoneNumber, 10),
        fullName,
      }),
    );
  };

  const handleGoogleLogin = async () => {
    dispatch(await loginWithGoogle());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.title}>Online Book Shopping</Text>
          <View style={styles.imageContainer}>
            <View style={styles.innerImageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/login.png')}
              />
            </View>
          </View>
          <View style={styles.authToggleContainer}>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text
                style={[styles.authToggleText, isLogin && styles.activeText]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text
                style={[styles.authToggleText, !isLogin && styles.activeText]}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} onChangeText={setFullName} />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.passwordOptionsContainer}>
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text style={styles.passwordOptionsText}>Show password</Text>
            </TouchableOpacity>
            {isLogin && (
              <TouchableOpacity>
                <Text style={styles.passwordOptionsText}>Forgot password?</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            disabled={loading}
            style={[styles.authButton, loading && {backgroundColor: '#A03037'}]}
            onPress={() => (isLogin ? handleLogin() : handleRegister())}>
            <Text style={styles.authButtonText}>
              {isLogin ? 'Login' : 'Signup'}
            </Text>
          </TouchableOpacity>

          {isLogin && (
            <>
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]} onPress={()=>handleGoogleLogin()}>
                  <Text style={[styles.btnText, {color: '#333'}]}>Google</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  upperContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#a5dcff',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerImageContainer: {
    position: 'absolute',
    width: 160,
    height: 160,
    backgroundColor: '#4b7bff',
    borderRadius: 100,
    right: 10,
  },
  image: {
    position: 'absolute',
    width: 170,
    height: 170,
    resizeMode: 'contain',
    right: 10,
  },
  authToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 100,
    marginBottom: 20,
  },
  authToggleText: {
    fontSize: 18,
    color: '#666',
  },
  activeText: {
    color: '#A03037',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#A03037',
    paddingBottom: 2,
  },
  contentContainer: {
    width: '90%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A03037',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  passwordOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  passwordOptionsText: {
    fontSize: 14,
    color: '#A03037',
  },
  authButton: {
    backgroundColor: '#da424b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  authButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: '#777',
  },
  orText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  facebookBtn: {
    backgroundColor: '#1877F2',
  },
  googleBtn: {
    backgroundColor: '#ddd',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Login;
