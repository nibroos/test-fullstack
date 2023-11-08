<template>
  <NuxtLoadingIndicator />
  <div v-if="!layout">
    <StartAppLoadingComponent />
  </div>
  <NuxtLayout v-else :name="layout">
    <ContainerComponent>
      <NuxtPage></NuxtPage>
    </ContainerComponent>
  </NuxtLayout>
</template>

<script setup>

const userProfile = useUserProfile()
const bearerToken = useToken()
const { getUser } = useAuth()
const layout = ref('')
onMounted(() => {
  if (process.client) {
    let token = {}
    token = localStorage.getItem('token')
    if (!!token) {
      token = localStorage.getItem('token')
      bearerToken.value = JSON.parse(token)
    } else {
      token = ''
    }

    if (bearerToken.value !== '' && bearerToken.value !== null) {
      if (userProfile.value.name === '') {
        getUser(bearerToken.value)
      }
      return layout.value = 'authenticated'
    } else {
      navigateTo('/login')
      return layout.value = 'guest'
    }
  }
})

watch(bearerToken, (current) => {
  if (!!current) {
    layout.value = 'authenticated'
  } else {
    layout.value = 'guest'
  }
})

useHead({
  script: [{
    children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.setAttribute("data-theme", "dark")
        document.documentElement.style.backgroundColor = "rgb(24 24 27)";
    } else {
      document.documentElement.removeAttribute("data-theme")
        document.documentElement.style.backgroundColor = "rgb(243 244 246)";
    }`}],
  htmlAttrs: {
    lang: 'en',
  }
})

</script>
