module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV === "production");

  const presets = ['module:@react-native/babel-preset'];
  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
