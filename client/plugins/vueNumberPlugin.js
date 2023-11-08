import number from '@coders-tm/vue-number-format'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(number)
})