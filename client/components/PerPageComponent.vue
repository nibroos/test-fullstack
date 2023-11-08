<template>
  <div>
    <select :value="searchPerPage" @input="updateChildValue($event.target.value)"
      class="p-2 text-sm rounded-md bg-white border !border-zinc-400 dark:border-none dark:bg-zinc-700 dark:text-white hover:!border-zinc-700 !ring-0 focus:!ring-0  after:text-zinc-900 focus:text-zinc-900 w-24 mr-4 appearance-none">
      <!-- <select :value="searchPerPage" @input="updateChildValue($event.target.value)" class="v"> -->
      <option class="text-zinc-900 dark:text-white" :value="5"><span class="text-zinc-500">Per:</span> 5</option>
      <option class="text-zinc-900 dark:text-white" :value="10" selected><span class="text-zinc-500">Per:</span> 10
      </option>
      <option class="text-zinc-900 dark:text-white" :value="25"><span class="text-zinc-500">Per:</span> 25</option>
      <option class="text-zinc-900 dark:text-white" :value="50"><span class="text-zinc-500">Per:</span> 50</option>
      <option class="text-zinc-900 dark:text-white" :value="100"><span class="text-zinc-500">Per:</span> 100</option>
      <option class="text-zinc-900 dark:text-white" :value="200"><span class="text-zinc-500">Per:</span> 200</option>
      <option class="text-zinc-900 dark:text-white" :value="500"><span class="text-zinc-500">Per:</span> 500</option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: '',
});

const emits = defineEmits(['update:modelValue']);

const searchPerPage = ref(props.modelValue);

function updateChildValue(newValue) {
  searchPerPage.value = newValue;
  emits('update:modelValue', newValue);
  // Call updateParentValue in parent component
  emits('update:parentPerPageValue', newValue);
}

</script>
