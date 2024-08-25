

  export default {
    ssr: false,
    head: {
      title: 'Your Project Title',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    css: ['vuetify/dist/vuetify.min.css'],
    plugins: ['~/plugins/axios.ts', '~/plugins/init-store.ts'],
    buildModules: [
      '@nuxt/typescript-build',
      '@nuxtjs/vuetify',
    ],
    modules: ['@nuxtjs/axios'],
    axios: {
      baseURL: 'http://localhost:5000/api',
    },
    build: {},
  };
  