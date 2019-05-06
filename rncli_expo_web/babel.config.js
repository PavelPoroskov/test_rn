console.log('rncli_expo_web babel.config.js')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  //cwd: ".",
 // root: ".",
//  presets: ['babel-preset-expo'],
  plugins: [
    [
      "module-resolver",
      {
        //root: [ "./App", "../quotes-hooks/App" ],
        "alias": {
          "react": "./node_modules/react",
          "react-dom": "./node_modules/react-dom",
          "react-native-web": "./node_modules/react-native-web",
          //"quotes-hooks": "../quotes-hooks",
//          "^babel(.+)": "./node_modules/babel\\1",
//          "^metro(.+)": "./node_modules/metro\\1",
//          "@babel": "./node_modules/@babel",
//          "@babel/plugin-proposal-class-properties": "./node_modules/@babel/plugin-proposal-class-properties",
        },
        //"extensions": [".ios.js", ".android.js", ".js", ".json"]
      }
    ],
//    "transform-class-properties",
//    "react-native-web",
  ],
};
