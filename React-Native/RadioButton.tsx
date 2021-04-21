import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from './../styles/theme';

type radioProps = {
  radioData: Array<{tag: string; value: string}>;
  operator: (param: string) => void;
};

const RadioButton = ({radioData, operator}: radioProps) => {
  const [newValue, setNewValue] = useState('');
  return (
    <View>
      {radioData.map(data => {
        return (
          <TouchableOpacity
            onPress={() => {
              setNewValue(data.value);
              operator(data.value);
            }}>
            <View key={data.value} style={styles.container}>
              <Text style={styles.radioText}>{data.tag}</Text>
              <View style={(newValue === data.value) ? styles.selected : styles.radio} />
            </View>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.testText}>{newValue}</Text>
    </View>
  );
};
export default RadioButton;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    marginHorizontal: wp('4%'),
    borderBottomColor: colors.Darker,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: RFValue(10, hp('100%')),
    paddingBottom: RFValue(10, hp('100%')),
  },
  radioText: {
    color: colors.Darker,
    fontSize: RFValue(25, hp('100%')),
    fontWeight: '600',
  },
  radio: {
    width: RFValue(25, hp('100%')),
    height: RFValue(25, hp('100%')),
    borderColor: colors.Darker,
    borderRadius: 50,
    borderWidth: 2,
  },
  selected: {
    width: RFValue(25, hp('100%')),
    height: RFValue(25, hp('100%')),
    borderRadius: 50,
    backgroundColor: colors.deepGreen,
  },
  testText: {
    alignSelf: 'center',
    fontSize: 15,
  },
});
