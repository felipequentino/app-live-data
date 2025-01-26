const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Brasilico',
    themeColor: '#003366',
    msTileColor: '#11943f',
    manifestOptions: {
      background_color: '#003366'
    },
    "icons": [
      {
        "src": "./img/icons/android-launchericon-48-48.png",
        "sizes": "48x48",
        "type": "image/png"
      },
      {
        "src": "./img/icons/android-launchericon-72-72.png",
        "sizes": "72x72",
        "type": "image/png"
      },
        {
            "src": "./img/icons/android-launchericon-96-96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "./img/icons/android-launchericon-144-144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "./img/icons/android-launchericon-192-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "./img/icons/android-launchericon-512-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    workboxOptions: {

    }
  }
})
