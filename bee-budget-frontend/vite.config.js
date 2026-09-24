import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

const baseUrl = 'http://192.168.0.99:20001' // 后端接口
// const baseUrl = 'http://192.168.0.88:10003' // 后端接口

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    // base: VITE_APP_ENV === 'production' ? '/' : '/',
    base: '/frontend/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // 打包配置
    build: {
      // https://vite.dev/config/build-options.html
      sourcemap: command === 'build' ? false : 'inline',
      outDir: 'dist',
      assetsDir: 'assets',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    // vite 相关配置
    server: {
      // port: 80,
      port: 20002,
      host: true,
      open: true,
      // 关键配置：启用轮询以兼容 Docker/WSL/NFS
      watch: {
        usePolling: true,
        interval: 1000, // 1秒轮询一次，可根据性能调整
      },
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        // '/dev-api': {
        '/frontend/dev-api': {
          target: baseUrl + '/api',
          changeOrigin: true,
          secure: false, // 允许自签名/无效HTTPS证书
          // rewrite: (p) => p.replace(/^\/dev-api/, '')
          rewrite: (p) => p.replace(/^\/frontend\/dev-api/, '')
        },
        '/frontend/uploads': {
          target: baseUrl + '/uploads',
          changeOrigin: true,
          secure: false, // 允许自签名/无效HTTPS证书
          rewrite: (p) => p.replace(/^\/frontend\/uploads/, '')
        },
      }
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  }
})
