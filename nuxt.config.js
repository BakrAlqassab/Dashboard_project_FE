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
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:5000/api',
  },
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@babel/preset-env'),
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
