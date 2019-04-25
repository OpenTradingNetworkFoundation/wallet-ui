const path = require('path');

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = {
  plugins: [
    // your custom plugins
  ],
  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public'),
      api: path.resolve(__dirname, '../src/api'),
      hocs: path.resolve(__dirname, '../src/hocs'),
      pages: path.resolve(__dirname, '../src/pages'),
      props: path.resolve(__dirname, '../src/props'),
      components: path.resolve(__dirname, '../src/components'),
      ducks: path.resolve(__dirname, '../src/ducks'),
      elements: path.resolve(__dirname, '../src/elements'),
      enums: path.resolve(__dirname, '../src/enums'),
      formatters: path.resolve(__dirname, '../src/formatters'),
      helpers: path.resolve(__dirname, '../src/helpers'),
      services: path.resolve(__dirname, '../src/services'),
      styles: path.resolve(__dirname, '../src/styles'),
      utils: path.resolve(__dirname, '../src/utils'),
      validators: path.resolve(__dirname, '../src/validators'),
      icons: path.resolve(__dirname, '../public/assets/svg'),
      src: path.resolve(__dirname, '../src'),
      models: path.resolve(__dirname, '../src/models'),
      vendor: path.resolve(__dirname, '../vendor'),
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'svg-sprite-loader',
            options: {
              runtimeGenerator: path.resolve(
                './svg-to-icon-component-runtime-generator'
              )
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.styl$/,
        include: APP_DIR,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: path.resolve(__dirname, '../src/styles/imports.styl')
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
