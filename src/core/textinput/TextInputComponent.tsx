import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

const TextInputComponent: React.FC = (props: TextInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <TextInput
      // placeholder="Enter your name"
      // keyboardType="default"
      // focusable={}
      style={[styles.container, isFocus ? styles.focusing : {}]}
      onFocus={() => setIsFocus(true)}
      onBlur={() => {
        setIsFocus(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  focusing: {
    borderColor: 'black',
  },
});

export default TextInputComponent;
