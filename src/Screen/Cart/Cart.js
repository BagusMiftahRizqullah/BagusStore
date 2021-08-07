import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {IconHeadphone1} from '../../Assets/Assets';

const Cart = props => {
  const [item, setItem] = useState(0);

  const CartRes = useSelector(state => state.CartReducer?.UserCart);
  console.log(CartRes, '<==== halaman CartUser');

  useEffect(() => {
    if (CartRes.jumlah) {
      setItem(CartRes.jumlah);
    }
  }, [CartRes, item]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.Grow}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>My Cart</Text>
          </View>
        </View>
        {CartRes ? (
          <View style={styles.containerisi}>
            <View style={styles.ContainerItem}>
              <View style={styles.conImage}>
                <FastImage
                  style={styles.imageHeadphone2}
                  source={IconHeadphone1}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View style={styles.ContainerText1}>
                <Text>{CartRes?.name}</Text>
                <Text>{`Rp.${CartRes?.price}`}</Text>
              </View>
              <Text style={styles.jumlah}>{`${CartRes.jumlah} X`}</Text>
            </View>
            <View style={styles.ContainerFild}>
              <Text style={styles.TextFild}>TOTAL</Text>
              <Text style={styles.TextFild}>{`Rp.${
                CartRes.price * CartRes.jumlah
              }`}</Text>
            </View>
            <View style={styles.ContainerFild}>
              <Text style={styles.TextFild}>ADMIN Fee</Text>
              <Text style={styles.TextFild}>Rp. 15000</Text>
            </View>
            <View style={styles.ContainerFild}>
              <Text style={styles.TextFild}>GRAND TOTAL</Text>
              <Text style={styles.ResTotal}>{`Rp.${
                CartRes.price * CartRes.jumlah + 15000
              }`}</Text>
            </View>
            <TouchableOpacity style={styles.ContainerButton}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Continue & Pay</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.peringatan}>You don't Have any Item</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  Grow: {
    flexGrow: 1,
    paddingBottom: moderateScale(36),
  },
  container: {
    backgroundColor: 'black',
    borderBottomStartRadius: moderateScale(20),
    borderBottomEndRadius: moderateScale(20),
    height: heightPercentageToDP(13),
  },
  title: {
    marginTop: moderateScale(24),
    fontSize: moderateScale(26),
    alignSelf: 'center',
    color: 'white',
  },
  containerisi: {
    flexDirection: 'column',
  },

  Button: {
    fontSize: moderateScale(21),
    paddingTop: moderateScale(5),
  },
  Button2: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    fontSize: moderateScale(21),
    paddingTop: moderateScale(5),
  },
  TextButton: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: moderateScale(18),
    paddingTop: moderateScale(4),
  },
  TextButtonCart: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: moderateScale(24),

    paddingTop: moderateScale(4),
  },
  ContainerItem: {
    marginTop: moderateScale(50),
    marginLeft: moderateScale(46),
    flexDirection: 'row',
  },
  conImage: {
    alignItems: 'center',
    height: moderateScale(60),
    width: moderateScale(60),
    backgroundColor: '#D9D9D9',
  },
  imageHeadphone2: {
    marginTop: moderateScale(6),
    height: moderateScale(50),
    width: moderateScale(50),
  },
  ContainerText1: {
    marginLeft: moderateScale(24),
    justifyContent: 'space-around',
  },
  ContainerButton2: {
    marginLeft: moderateScale(24),
    marginTop: moderateScale(12),
    backgroundColor: '#D9D9D9',
    height: moderateScale(32),
    elevation: moderateScale(3),
    width: moderateScale(120),
  },
  ConTotal: {
    marginTop: moderateScale(24),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  jumlah: {
    marginLeft: moderateScale(100),
    fontSize: moderateScale(18),
    alignSelf: 'center',
  },
  ContainerFild: {
    marginTop: moderateScale(32),
    marginLeft: moderateScale(46),
    marginRight: moderateScale(46),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  TextFild: {
    color: '#000000',
    fontSize: moderateScale(18),
    paddingTop: moderateScale(4),
  },
  ResTotal: {
    color: '#D87D4A',
    fontSize: moderateScale(18),
    paddingTop: moderateScale(4),
  },
  ContainerButton: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(20),
    backgroundColor: '#D87D4A',
    borderRadius: moderateScale(6),
    height: moderateScale(42),
    elevation: moderateScale(3),
    width: wp(46),
  },
  peringatan: {
    marginTop: heightPercentageToDP(30),
    fontSize: moderateScale(24),
    color: '#EB5757',
    alignSelf: 'center',
  },
});
