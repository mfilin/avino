const withLess = require('next-with-less');
const path = require('path');

module.exports = withLess({
  distDir: '/.next',
  basePath: process.env.BASE_PATH,
  webpack: (config, webpack) => {
    // We can modify NEXT config here

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // generateBuildId: async () => {
  //   // This could be anything, using the latest git hash
  //   return process.env.GIT_HASH
  // },
  publicRuntimeConfig: {
    API_PREFIX: process.env.API_PREFIX,
    BASE_PATH: process.env.BASE_PATH,
    YANDEX_COUNTER_ID: process.env.YANDEX_COUNTER_ID,
  },

  // sassOptions: {
  //   includePaths: [path.resolve(__dirname, 'src/front/styles/scss',)],
  //   prependData: `@import "main.scss";`,
  // },
});
