import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Overlay} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {IconHeadphone1} from '../../Assets/Assets';
import {getHomeAction} from './redux/action';
import {DellCartAction, AddCartAction} from '../Cart/redux/action';

const Home = props => {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(0);
  const [status, setStatus] = useState(true);

  const dispatch = useDispatch();
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const HomeRes = useSelector(state => state.HomeReducer?.data[0]?._data);
  console.log(HomeRes, '<==== hasil Home');

  const CartRes = useSelector(state => state.CartReducer?.UserCart);
  console.log(CartRes, '<==== hasil CartUser');

  useEffect(() => {
    dispatch(getHomeAction());
  }, [dispatch]);

  useEffect(() => {
    if (CartRes.jumlah > 0 && status) {
      setItem(CartRes.jumlah);
    }
    if (item === 0 && status === false) {
      dispatch(DellCartAction());
      setStatus(true);
    }
  }, [status, CartRes, item]);

  console.log(item, 'ini item');
  console.log(status, 'ini status');

  const submitData = () => {
    dispatch(
      AddCartAction({
        name: HomeRes?.produk.nama,
        price: HomeRes?.produk.price,
        jumlah: item,
      }),
    );
    props.navigation.navigate('Mainapp');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.Grow}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.title}>Bagus Store</Text>
            <TouchableOpacity
              onPress={() => {
                setStatus(false), toggleOverlay();
              }}
              style={styles.title}>
              <Feather name="shopping-cart" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerisi}>
            <View style={styles.containerbox}>
              <View style={styles.HeaderBox}>
                <Text>{HomeRes?.produk.nama}</Text>
              </View>
              <View style={styles.containerimg}>
                <FastImage
                  style={styles.imageHeadphone}
                  source={IconHeadphone1}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View style={styles.fild1}>
                <Text>Price</Text>
                <Text>{`Rp. ${HomeRes?.produk.price}`}</Text>
              </View>
              <View style={styles.fild1}>
                <Text>Stock</Text>
                <Text>{`${HomeRes?.produk.stock} x`}</Text>
              </View>
              <View style={styles.fild1}>
                <Text numberOfLines={3} ellipsizeMode="tail">
                  {HomeRes?.produk.deskripsi}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Detail')}>
                <Text style={styles.seedetail}>See Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Overlay
        style={stylesOverlay.overlay}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={stylesOverlay.container}>
          <View style={stylesOverlay.conhead}>
            <Text style={stylesOverlay.header}>Cart({item ? item : 0})</Text>
            <TouchableOpacity
              onPress={() => {
                setItem(0), dispatch(DellCartAction());
              }}>
              <Text style={stylesOverlay.header}>RemoveAll</Text>
            </TouchableOpacity>
          </View>
          {item === 0 ? (
            <Text style={stylesOverlay.peringatan}>
              You don't Have any Item
            </Text>
          ) : (
            <>
              <View style={stylesOverlay.ContainerItem}>
                <View style={stylesOverlay.conImage}>
                  <FastImage
                    style={stylesOverlay.imageHeadphone2}
                    source={IconHeadphone1}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={stylesOverlay.ContainerText1}>
                  <Text>{CartRes.name}</Text>
                  <Text>{CartRes.price}</Text>
                </View>
                <View style={stylesOverlay.ContainerButton2}>
                  <View style={stylesOverlay.Button2}>
                    <TouchableOpacity
                      onPress={() =>
                        item === 0
                          ? setItem(0)
                          : status
                          ? setStatus(false)
                          : setItem(item - 1)
                      }>
                      <Text style={stylesOverlay.TextButtonCart}>-</Text>
                    </TouchableOpacity>
                    <Text style={stylesOverlay.TextButton}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setStatus(false),
                          item >= HomeRes?.produk.stock
                            ? setItem(HomeRes?.produk.stock)
                            : setItem(item + 1);
                      }}>
                      <Text style={stylesOverlay.TextButtonCart}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={stylesOverlay.ConTotal}>
                <Text>TOTAL</Text>
                <Text>{`Rp. ${CartRes.price * item}`}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    submitData(), props.navigation.navigate('Cart');
                  }}
                  style={stylesOverlay.ContainerButton}>
                  <View>
                    <Text style={stylesOverlay.TextButtonBuy}>CHECKOUT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Grow: {
    flexGrow: 1,
    paddingBottom: moderateScale(1),
  },
  container: {
    backgroundColor: 'black',
    borderBottomStartRadius: moderateScale(40),
    borderBottomEndRadius: moderateScale(40),
    height: heightPercentageToDP(91),
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(24),
    marginLeft: moderateScale(24),
  },
  title: {
    marginTop: moderateScale(24),
    fontSize: moderateScale(26),
    alignSelf: 'center',
    color: 'white',
  },
  containerisi: {
    marginTop: moderateScale(38),
    alignItems: 'center',
    margin: moderateScale(10),
  },
  containerbox: {
    height: moderateScale(330),
    width: moderateScale(300),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(24),
    backgroundColor: 'white',
  },
  HeaderBox: {
    marginLeft: moderateScale(24),
    marginTop: moderateScale(24),
    alignContent: 'flex-start',
  },
  containerimg: {
    alignSelf: 'center',
    height: moderateScale(120),
    width: widthPercentageToDP(70),
    backgroundColor: '#D9D9D9',
  },
  imageHeadphone: {
    marginTop: moderateScale(14),
    alignSelf: 'center',
    height: moderateScale(80),
    width: moderateScale(80),
  },
  fild1: {
    marginTop: moderateScale(12),
    marginRight: moderateScale(18),
    marginLeft: moderateScale(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seedetail: {
    color: 'blue',
    marginTop: moderateScale(8),
    marginLeft: moderateScale(18),
  },
});

