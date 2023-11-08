<template>
  <div class="flex flex-col w-full">
    <label v-if="labelTitle" :for="labelFor" class="font-semibold text-gray-700 mb-0.5">{{ labelTitle }}</label>
    <div class="relative">
      <div class="absolute inset-y-2 left-0 flex items-center pl-2.5 pointer-events-none text-gray-400">
        <svg class="stroke-current fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
          width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" fill="currentColor"
          stroke="currentColor" stroke-width="0">
          <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
          <path fill="currentColor"
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1c-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
      </div>
      <input :id="labelFor" type="text" :value="searchValue" @input="$emit('update:searchValue', $event.target.value)"
        :placeholder="placeholder" class="
                  w-full
                  pl-9
                  py-2.5
                  bg-gray-50 dark:bg-zinc-800
                  hover:bg-gray-100 dark:hover:bg-zinc-900
                  placeholder-gray-400 dark:placeholder-zinc-600
                  border-gray-300 dark:border-zinc-600
                  focus:border-emerald-500
                  dark:focus:border-emerald-500
                  text-gray-800 dark:text-zinc-100
                  outline-0
                  hover:ring-0
                  after:border-emerald-600
                  focus:text-gray-800
                  dark:focus:bg-zinc-900
                  focus:ring-0 focus:ring-offset-0
                  border focus-visible:ring-0 focus-visible:ring-offset-0
                  focus:ring-transparent
                  rounded-md
                  shadow-sm
                  text-sm transition duration-200 ease-in-out" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  labelTitle: '',
  searchValue: '',
  placeholderText: Array,
  labelFor: '',
})

const placeholder = ref(['Ketik sesuatu untuk mulai pencarian..'])
let placeHolderArray = []
placeHolderArray = props.placeholderText

const initRandomPlaceholder = () => {
  placeholder.value = placeHolderArray[Math.floor(Math.random() * placeHolderArray.length)];
}

let autoRandomPlaceholderTimer = ''

function autoRefreshReport() {
  return autoRandomPlaceholderTimer = setInterval(initRandomPlaceholder, 3000);
}

onMounted(() => {
  autoRefreshReport()
})

onBeforeUnmount(() => {
  return clearInterval(autoRandomPlaceholderTimer)
})

defineEmits(['update:searchValue'])
</script>
