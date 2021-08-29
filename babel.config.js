module.exports = function (api) {
  api.cache(false);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/preset-typescript'
  ];
  const plugins = [
    '@babel/plugin-external-helpers',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import'
  ];

  return {
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
