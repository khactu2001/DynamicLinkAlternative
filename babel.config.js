module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      // "@babel/plugin-proposal-class-properties",
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '^~(.+)': './src/\\1',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
