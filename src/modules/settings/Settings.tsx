import {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {icons} from '~assets/icons';
import SwitchComponent from '~sharedComponents/SwitchComponent';
import codePush from 'react-native-code-push';
const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

type SectionOption = {
  label: string;
  type: 'switch' | 'text' | 'icon';
  value: string | boolean | ImageSourcePropType;
  onPress: () => void;
};
type SectionProps = {
  label: string;
  options: SectionOption[];
};

const SettingsScreen = () => {
  const sections: SectionProps[] = [
    {
      label: 'Option 1',
      options: [
        {
          label: 'Theme',
          type: 'switch',
          value: 'Option 1',
          onPress: () => {},
        },
        {
          label: 'Version',
          type: 'text',
          value: 'Option 2',
          onPress: () => {},
        },
        {
          label: 'Check for updates',
          type: 'icon',
          value: icons.ic_next,
          onPress: () => {},
        },
      ],
    },
  ];

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = (isEnabled: boolean) => setIsEnabled(isEnabled);

  const renderRight = (option: SectionOption) => {
    switch (option.type) {
      case 'switch':
        return (
          <SwitchComponent value={isEnabled} onValueChange={toggleSwitch} />
        );
      case 'icon':
        return <Image source={option.value} style={styles.ic_forward} />;
      case 'text':
        return <Text style={styles.title}>{option.label}</Text>;
      default:
        return null;
    }
  };

  const renderRow = (option: SectionOption, index: number) => {
    return (
      <TouchableOpacity onPress={option.onPress} key={option.label}>
        <View
          style={[
            styles.block_row,
            {
              borderTopWidth: 1,
              borderTopColor: index === 0 ? 'transparent' : '#F5F5F5',
            },
          ]}>
          <Text style={styles.title}>{option.label}</Text>
          {renderRight(option)}
        </View>
      </TouchableOpacity>
    );
  };

  const onButtonPress = () => {
    codePush.getCurrentPackage().then(update => {
      // If the current app "session" represents the first time
      // this update has run, and it had a description provided
      // with it upon release, let's show it to the end user
      // if (update.isFirstRun && update.description) {
      // Display a "what's new?" modal
      console.log('getCurrentPackage: ', update);
      // }
    });
    codePush.sync({
      updateDialog: true,
      // updateDialog: {
      //   title: 'Updated',
      // },
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        {sections.map(section => (
          <View style={styles.block} key={section.label}>
            {section.options.map(renderRow)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  block: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 16,
  },
  block_row: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  ic_forward: {
    width: 24,
    height: 24,
    tintColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default codePush(codePushOptions)(SettingsScreen);
