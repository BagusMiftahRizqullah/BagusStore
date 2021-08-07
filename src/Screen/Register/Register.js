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
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import {IconHeadphone1} from '../../Assets/Assets';

const Register = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const senddata = () => {
    const data = {
      email: email,
      password: password,
      username: username,
    };
    firestore()
      .collection('auth')
      .add(data)
      .then(() => {
        console.log('User added!');
      });
  };

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
                <Text style={styles.text2}>Already have account? </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text style={styles.text3}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={styles.textContainer1}
              placeholder="Username"
              placeholderTextColor="#999999"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={styles.textContainer2}
              placeholder="Email"
              placeholderTextColor="#999999"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.textContainer2}
              placeholder="Password"
              placeholderTextColor="#999999"
              secureTextEntry
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => senddata()}
              style={styles.ContainerButton}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Register</Text>
              </View>
            </TouchableOpacity>
            <View>
              <FastImage
                style={styles.iconsosmed}
                source={IconHeadphone1}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  containerScroll: {
    paddingBottom: moderateScale(100),
    backgroundColor: '#101010',
  },

  topContainer: {
    paddingLeft: wp(5),
    marginTop: hp(20),
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
  textContainer3: {
    width: wp(90),
    height: hp(6),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    top: moderateScale(50),
    borderWidth: 1,
    borderColor: '#999999',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(15),
    color: 'black',
  },
  textContainer4: {
    width: wp(90),
    height: hp(6),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    top: moderateScale(65),
    borderWidth: 1,
    borderColor: '#999999',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(15),
    color: 'black',
  },
  ContainerButton: {
    alignSelf: 'center',
    marginTop: moderateScale(28),
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
});
