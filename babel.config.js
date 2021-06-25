module.exports = function (api) {
  api.cache(false)

  const presets = [
    [
      "@babel/preset-env", {
        modules: false,
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
  const plugins = [
    "@babel/plugin-external-helpers",
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]

  return {
    sourceType: "unambiguous",
    presets,
    plugins
  }
}