const stylesOverlay = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    paddingStart: moderateScale(20),
    paddingEnd: moderateScale(20),
    margin: -16,
  },
  conhead: {
    marginLeft: moderateScale(8),
    marginRight: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    marginTop: moderateScale(14),
    marginBottom: moderateScale(24),
    fontSize: moderateScale(15),
    color: '#000000',
    textDecorationLine: 'underline',
  },

  inputTitle: {
    alignSelf: 'stretch',
    marginTop: moderateScale(16),
    backgroundColor: '#EBEDF4',
    borderRadius: moderateScale(19),
    fontFamily: 'Roboto-Bold',
  },
  ContainerButton: {
    backgroundColor: '#D87D4A',
    alignItems: 'center',
    borderTopStartRadius: moderateScale(5),
    borderTopEndRadius: moderateScale(5),
    borderBottomStartRadius: moderateScale(5),
    borderBottomEndRadius: moderateScale(5),
    height: heightPercentageToDP(6),
    width: widthPercentageToDP(79),
    marginTop: moderateScale(60),
    marginBottom: moderateScale(8),
  },
  TextButtonBuy: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontFamily: 'Montserrat-Bold',
    paddingTop: moderateScale(11),
  },
  ImgPin: {
    height: moderateScale(120),
    width: moderateScale(120),
  },
  ContainerItem: {
    marginLeft: moderateScale(10),
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
  Button2: {
    flexDirection: 'row',
    fontSize: moderateScale(21),
    fontFamily: 'Montserrat-Bold',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  TextButton: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: moderateScale(18),
    fontFamily: 'Montserrat-Bold',
    paddingTop: moderateScale(4),
  },
  TextButtonCart: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: moderateScale(24),
    fontFamily: 'Montserrat-Bold',
    paddingTop: moderateScale(4),
  },
  ConTotal: {
    marginTop: moderateScale(24),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  peringatan: {
    fontSize: moderateScale(24),
    color: '#EB5757',
    alignSelf: 'center',
  },
});
