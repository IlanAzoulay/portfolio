export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ilan Azoulay | Engineer, Artist',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      // DEFAULT STUFF
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      // OG Image: Thumbnail
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/OG_image.png'
      },
      // SEO
      {
        hid: 'description',
        name: 'description',
        content: 'Freelance developper, specialized in algorithms, full stack, software and 3D'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Ilan, Azoulay, Ingénieur, logiciel, software, front-end, frontend, front end, développeur, developper, engineer, 3D, Nuxt, JS, Vue, Nuxtjs, Vuejs, animation, freelance, blockchain, backend, back-end, back end, UI, unity'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~plugins/sweet-modal', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
    // { src: '~plugins/sweet-modal', ssr: false }
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
