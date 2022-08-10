/**
 * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
const CIPluginOpt = {
  // 微信小程序
  weapp: {
    // 微信小程序 appid
    appid: "wx7649feb4bef6eb7f",
    // 密钥文件相对项目根目录的相对路径，例如 key/private.appid.key
    privateKeyPath: "key/private.wx7649feb4bef6eb7f.key"
  },
}

const createVantPatterns = (componentName) => {
  const fileTypes = ['wxml', 'wxs', 'wxss'];
  return fileTypes.map((item) => {
    return {
      from: `src/components/vant-weapp/dist/${componentName}/index.${item}`,
      to: `dist/components/vant-weapp/dist/${componentName}/index.${item}`,
    };
  });
};

const config = {
  projectName: 'taro-vue3-pinia',
  date: '2022-8-10',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['taro-plugin-pinia',["@tarojs/plugin-mini-ci", CIPluginOpt]],
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/components/vant-weapp/dist/wxs', to: 'dist/components/vant-weapp/dist/wxs' },
      { from: 'src/components/vant-weapp/dist/common/style', to: 'dist/components/vant-weapp/dist/common/style' },
      { from: 'src/components/vant-weapp/dist/common/index.wxss', to: 'dist/components/vant-weapp/dist/common/index.wxss' },
      { from: 'src/components/vant-weapp/dist/calendar/index.wxs', to: 'dist/components/vant-weapp/dist/calendar/index.wxs' },
      { from: 'src/components/vant-weapp/dist/calendar/utils.wxs', to: 'dist/components/vant-weapp/dist/calendar/utils.wxs' },
      { from: 'src/components/vant-weapp/dist/calendar/calendar.wxml', to: 'dist/components/vant-weapp/dist/calendar/calendar.wxml' },
      { from: 'src/components/vant-weapp/dist/calendar/components/month/index.wxs', to: 'dist/components/vant-weapp/dist/calendar/components/month/index.wxs' },
      ...createVantPatterns('icon'),
      ...createVantPatterns('loading'),
      ...createVantPatterns('button'),
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    webpackChain (chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
