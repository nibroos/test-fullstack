<template>
  <div>

    <Head>
      <Title v-if="isLoadingProduct">{{ runtimeConfig.public.APP_NAME }}</Title>
      <Title v-else>{{ product.name }} • {{ runtimeConfig.public.APP_NAME }}</Title>
    </Head>
    <VueFinalModal v-if="productsModal.show && props.id" v-model="productsModal.show"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full border dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 w-7/12 sm:w-full lg:w-3/4 sm:h-screen"
      :esc-to-close="true" :focus-trap="true" :drag="true">
      <div class="flex flex-row justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 rounded-t-full">
        <div v-if="productsModal.edit" class="text-zinc-900 dark:text-zinc-50 font-bold text-xl">
          Edit Informasi Produk <span class="text-zinc-400 text-sm">#{{ props.id }}</span>
        </div>
        <div v-else class="text-zinc-900 dark:text-zinc-50 font-bold text-xl">
          Informasi Produk <span class="text-zinc-500 text-sm">#{{ props.id }}</span>
        </div>
        <div @click="productsModal.show = false"
          class="flex items-center text-center text-zinc-900 dark:text-zinc-50 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 w-max h-max p-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z" />
          </svg>
        </div>
      </div>
      <div class="flex flex-col">
        <LazyButtonModalEditProductComponent v-if="productsModal.edit" :productInfo="product"
          :isLoadingProduct="isLoadingProduct" :id="props.id" />
        <div v-else class="rounded-xl">
          <div v-if="isLoadingProduct" class="px-6 py-4 flex flex-row md:flex-col justify-between">

            <div class="pr-3 w-full flex flex-col gap-3">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Nama
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-6/12"></div>
              </div>
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Harga
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-4/12"></div>
              </div>
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Stok
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-4/12"></div>
              </div>
            </div>

            <div class="pl-3 md:pl-0 md:mt-3 w-full gap-3">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Dibuat tanggal
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-8/12"></div>
              </div>
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Deskripsi
                </label>
                <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-8/12"></div>
              </div>
            </div>
          </div>
          <div v-else class="px-6 py-4 grid grid-cols-8 md:flex md:flex-col justify-between">
            <div class="col-span-3 pr-3 w-full flex flex-col gap-3">
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Nama
                </label>
                <div
                  class="text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ product.name }}
                </div>
              </div>
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Harga
                </label>
                <div
                  class="text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ rupiah(product.price) }}
                </div>
              </div>
              <div>
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Stok
                </label>
                <div
                  class="text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ fixedNumberFormat(product.stock) }}
                </div>
              </div>
            </div>
            <div class="col-span-3 md:pl-0 md:mt-3 w-full">
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Dibuat tanggal
                </label>
                <div
                  class="relative text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  <span v-if="!product.created_at">-</span>{{ product.created_at }}
                </div>
              </div>
              <div class="mt-3">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Deskripsi
                </label>
                <div
                  class="relative text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  <span v-if="!product.description">-</span>{{ product.description }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-zinc-100 dark:bg-zinc-950 px-6 py-4 rounded-b-xl sm:relative">
            <div class="flex flex-row justify-end sm:inset-x-0 sm:bottom-0">
              <div class="flex flex-row justify-end">
                <button @click="productsModal.show = false"
                  class="grow mr-4 font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 text-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white rounded-lg">
                  <span class="font-bold">Tutup</span>
                </button>
                <button @click="productsModal.edit = !productsModal.edit"
                  class="w-3/4 font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                  <span class="font-bold">Edit Data</span>
                </button>
              </div>
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
  id: ""
});
const { product, getProduct, isLoadingProduct, rupiah, fixedNumberFormat } = useProducts();
const productsModal = useProductsModal()

onMounted(() => {
  getProduct(props.id)
});

</script>
