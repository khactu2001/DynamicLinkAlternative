// In index.js of a new project
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ScreensProps} from '~navigation/types';

const HomeScreen = ({navigation, route}: ScreensProps<'HomeScreen'>) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const myObj = {
    age: 22,
  };
  function alert(this: any, ...args: any[]) {
    console.log(this.age + ' years old', ...args);
  }
  alert.call(myObj, 5, 6, 7, 8, 98, 9);
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Text style={{color: 'black'}}>{t('hello')}</Text>

      <Button
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
        title="Go to Settings"
      />
      <Button
        onPress={() => {
          i18n
            .changeLanguage(currentLanguage === 'en' ? 'hi' : 'en')
            .then(() =>
              setCurrentLanguage(currentLanguage === 'en' ? 'hi' : 'en'),
            )
            .catch(error => console.log(error));
        }}
        title={
          currentLanguage === 'en'
            ? 'Convert to Vietnamese'
            : 'Sử dụng tiếng Anh'
        }
      />
      {/* <Button
        onPress={() => {
          i18n
            .changeLanguage('en')
            .then(() => setCurrentLanguage('en'))
            .catch(error => console.log(error));
        }}
        title="Chuyển sang tiếng Anh"
      /> */}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
  },
});
