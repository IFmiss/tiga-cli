module.exports = function (api) {
  api.cache(false);
  const presets = [
    ["@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: { version: 3, proposals: true },
      targets: {
        chrome: "58",
        ie: "11"
      }
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ];

  const plugins = [
    ["@babel/plugin-transform-runtime", {
      corejs: { version: 3, proposals: true },
      helpers: true,
      regenerator: true
    }]
  ]

  return {
    presets,
    plugins
  }
}