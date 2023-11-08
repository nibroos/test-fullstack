<template>
  <div class="sm:w-full">

    <Head>
      <Title>Buat akun • {{ runtimeConfig.public.APP_NAME }}
      </Title>
    </Head>
    <VueFinalModal v-model="productsModal.create" classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full border dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 w-7/12"
      :esc-to-close="true" :focus-trap="true" :drag="true" :lock-scroll="true">
      <div class="flex flex-row justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 rounded-t-full">
        <div class="text-zinc-900 dark:text-zinc-50 font-bold text-xl">
          Buat produk baru
        </div>
        <div @click="productsModal.create = false"
          class="flex items-center text-center text-zinc-900 dark:text-zinc-50 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 w-max h-max p-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z" />
          </svg>
        </div>
      </div>
      <form @submit.prevent="submitForm" class="rounded-xl">
        <div class="px-6 py-4 flex flex-col">
          <div class="flex flex-row md:flex-col justify-between">
            <div class="flex flex-col gap-3 pr-3 w-full">
              <div>
                <label for="name" class="block font-bold text-gray-700 dark:text-zinc-100">
                  Nama <span class="text-rose-500">*</span>
                </label>
                <div
                  class="relative text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                  <input type="text" id="name" v-model="product.name"
                    class="block mt-1 outline-none w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition"
                    placeholder="Jambu" autocomplete="on" required autofocus />
                </div>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.name">
                      {{ errors.name }}
                    </li>
                    <li v-for="validationError in validationErrors.name" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="price" class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Harga <span class="text-rose-500">*</span>
                </label>
                <div
                  class="relative text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                  <vue-number v-model="price" v-bind="rupiahNumberInputFormat" @change="product.price = price"
                    class="block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                    placeholder="100000" autocomplete="on" required></vue-number>
                </div>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.price">
                      {{ errors.price }}
                    </li>
                    <li v-for="validationError in validationErrors.price" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="stock" class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Stok <span class="text-rose-500">*</span>
                </label>
                <div
                  class="relative text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                  <vue-number v-model="stock" v-bind="pcsNumberFormatIntegerInputFormat" @change="product.stock = stock"
                    class="block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                    placeholder="2" autocomplete="on" required></vue-number>
                </div>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.stock">
                      {{ errors.stock }}
                    </li>
                    <li v-for="validationError in validationErrors.stock" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="description" class="block font-bold text-gray-700 dark:text-zinc-100">
                  Deskripsi
                </label>
                <div
                  class="relative text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                  <input type="description" id="description" v-model="product.description"
                    class="block mt-1 outline-none w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition"
                    placeholder="Buah sehat" autocomplete="on" />
                </div>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.description">
                      {{ errors.description }}
                    </li>
                    <li v-for="validationError in validationErrors.description" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-zinc-100 dark:bg-zinc-950 px-6 py-4 rounded-b-xl">
          <button :disabled="isLoading"
            class="font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg w-full disabled:opacity-75 disabled:cursor-not-allowed">
            <div v-show="isLoading"
              class="inline-block animate-spin w-4 h-4 mr-2 border-t-2 border-t-white border-r-2 border-r-white border-b-2 border-b-white border-l-2 border-l-blue-600 rounded-full">
            </div>
            <span v-if="isLoading">Menyimpan...</span>
            <span class="font-bold" v-else>Simpan Data Produk</span>
          </button>
        </div>
      </form>
    </VueFinalModal>
  </div>
</template>
<script setup>
import { useForm, useField, defineRule } from "vee-validate";
import {
  required,
  min,
  createPassword,
  mail
} from "../utlis/validationRules";

const runtimeConfig = useRuntimeConfig();
const emit = defineEmits('updateCurrentSearchProduct')

defineRule("required", required);
defineRule("min", min);
defineRule("createPassword", createPassword);
defineRule("mail", mail);

// Define a validation schema
const schema = {
  name: "required|min:1",
  price: "required|min:1",
  stock: "required|min:0",
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });

// Define actual fields for validation
const { value: name } = useField("name", null, {
  initialValue: "",
  label: "Nama",
});
const { value: price } = useField("price", null, {
  initialValue: "",
  label: "Harga",
});
const { value: stock } = useField("stock", null, {
  initialValue: "",
  label: "Stok",
});
const { value: description } = useField("description", null, {
  initialValue: "",
  label: "Deskripsi",
});

const { storeProduct, validationErrors, isLoading, rupiahNumberInputFormat, pcsNumberFormatIntegerInputFormat } = useProducts();
const searchProducts = useSearchProducts()
const productsModal = useProductsModal()

const product = reactive({
  name,
  price,
  stock,
  description,
});

function submitForm() {
  validate().then((form) => {
    if (form.valid) storeProduct(product);
  });
}

watchEffect(() => {
  if (searchProducts.value.successCreateProduct === true) {
    product.name = ''
    product.price = ''
    product.stock = ''
    product.description = ''
    productsModal.create = false
    searchProducts.value.successCreateProduct = false
  }

})

</script>
