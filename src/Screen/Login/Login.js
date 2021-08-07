import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {IconHeadphone1, IconGoogle} from '../../Assets/Assets';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {loginAction} from './redux/action';

const Login = props => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.GlobalReducer.isLogged);

  GoogleSignin.configure({
    webClientId:
      '29649802817-1r6vr8rq39p1g5nt8tgum7djdi1jb5p2.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential.token, 'ini goggle');
    if (googleCredential.token) {
      props.navigation.navigate('Mainapp');
    }
    return auth().signInWithCredential(googleCredential);
  }

  const submitLogin = () => {
    dispatch(loginAction());
  };

  useEffect(() => {
    if (isLogged) {
      props.navigation.navigate('Mainapp');
    } else {
      props.navigation.navigate('Login');
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.containerScroll}>
        <KeyboardAvoidingView>
          <>
            <View style={styles.topContainer}>
              <FastImage
                style={styles.imageHeadphone}
                source={IconHeadphone1}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.text1}>Bagus Store</Text>
              <View style={styles.textLogin}>
                <Text style={styles.text2}>Don't have account? </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Register')}>
                  <Text style={styles.text3}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.textContainer1}
              placeholder="Email"
              placeholderTextColor="#999999"
            />
            <TextInput
              style={styles.textContainer1}
              placeholder="Password"
              placeholderTextColor="#999999"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.ContainerButton}
              onPress={() => submitLogin()}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Login</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.TextBatas}>OR</Text>
            <TouchableOpacity onPress={() => onGoogleButtonPress()}>
              <View style={styles.containersosmed}>
                <FastImage
                  style={styles.iconsosmed}
                  source={IconGoogle}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.TextLogGogle}>Login With Google</Text>
              </View>
            </TouchableOpacity>
          </>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerScroll: {
    paddingBottom: moderateScale(100),
    backgroundColor: '#101010',
  },

  topContainer: {
    paddingLeft: wp(5),
    marginTop: hp(14),
  },
  imageHeadphone: {
    height: moderateScale(100),
    width: moderateScale(100),
    marginBottom: moderateScale(40),
  },
  text1: {
    fontSize: moderateScale(26),
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    color: '#D87D4A',
  },
  textLogin: {
    flexDirection: 'row',
    fontSize: moderateScale(12),
    top: moderateScale(5),
  },
  text2: {
    color: '#999999',
  },
  text3: {
    textDecorationLine: 'underline',
    paddingLeft: moderateScale(5),
    color: '#D87D4A',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textContainer1: {
    color: 'white',
    width: wp(90),
    height: moderateScale(42),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    marginTop: moderateScale(35),
    borderWidth: 1,
    borderColor: '#999999',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(15),
  },
  textContainer2: {
    color: 'white',
    width: wp(90),
    height: moderateScale(42),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    marginTop: moderateScale(21),
    borderWidth: 1,
    borderColor: '#999999',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(15),
  },

  ContainerButton: {
    alignSelf: 'center',
    marginTop: moderateScale(38),
    backgroundColor: '#D87D4A',
    borderRadius: moderateScale(6),
    height: moderateScale(42),
    width: wp(90),
    elevation: moderateScale(3),
  },
  Button: {
    fontSize: moderateScale(21),
    paddingTop: moderateScale(5),
    fontFamily: 'Montserrat-Bold',
  },
  TextButton: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: moderateScale(18),
    fontFamily: 'Montserrat-Bold',
    paddingTop: moderateScale(4),
  },
  buttonForgetPassword: {
    alignSelf: 'center',
    marginTop: moderateScale(32),
    marginBottom: moderateScale(50),
  },
  textForgotPassword: {
    fontSize: moderateScale(14),
    color: '#214457',
    textDecorationLine: 'underline',
  },
  TextBatas: {
    marginTop: moderateScale(30),
    alignSelf: 'center',
    color: '#D87D4A',
  },
  containersosmed: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: moderateScale(42),
    width: wp(90),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconsosmed: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  TextLogGogle: {
    fontSize: moderateScale(18),
    color: '#000000',
  },
});
