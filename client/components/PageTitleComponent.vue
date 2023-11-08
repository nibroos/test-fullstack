<template>
  <div>
    <h1 class="font-bold text-2xl text-gray-900 dark:text-gray-50">{{ text }}</h1>
  </div>
</template>
<script setup>
const props = defineProps({
  text: String
})

</script>