// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const util = require('node:util');
// const nodeExternals = require('webpack-node-externals');
// const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const additionalPlugins = [];

module.exports = function (options, webpack) {
  // console.log('[webpack.next.config called]');
  // console.log(util.inspect(options, { depth: null, colors: true }));

  if (process.env.NODE_ENV === 'development') {
    additionalPlugins.push(new webpack.HotModuleReplacementPlugin());
    // additionalPlugins.push(
    //   new RunScriptWebpackPlugin({
    //     name: options.output.filename,
    //     autoRestart: false,
    //   }),
    // );
  }

  return {
    ...options,
    // entry: ['webpack/hot/poll?100', options.entry],
    // externals: [
    //   nodeExternals({
    //     allowlist: ['webpack/hot/poll?100'],
    //   }),
    // ],
    // mode: process.env.NODE_ENV === 'development' ? 'development' : 'prod',
    module: {
      ...options.module,
      rules: [
        {
          test: /.ts$/, // Changes for this rule, by default there was /.tsx?$/
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: 'tsconfig.build.json',
                // getCustomTransformers: getCustomTransformers,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    // resolve: ['.ts', '.js'],
    plugins: [
      // ...options.plugins,

      // new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      // new ForkTsCheckerWebpackPlugin({
      //   tslint: true
      // }),
      ...additionalPlugins,
      ...options.plugins,
    ],
  };
};
