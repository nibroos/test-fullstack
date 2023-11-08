<template>
  <div>

    <Head>
      <Title>Login • Test Fullstack Nibros</Title>
    </Head>
    <div class="min-h-screen flex flex-row justify-center items-center bg-zinc-100 dark:bg-zinc-900">
      <div class="max-h-screen flex flex-row max-w-4xl bg-white dark:bg-zinc-800 shadow-md overflow-hidden rounded-xl">
        <div class="flex items-center p-12 py-auto w-full">
          <form v-if="registerView === true" @submit.prevent="submitForm">
            <div class="mb-4 text-left">
              <p class="text-2xl font-bold mb-1 dark:!text-zinc-100">
                <span>Daftar</span>
              </p>
              <p class="max-w-full text-sm mx-auto text-zinc-500 dark:text-zinc-400">
                Masukkan data diri untuk memulai menggunakan
                aplikasi.
              </p>
            </div>
            <div class="mt-4">
              <label for="name" class="block font-bold text-sm text-zinc-700 dark:!text-zinc-100">
                Nama
              </label>
              <div
                class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                <input type="text" id="name" v-model="registerForm.name"
                  class="block mt-1 w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:!text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                  placeholder="Nibros Ari" autocomplete="on" required autofocus />
              </div>
              <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                <ul class="list-disc list-outside">
                  <li v-if="errors.name">
                    {{ errors.name }}
                  </li>
                  <li v-for="validationError in registerValidationErrors.name" :key="validationError">
                    {{ validationError }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4">
              <label for="username" class="block font-bold text-sm text-zinc-700 dark:!text-zinc-100">
                Username
              </label>
              <div
                class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                <input type="text" id="username" v-model="registerForm.username"
                  class="block mt-1 w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:!text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                  placeholder="nibroos" autocomplete="on" required autofocus />
              </div>
              <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                <ul class="list-disc list-outside">
                  <li v-if="errors.username">
                    {{ errors.username }}
                  </li>
                  <li v-for="validationError in registerValidationErrors.username" :key="validationError">
                    {{ validationError }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between">
                <label for="password" class="block font-bold text-sm text-zinc-700 dark:!text-zinc-100">
                  Password
                </label>
              </div>
              <div
                class="relative text-zinc-400 focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 transition">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="w-5 h-5 stroke-current" fill="currentColor" stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path
                      d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z" />
                  </svg>
                </span>
                <input type="password" id="password" v-model="registerForm.password"
                  class="block mt-1 w-full pl-11 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:!text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                  placeholder="Password" required autocomplete="current-password" />
              </div>
              <div>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.password">
                      {{ errors.password }}
                    </li>
                    <li v-for="validationError in registerValidationErrors.password" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex mt-6 mb-4">
              <button
                class="px-4 py-2.5 bg-emerald-600 border border-transparent rounded-md text-sm text-white text-center tracking-widest hover:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:border-emerald-900 focus:ring focus:ring-emerald-300 dark:focus:ring-emerald-600 transition content-center items-center self-center flex-1 font-extrabold disabled:bg-emerald-500 dark:disabled:bg-emerald-600"
                :disabled="processing">
                <div v-if="processing" class="flex flex-row justify-center">
                  <svg :class="{
                    'text-white': processing,
                  }" v-show="processing" class="animate-spin w-4 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                      <path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3"
                        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0" />
                      </path>
                      <path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
                        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate"
                          values="0 12 12;360 12 12" />
                      </path>
                    </g>
                  </svg>
                  <div>Mengecek data</div>
                </div>
                <div v-else>Buat Akun</div>
              </button>
            </div>
            <p class="text-sm mx-auto text-zinc-500 text-center">
              Sudah punya akun?
              <span class="text-emerald-600 hover:text-emerald-800 cursor-pointer underline"
                @click="registerView = !registerView">Masuk</span>
            </p>
          </form>
          <form v-else @submit.prevent="submitLogin" class="dark:!text-zinc-100">
            <div class="mb-4 text-left">
              <p class="text-2xl font-bold mb-1">
                <span>Masuk</span>
              </p>
              <p class="max-w-full text-sm mx-auto text-zinc-500 dark:text-zinc-400">
                Silahkan masuk dengan data akun anda untuk
                menjalankan aplikasi.
              </p>
            </div>
            <!-- Username -->
            <div>
              <label for="username" class="block font-bold text-sm text-zinc-700 dark:!text-zinc-100">
                Username
              </label>
              <div
                class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                <input type="text" id="username" v-model="loginForm.username"
                  class="block mt-1 w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:!text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                  placeholder="nibros" autocomplete="on" required autofocus />
              </div>
              <!-- Validation Errors -->
              <div class="text-rose-500 mt-1 text-xs">
                <div v-for="validationError in validationErrors.username" :key="validationError">
                  {{ validationError }}
                </div>
              </div>
            </div>
            <!-- Password -->
            <div class="mt-4">
              <div class="flex justify-between">
                <label for="password" class="block font-bold text-sm text-zinc-700 dark:!text-zinc-100">
                  Password
                </label>
              </div>
              <div
                class="relative text-zinc-400 focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 transition">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="w-5 h-5 stroke-current" fill="currentColor" stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path
                      d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z" />
                  </svg>
                </span>
                <input type="password" id="password" v-model="loginForm.password"
                  class="block mt-1 w-full pl-11 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:!text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                  placeholder="Password" autocomplete="on" required />
              </div>
              <div>
                <!-- Validation Errors -->
                <div class="text-rose-500 mt-1 text-xs">
                  <div v-for="validationError in validationErrors.password" :key="validationError">
                    {{ validationError }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex mt-6 mb-4">
              <button
                class="px-4 py-2.5 bg-emerald-600 border border-transparent rounded-md text-sm text-white text-center tracking-widest hover:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:border-emerald-900 focus:ring focus:ring-emerald-300 transition content-center items-center self-center flex-1 font-extrabold disabled:bg-emerald-400 dark:disabled:bg-emerald-600"
                :disabled="processing">
                <div v-if="processing" class="flex flex-row justify-center">
                  <svg :class="{
                    'text-white': processing,
                  }" v-show="processing" class="animate-spin w-4 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                      <path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3"
                        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0" />
                      </path>
                      <path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
                        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate"
                          values="0 12 12;360 12 12" />
                      </path>
                    </g>
                  </svg>
                  <div>Mengecek data</div>
                </div>
                <div v-else>Masuk</div>
              </button>
            </div>
            <p class="text-sm mx-auto text-zinc-500 text-center">
              Belum punya akun?
              <span class="text-emerald-600 hover:text-emerald-800 cursor-pointer underline"
                @click="registerView = !registerView">Daftar sekarang</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField, defineRule } from "vee-validate";
