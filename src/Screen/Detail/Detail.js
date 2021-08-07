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
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {AddCartAction} from '../Cart/redux/action';
import {useSelector, useDispatch} from 'react-redux';
import {IconHeadphone1} from '../../Assets/Assets';

const Detail = props => {
  const [item, setItem] = useState(0);
  const dispatch = useDispatch();

  const DetailRes = useSelector(state => state.HomeReducer?.data[0]?._data);
  console.log(DetailRes, '<==== hasil Detail');

  useEffect(() => {
    if (item) {
      return;
    }
  }, [item]);

  const submitData = () => {
    dispatch(
      AddCartAction({
        name: DetailRes?.produk.nama,
        price: DetailRes?.produk.price,
        jumlah: item,
      }),
    );
    props.navigation.navigate('Mainapp');
  };

  console.log(item, 'ini items kuy');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.Grow}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Details</Text>
          </View>
        </View>
        <View style={styles.Goback}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={{fontSize: moderateScale(14)}}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerisi}>
          <View style={styles.conImage}>
            <FastImage
              style={styles.imageHeadphone}
              source={IconHeadphone1}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.TitleItem}>{DetailRes?.produk.nama}</Text>
          <Text style={styles.TitleItem2}>Headphones</Text>
          <Text style={styles.IsiText}>{DetailRes?.produk.deskripsi}</Text>
          <Text
            style={
              styles.PriceText
            }>{`Stock : ${DetailRes?.produk.stock}`}</Text>
          <Text
            style={styles.PriceText}>{`Rp. ${DetailRes?.produk.price}`}</Text>
        </View>
        <View style={styles.conButt}>
          <View style={styles.ContainerButton2}>
            <View style={styles.Button2}>
              <TouchableOpacity
                onPress={() => (item === 0 ? setItem(0) : setItem(item - 1))}>
                <Text style={styles.TextButtonCart}>-</Text>
              </TouchableOpacity>
              <Text style={styles.TextButton}>{item}</Text>
              <TouchableOpacity
                onPress={() =>
                  item >= DetailRes?.produk.stock
                    ? setItem(DetailRes?.produk.stock)
                    : setItem(item + 1)
                }>
                <Text style={styles.TextButtonCart}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => submitData()}
            style={styles.ContainerButton}>
            <View style={styles.Button}>
              <Text style={styles.TextButton}>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

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
    marginTop: moderateScale(38),
    alignItems: 'center',
    margin: moderateScale(10),
  },
  Goback: {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(24),
  },
  conImage: {
    height: moderateScale(250),
    width: moderateScale(280),
    backgroundColor: '#D9D9D9',
  },
  imageHeadphone: {
    alignSelf: 'center',
    marginTop: moderateScale(40),
    height: moderateScale(180),
    width: moderateScale(180),
  },
  TitleItem: {
    marginTop: moderateScale(28),
    marginLeft: moderateScale(14),
    alignSelf: 'flex-start',
    fontSize: moderateScale(28),
  },
  TitleItem2: {
    marginTop: moderateScale(2),
    marginLeft: moderateScale(14),
    fontSize: moderateScale(28),
    alignSelf: 'flex-start',
  },
  IsiText: {
    color: '#808080',
    marginTop: moderateScale(2),
    marginLeft: moderateScale(14),
    fontSize: moderateScale(15),
    alignSelf: 'flex-start',
  },
  PriceText: {
    color: '#000000',
    marginTop: moderateScale(13),
    marginLeft: moderateScale(14),
    fontSize: moderateScale(15),
    alignSelf: 'flex-start',
  },
  conButt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ContainerButton: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(3),
    backgroundColor: '#D87D4A',
    borderRadius: moderateScale(6),
    height: moderateScale(42),
    elevation: moderateScale(3),
    width: wp(46),
  },
  ContainerButton2: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(3),
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(6),
    height: moderateScale(42),
    elevation: moderateScale(3),
    width: wp(46),
  },
  Button: {
    fontSize: moderateScale(21),
    paddingTop: moderateScale(5),
    fontFamily: 'Montserrat-Bold',
  },
  Button2: {
    justifyContent: 'space-around',
    flexDirection: 'row',
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
  TextButtonCart: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: moderateScale(24),
    fontFamily: 'Montserrat-Bold',
    paddingTop: moderateScale(4),
  },
});
