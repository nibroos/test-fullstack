// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app:{
    rootId: 'test-fullstack',
    head:{
      title: 'Test Fullstack Nibros',
      meta:[
        { name: 'description', content: 'Web test full stack' }
      ],
    },
  },
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  experimental: {
    renderJsonPayloads: false
  }
})
