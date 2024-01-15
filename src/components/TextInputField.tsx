import React from 'react';
import {TextInput, View, Text} from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: () => void;
  validation: any;
};

const TextInputField = ({label, value, onChangeText, validation}: Props) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}>
      <Text
        style={{
          color: 'purple',
        }}>
        {label}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'violet',
          borderRadius: 10,
          marginTop: 5,
          padding: 5,
          paddingHorizontal: 10,
          color: 'red',
        }}
        value={value}
        onEndEditing={onChangeText}
        onBlur={() => validation(value)}
      />
    </View>
  );
};

export default TextInputField;
