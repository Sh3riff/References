import React from 'react';
import {View} from 'react-native';
import Styles from '../styles/styles';
import {Picker} from '@react-native-picker/picker';

type DropDownProps = {
  title: string;
  list?: string[];
  Booleanlist?: {key: string; value: boolean}[];
  handler: (value: string) => void;
  selectedValue: string;
};

const DropDown = ({title, list, handler, selectedValue}: DropDownProps) => {
  return (
    <View style={Styles.dropdownInput}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(value: string) => handler(value)}>
        <Picker.Item label={title} value="" />
        {list.map(item => (
          <Picker.Item label={item} value={item} key={item} />
        ))}
      </Picker>
    </View>
  );
};
export const BooleanDropDown = ({
  title,
  Booleanlist,
  handler,
  selectedValue,
}: DropDownProps) => {
  return (
    <View style={Styles.dropdownInput}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(value: string) => handler(value)}>
        <Picker.Item label={title} value="" />
        {Booleanlist.map(item => (
          <Picker.Item label={item.key} value={item.value} key={item.key} />
        ))}
      </Picker>
    </View>
  );
};

export default DropDown;
