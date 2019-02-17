const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  modify(config, env) {
    const { target, dev } = env
    const isDev = dev
    const isProd = !isDev
    const isServer = target === 'server'
    const isClient = target === 'web'

    const cssModulesLoader = {
      // on the server we do not need to embed the css and just want the identifier mappings
      // https://github.com/webpack-contrib/css-loader#scope
      loader: isServer ? require.resolve('css-loader/locals') : require.resolve('css-loader'),
      options: {
        modules: true,
        importLoaders: 1,
        ...(isClient && isProd ? { minimize: true } : {}),
        localIdentName: isDev ? '[local]--[hash:base64:5]' : '[hash:base64:5]',
      },
    }

    config.module.rules.push({
      test: /\.module\.scss$/,
      use: isServer
        ? [
            cssModulesLoader,
            require.resolve('iso-morphic-style-loader'),
            ,
            require.resolve('sass-loader'),
          ]
        : isDev
        ? [
            require.resolve('iso-morphic-style-loader'),
            cssModulesLoader,
            require.resolve('sass-loader'),
          ]
        : [MiniCssExtractPlugin.loader, cssModulesLoader, require.resolve('sass-loader')],
    })

    // for some reason the mini-css-extract-plugin breaks unless we remove it and add it again
    config.plugins = config.plugins.filter(plugin => !(plugin instanceof MiniCssExtractPlugin))

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/bundle.[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        // allChunks: true because we want all css to be included in the main
        // css bundle when doing code splitting to avoid FOUC:
        // https://github.com/facebook/create-react-app/issues/2415
        allChunks: true,
      }),
    )

    return config
  },
}
