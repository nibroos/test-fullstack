export default function () {
  const config = useRuntimeConfig()
  const processing = ref(false)
  const validationErrors = ref({})
  const registerValidationErrors = ref({})
  const swal = inject('$swal')
  const isLoadingUser = ref(true)

  const userProfile = useUserProfile()
  const bearerToken = useToken()
  const assignToken = () => {
    if (process.client) {
      let token = {}
      token = localStorage.getItem('token')
      if (!!token) {
        bearerToken.value = JSON.parse(localStorage.getItem('token'))
      } else {
        bearerToken.value = ''
      }
    }
  }

  const loginForm = reactive({
    username: '',
    password: '',
  })

  const submitLogin = async () => {
    if (processing.value) return

    processing.value = true
    validationErrors.value = {}

    await $fetch(`${config.public.BASE_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'omit'
    }).finally(() => processing.value = false)

    await $fetch(`${config.public.BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: loginForm
    }).then(async response => {
      loginUser(response)
    })
      .catch(error => {
        if (error.response?._data) {
          validationErrors.value = error.response._data.errors
        }
        processing.value = false
      })
      .finally(() => processing.value = false)
  }

  const submitRegister = async (registerForm) => {
    if (processing.value) return

    processing.value = true
    registerValidationErrors.value = {}
    await $fetch(`${config.public.BASE_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'omit'
    })

    await $fetch(`${config.public.BASE_URL}/api/auth/register`, {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: registerForm
    }).then(async response => {
      loginUser(response)
    })
      .catch(error => {
        if (error.response?._data) {
          registerValidationErrors.value = error.response._data.errors
        }
      })
      .finally(() => processing.value = false)
  }

  const loginUser = async (response) => {
    userProfile.value.name = response.data.name
    userProfile.value.username = response.data.username
    userProfile.value.token = response.token

    if (userProfile.value.name === '') {
      localStorage.setItem('loggedIn', JSON.stringify(false))
    } else {
      if (process.client) {
        localStorage.setItem('loggedIn', JSON.stringify(true))
        localStorage.setItem('token', JSON.stringify(userProfile.value.token))
        await navigateTo('/')
      }
    }
  }

  const getUser = async () => {
    assignToken()
    await $fetch(`${config.public.BASE_URL}/api/auth/user`, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${bearerToken.value}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        navigateTo('/')
        let shortUsername = response.name.substring(0, 16)
        userProfile.value.name = `${shortUsername}`

        isLoadingUser.value = false;
      })
      .catch(error => {
        localStorage.setItem('token', '')
        navigateTo('/login', { replace: true })
      })
  }

  const logout = async () => {
    assignToken()
    if (processing.value) return

    processing.value = true

    $fetch(`${config.public.BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${bearerToken.value}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (process.client) {
          localStorage.setItem('token', JSON.stringify(''))
          bearerToken.value = JSON.stringify('')
        }
        userProfile.value.name = ''
        userProfile.value.username = ''
        userProfile.value.token = ''
        navigateTo('/login')
      })
      .catch(error => {
        swal({
          icon: 'error',
          title: error.response.status,
          text: error.response.statusText
        })
      })
      .finally(() => {
        processing.value = false
      })
  }

  return {
    loginForm,
    validationErrors,
    registerValidationErrors,
    processing,
    submitLogin,
    submitRegister,
    getUser,
    logout,
    isLoadingUser,
  }
}