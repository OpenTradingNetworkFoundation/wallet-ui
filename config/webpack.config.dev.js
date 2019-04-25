const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getClientEnvironment = require('./env');
const paths = require('./paths');

// Setup environment variables
const version = require(paths.appPackageJson).version;

const env = getClientEnvironment({ version });

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    // Available polyfills
    require.resolve('babel-polyfill'),
    // Stock HMR client
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),

    // Application entry point
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: paths.appSrc,
        exclude: [/[/\\\\]node_modules[/\\\\]/],
        use: [
          {
            loader: require.resolve('thread-loader'),
            options: {
              poolTimeout: Infinity // keep workers alive for more effective watch mode
            }
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('babel-loader')
          },
          {
            loader: require.resolve('svg-sprite-loader'),
            options: {
              runtimeGenerator: path.resolve(
                './svg-to-icon-component-runtime-generator'
              )
            }
          },
          require.resolve('svgo-loader')
        ]
      },
      {
        test: /\.styl$/,
        include: paths.appSrc,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: require.resolve('stylus-loader'),
            options: {
              import: path.resolve(paths.appSrc, 'styles/imports.styl')
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      }
    ]
  },
  resolve: {
    alias: {
      public: paths.appPublic,
      src: paths.appSrc,
      icons: path.resolve(paths.appPublic, 'assets/svg'),
      api: path.resolve(paths.appSrc, 'api'),
      hocs: path.resolve(paths.appSrc, 'hocs'),
      pages: path.resolve(paths.appSrc, 'pages'),
      props: path.resolve(paths.appSrc, 'props'),
      components: path.resolve(paths.appSrc, 'components'),
      ducks: path.resolve(paths.appSrc, 'ducks'),
      elements: path.resolve(paths.appSrc, 'elements'),
      enums: path.resolve(paths.appSrc, 'enums'),
      formatters: path.resolve(paths.appSrc, 'formatters'),
      helpers: path.resolve(paths.appSrc, 'helpers'),
      services: path.resolve(paths.appSrc, 'services'),
      styles: path.resolve(paths.appSrc, 'styles'),
      utils: path.resolve(paths.appSrc, 'utils'),
      validators: path.resolve(paths.appSrc, 'validators'),
      models: path.resolve(paths.appSrc, 'models'),
      vendor: paths.appVendorSource
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.appVendorSource,
        to: paths.appVendorBuild
      }
    ])
  ]
};
