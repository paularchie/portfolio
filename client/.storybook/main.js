module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.entry.push('./styles/index.ts');
    config.module.rules.push({
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    });

    return config;
  }
};
