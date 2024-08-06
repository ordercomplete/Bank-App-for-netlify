module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:
          /node_modules\/(?!(react-native-web|@expo|expo|@unimodules)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["react-native-web"],
          },
        },
      },
      // ...
    ],
  },
};
