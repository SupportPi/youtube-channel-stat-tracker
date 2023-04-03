// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css', 'vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify'],
    },
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    app: {
        baseURL: '/stats/' // Base Url to Host the Web App Behind
    },
    modules: [],
      
})
