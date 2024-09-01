export default {
  ssr: false,
  head: {
    title: 'dashboard_project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  router: {
    middleware: 'auth',
  },
  css: ['vuetify/dist/vuetify.min.css'], 
  plugins: ['~/plugins/apexcharts.ts', '~/plugins/vuetify.ts', '~/plugins/axios.ts', '~/plugins/init-store.ts'], 
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  env: {
    BASE_URL: process.env.BASE_URL
  },
  modules: ['@nuxtjs/axios'],
  build: {  
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              targets: isServer ? { node: 'current' } : { browsers: ['last 2 versions'] }, 
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ];
      },
    },
  },
};