import { required, min, createPassword } from "../utlis/validationRules";

defineRule("required", required);
defineRule("min", min);
defineRule("createPassword", createPassword);

const schema = {
  name: "required|min:1",
  username: "required",
  password: "required|min:6|createPassword:1",
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });

// Define actual fields for validation
const { value: name } = useField("name", null, {
  initialValue: "",
  label: "Nama",
});
const { value: username } = useField("username", null, {
  initialValue: "",
  label: "Email",
});
const { value: password } = useField("password", null, {
  initialValue: "",
  label: "Kata sandi",
});

const {
  loginForm,
  validationErrors,
  registerValidationErrors,
  processing,
  submitLogin,
  submitRegister,
} = useAuth();

const registerView = ref(false);
const bearerToken = useToken();

const registerForm = reactive({
  name,
  username,
  password,
});

function submitForm() {
  validate().then((form) => {
    if (form.valid) submitRegister(registerForm);
  });
}

onMounted(() => {
  if (process.client) {
    let token = {};
    token = localStorage.getItem("token");
    if (!!token) {
      bearerToken.value = JSON.parse(localStorage.getItem("token"));
      if (!!bearerToken.value) {
        navigateTo("/");
      }
    } else {
      bearerToken.value = "";
      navigateTo("/login");
    }
  }
});
</script>
