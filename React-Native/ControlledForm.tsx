import React from 'react';
import {Controller} from 'react-hook-form';
import {View, TextInput} from 'react-native';
import {Texts, DropDown, BooleanDropDown} from '.';
import Styles from '../styles/styles';

type formListType = {
  type: 'TextInput' | 'DropDown' | 'BooleanDropDown';
  placeHolder: string;
  dataValue: string;
  required?: boolean;
  list?: string[];
  Booleanlist?: {key: string; value: boolean}[];
  pattern?: any;
  errorMsg?: string;
};

type ControlledFormProps = {
  control: any;
  errors: any;
  formList: formListType[];
  formState: any;
};

const ControlledForm = ({
  control,
  errors,
  formList,
  formState,
}: ControlledFormProps) => {
  return (
    <>
      {formList.map((item, index) => (
        <View key={`${item.dataValue}-${index}`}>
          {item.type === 'TextInput' ? (
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={Styles.input}
                  onBlur={onBlur}
                  onChangeText={val => onChange(val)}
                  value={value}
                  placeholder={item.placeHolder}
                />
              )}
              name={item.dataValue}
              rules={{
                required: item.required,
                pattern: item.pattern || undefined,
              }}
              defaultValue={
                formState && formState[item.dataValue]
                  ? '' + formState[item.dataValue]
                  : null
              }
            />
          ) : item.type === 'DropDown' ? (
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <DropDown
                  title={item.placeHolder}
                  list={item.list}
                  handler={onChange}
                  selectedValue={formState ? formState[item.dataValue] : null}
                />
              )}
              name={item.dataValue}
              rules={{required: item.required}}
              defaultValue={formState ? formState[item.dataValue] : null}
            />
          ) : item.type === 'BooleanDropDown' ? (
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <BooleanDropDown
                  title={item.placeHolder}
                  Booleanlist={item.Booleanlist}
                  handler={onChange}
                  selectedValue={formState ? formState[item.dataValue] : null}
                />
              )}
              name={item.dataValue}
              rules={{required: item.required}}
              defaultValue={formState ? formState[item.dataValue] : null}
            />
          ) : (
            <> </>
          )}
          {errors[item.dataValue] && (
            <Texts type="Error" content={item.errorMsg || 'Required'} />
          )}
        </View>
      ))}
    </>
  );
};

export default ControlledForm;
