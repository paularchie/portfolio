// this config is for Cypress unit testing
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties'
            // we want to instrument unit tests on the fly so we usually insert this plugin
            // 'babel-plugin-istanbul',
            // but cypress-react-unit-test inserts this plugin automatically
            // if the code coverage is enabled, so we don't have to worry
          ]
        }
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
