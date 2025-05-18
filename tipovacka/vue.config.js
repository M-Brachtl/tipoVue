const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //https: true, // Required for Codespaces since it's over HTTPS
    client: {
      webSocketURL: {
        protocol: 'wss',
        hostname: process.env.CODESPACE_NAME
          ? `${process.env.CODESPACE_NAME}-8080.githubpreview.dev`
          : 'localhost',
        port: 443,
      },
    },
  },
})