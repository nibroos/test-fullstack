<template>
  <div>
    <div class="fixed top-0 left-0 w-full z-40 bg-white dark:bg-zinc-800 dark:text-gray-100">
      <div
        class="flex flex-row justify-between w-full px-12 py-5 border-b border-gray-200 dark:border-black items-center xs:p-6">
        <NuxtLink class="flex flex-col font-bold py-2 tracking-tight" to="/">
          <div class="underline decoration-wavy decoration-emerald-500 whitespace-nowrap -mt-2">
            {{ runtimeConfig.public.APP_NAME }}</div>
        </NuxtLink>
        <div class="flex flex-row text-gray-400">
          <NuxtLink
            :class="{ 'bg-emerald-50 text-emerald-500 dark:bg-zinc-700 dark:text-white': productsPath.includes(route.path) }"
            class="font-semibold hover:bg-emerald-100 hover:text-emerald-600 dark:hover:text-white dark:hover:bg-zinc-700 text-center py-2 px-4 rounded-lg transition ease-in-out duration-200"
            to="/">
            Products</NuxtLink>
          <NuxtLink to="/transactions"
            :class="{ 'bg-emerald-50 text-emerald-500 dark:bg-zinc-700 dark:text-white': transactionsPath.includes(route.path) }"
            class="mx-2 font-semibold hover:bg-emerald-100 hover:text-emerald-600 dark:hover:text-white dark:hover:bg-zinc-700 text-center py-2 px-4 rounded-lg transition ease-in-out duration-200">
            Transaction</NuxtLink>
        </div>
        <div class="flex flex-row gap-1 items-center text-gray-900 dark:text-gray-50">
          <div :class="{ 'dark:bg-zinc-900': isSettingsOpen }"
            class="flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 cursor-pointer transition ease-in-out duration-200"
            @click="openSettingsDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256">
              <rect x="0" y="0" width="128" height="128" fill="none" stroke="none" />
              <path fill="currentColor"
                d="M232 128a104 104 0 1 0-174.2 76.7l1.3 1.2a104 104 0 0 0 137.8 0l1.3-1.2A103.7 103.7 0 0 0 232 128Zm-192 0a88 88 0 1 1 153.8 58.4a79.2 79.2 0 0 0-36.1-28.7a48 48 0 1 0-59.4 0a79.2 79.2 0 0 0-36.1 28.7A87.6 87.6 0 0 1 40 128Zm56-8a32 32 0 1 1 32 32a32.1 32.1 0 0 1-32-32Zm-21.9 77.5a64 64 0 0 1 107.8 0a87.8 87.8 0 0 1-107.8 0Z" />
            </svg>
          </div>
          <div v-if="isSettingsOpen"
            class="block absolute right-0 top-12 py-4 px-4 bg-white dark:bg-zinc-800 dark:border-zinc-700 divide-y divide-gray-100 rounded-lg border border-gray-300 w-56 transition ease-in-out duration-200">
            <div class="flex flex-col">
              <div v-if="isLoadingUser" class="my-2 text-xs">
                <div class="h-3.5 bg-gray-200 rounded-full"></div>
              </div>
              <div v-else class="my-2 text-xs">{{ userProfile.name }}</div>
              <div class="relative flex w-full items-center py-2">
                <div class="flex-grow border-t border-gray-300 dark:border-zinc-700"></div>
              </div>
              <div class="font-bold my-2">Pengaturan</div>
              <div @click="toggleTheme"
                class="mt-2 cursor-pointer flex flex-row rounded-lg p-1.5 text-gray-900 dark:text-gray-50 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-900 dark:hover:bg-black text-sm transition ease-in-out duration-200">
                <div
                  class="flex flex-row w-1/2 mr-1 justify-center items-center py-1 px-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-900 rounded-lg transition ease-in-out duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                    <rect x="0" y="0" width="256" height="256" fill="none" stroke="none" />
                    <path fill="currentColor"
                      d="M128 56a72 72 0 1 0 72 72a72.1 72.1 0 0 0-72-72Zm0 120a48 48 0 1 1 48-48a48 48 0 0 1-48 48ZM116 28V12a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0Zm74.2 37.8a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 17l-11.3 11.3a12 12 0 0 1-8.5 3.5a12.2 12.2 0 0 1-8.5-3.5ZM256 128a12 12 0 0 1-12 12h-16a12 12 0 0 1 0-24h16a12 12 0 0 1 12 12Zm-37.5 73.5a12 12 0 0 1 0 17a11.6 11.6 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5l-11.3-11.3a12 12 0 0 1 17-17ZM140 228v16a12 12 0 0 1-24 0v-16a12 12 0 0 1 24 0Zm-74.2-37.8a12 12 0 0 1 0 17l-11.3 11.3A12 12 0 0 1 46 222a11.6 11.6 0 0 1-8.5-3.5a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 0ZM28 140H12a12 12 0 0 1 0-24h16a12 12 0 0 1 0 24Zm9.5-85.5a12 12 0 0 1 17-17l11.3 11.3a12 12 0 0 1 0 17a12.2 12.2 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5Z" />
                  </svg>
                  <span class="ml-2">
                    Light
                  </span>
                </div>
                <div
                  class="flex flex-row w-1/2 ml-1 justify-center items-center py-1 px-3 rounded-lg bg-gray-200 dark:bg-zinc-800 transition ease-in-out duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                    <rect x="0" y="0" width="256" height="256" fill="none" stroke="none" />
                    <path fill="currentColor"
                      d="M228.1 149.1a12 12 0 0 0-11.6-8.5a11.4 11.4 0 0 0-3.3.6a80 80 0 0 1-98.3-98.4a13.5 13.5 0 0 0 .4-2.8a12 12 0 0 0-7.5-11.8a12.6 12.6 0 0 0-7.9-.4A104 104 0 1 0 228.2 156a12.5 12.5 0 0 0-.1-6.9ZM128 208A80 80 0 0 1 88.1 58.6a104.2 104.2 0 0 0 109.3 109.3A80.4 80.4 0 0 1 128 208Z" />
                  </svg>
                  <span class="ml-2">
                    Dark
                  </span>
                </div>
              </div>
              <div
                class="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-zinc-900 px-3 py-1 rounded-lg mt-2 text-gray-900 dark:text-gray-50 cursor-pointer transition ease-in-out duration-200"
                @click="logout">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                    <path fill="currentColor"
                      d="M15.325 16.275q-.275-.325-.275-.738q0-.412.275-.687l1.85-1.85H10q-.425 0-.712-.288Q9 12.425 9 12t.288-.713Q9.575 11 10 11h7.175l-1.85-1.85q-.3-.3-.3-.712q0-.413.3-.713q.275-.3.688-.3q.412 0 .687.275l3.6 3.6q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-3.6 3.6q-.325.325-.712.287q-.388-.037-.663-.312ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h6q.425 0 .713.287Q12 3.575 12 4t-.287.712Q11.425 5 11 5H5v14h6q.425 0 .713.288q.287.287.287.712t-.287.712Q11.425 21 11 21Z" />
                  </svg>
                </div>
                <div class="ml-2 text-sm">
                  Keluar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-gray-100 dark:bg-zinc-900 mt-24 px-12 py-8 w-full md:px-0 xs:px-0 ms:p-0"
      @click="toggleCloseDropdown">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const userProfile = useUserProfile()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { getUser, logout, isLoadingUser } = useAuth();

onMounted(() => {
  getUser()
})

const isSettingsOpen = ref(false);
const { toggleTheme } = useTheme()
const isDropdownOpen = ref(0);
switch (isDropdownOpen) {
  case 0:
    isDropdownOpen = 0;
    break;
  case 1:
    isDropdownOpen = 1;
    break;
  case 2:
    isDropdownOpen = 2;
}

const productsPath = [
  '/',
]

const transactionsPath = [
  `/transactions`,
]

const openSettingsDropdown = () => {
  isSettingsOpen.value = !isSettingsOpen.value
}

const toggleCloseDropdown = () => {
  isDropdownOpen.value = 0
  isSettingsOpen.value = false
};

watchEffect(() => {
})
</script>