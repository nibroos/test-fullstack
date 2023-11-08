<template>
  <div>

    <Head>
      <Title v-if="isLoadingUser">{{ runtimeConfig.public.APP_NAME }}</Title>
      <Title v-else>{{ user.name }} • {{ runtimeConfig.public.APP_NAME }}</Title>
    </Head>
    <VueFinalModal v-if="usersModal.authProfile && props.username" v-model="usersModal.authProfile"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full border dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 w-7/12 sm:w-full lg:w-3/4 sm:h-screen"
      :esc-to-close="true" :focus-trap="true" :drag="true">
      <div class="flex flex-row justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 rounded-t-full">
        <div class="text-zinc-900 dark:text-zinc-50 font-bold text-xl">
          Akun saya <span class="text-zinc-500 text-sm">#{{ props.username }}</span>
        </div>
        <div @click="usersModal.authProfile = false"
          class="flex items-center text-center text-zinc-900 dark:text-zinc-50 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 w-max h-max p-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z" />
          </svg>
        </div>
      </div>
      <div v-auto-animate class="flex flex-col">
        <div class="rounded-xl">
          <div v-if="isLoadingUser" class="px-6 py-4 flex flex-row md:flex-col justify-between">
            <div class="pr-3 w-full">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Nama
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-6/12"></div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Email
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-8/12"></div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Grup
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-3/12"></div>
              </div>
            </div>
            <div class="pl-3 md:pl-0 md:mt-3 w-full">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Username
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-4/12"></div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  No HP
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-6/12"></div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  NIK
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-7/12"></div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Alamat
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-9/12"></div>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-8/12"></div>
              </div>
            </div>
          </div>
          <div v-else class="px-6 py-4 grid grid-cols-8 md:flex md:flex-col justify-between">
            <div class="col-span-3 pr-3 w-full">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Nama
                </label>
                <div
                  class="text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ user.name }}
                </div>
              </div>
            </div>
            <div class="col-span-3 md:pl-0 md:mt-3 w-full">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Username
                </label>
                <div
                  class="relative text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ user.username }}
                </div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  No HP
                </label>
                <div
                  class="relative text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ user.phone }}
                </div>
              </div>
            </div>
            <div class="col-span-2 md:mt-3 w-full p-5 rounded-xl h-min dark:bg-zinc-950">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Tanggal dibuat
                </label>
                <div
                  class="relative text-xs text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ user.created_at_idn }}
                </div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Terakhir diubah
                </label>
                <div
                  class="relative text-xs text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ user.updated_at_idn }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-zinc-100 dark:bg-zinc-950 px-6 py-4 rounded-b-xl sm:relative">
            <div class="flex flex-row sm:inset-x-0 sm:bottom-0 sm:w-full">
              <button @click="usersModal.authProfile = false"
                class="grow font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 text-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white rounded-lg">
                <span class="font-bold">Tutup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </VueFinalModal>
  </div>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
const props = defineProps({
  username: ""
});
const { user, getUser, isLoadingUser } = useUsers();
const usersModal = useUsersModal()

onMounted(() => {
  getUser(props.username)
});

</script>
