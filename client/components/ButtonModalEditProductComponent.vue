<template>
  <div class="rounded-xl">

    <Head>
      <Title v-if="props.isLoadingProduct">{{
        runtimeConfig.public.APP_NAME
      }}</Title>
      <Title v-else>Edit {{ product.name }} • Products •
        {{ runtimeConfig.public.APP_NAME }}</Title>
    </Head>
    <form @submit.prevent="submitForm">
      <div v-if="props.isLoadingProduct" class="px-6 py-4 flex flex-row md:flex-col justify-between">
        <div class="pr-3 w-full">
          <div>
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Nama
            </label>
            <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-6/12"></div>
          </div>
          <div class="mt-3">
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-50">
              Harga
            </label>
            <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-8/12"></div>
          </div>
          <div class="mt-3">
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Stok
            </label>
            <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-3/12"></div>
          </div>
          <div class="mt-3">
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Deskripsi
            </label>
            <div class="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5 mt-2 w-3/12"></div>
          </div>
        </div>
      </div>
      <div v-else class="px-6 py-4 flex flex-row md:flex-col justify-between">
        <div class="pr-3 w-full flex flex-col gap-3">
          <div>
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Nama
            </label>
            <div
              class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
              <input type="text" v-model="product.name"
                class="block mt-1 outline-none w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                placeholder="Meja" autocomplete="on" required autofocus />
            </div>
            <div class="text-rose-500 text-xs mt-1 flex flex-col ml-4">
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
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Harga
            </label>
            <div
              class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">

              <vue-number v-model="price" v-bind="rupiahNumberInputFormat" @change="product.price = price"
                class="block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                placeholder="100000" autocomplete="on" required />
            </div>
            <div class="text-rose-500 text-xs mt-1 flex flex-col ml-4">
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
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Stok
            </label>
            <div
              class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">

              <vue-number v-model="stock" v-bind="pcsNumberFormatIntegerInputFormat" @change="product.stock = stock"
                class="block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                placeholder="4" autocomplete="on" required />
            </div>
            <div class="text-rose-500 text-xs mt-1 flex flex-col ml-4">
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
            <label class="block font-bold text-sm text-zinc-700 dark:text-zinc-100">
              Deskripsi
            </label>
            <div
              class="relative text-zinc-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
              <input type="text" v-model="product.description"
                class="block mt-1 outline-none w-full pl-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-600 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-zinc-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-zinc-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                placeholder="Kokoh" autocomplete="on" />
            </div>
            <div class="text-rose-500 text-xs mt-1 flex flex-col ml-4">
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

      <div class="bg-zinc-100 dark:bg-zinc-950 px-6 py-4 rounded-b-xl flex flex-row justify-end">
        <div class="flex flex-row justify-end">
          <div @click="productsModal.show = false"
            class="font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 text-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white rounded-lg cursor-pointer mr-4">
            <span class="font-bold">Tutup</span>
          </div>
          <button :disabled="isLoading"
            class="grow font-bold transition ease-in-out justify-center inline-flex items-center p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-75 disabled:cursor-not-allowed">
            <div v-show="isLoading"
              class="inline-block animate-spin w-4 h-4 mr-2 border-t-2 border-t-white border-r-2 border-r-white border-b-2 border-b-white border-l-2 border-l-emerald-600 rounded-full">
            </div>
            <span v-if="isLoading">Menyimpan...</span>
            <span class="font-bold" v-else>Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm, useField, defineRule } from "vee-validate";
import {
  required,
  min,
} from "../utlis/validationRules";

const runtimeConfig = useRuntimeConfig();
const props = defineProps({
  uuid: "",
  productInfo: {
    name: "",
    price: "",
    stock: "",
    description: "",
  },
  isLoadingProduct: true,
});

const emit = defineEmits("updateCurrentSearchProduct");

defineRule("required", required);
defineRule("min", min);

// Define a validation schema
const schema = {
  name: "required",
  price: "required|min:0",
  stock: "required|min:0",
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });

// Define actual fields for validation
const { value: name } = useField("name", null, {
  initialValue: props.productInfo.name,
  label: "Nama",
});
const { value: price } = useField("price", null, {
  initialValue: props.productInfo.price,
  label: "Email",
});
const { value: description } = useField("description", null, {
  initialValue: props.productInfo.description,
  label: "No HP",
});
const { value: stock } = useField("stock", null, {
  initialValue: props.productInfo.stock,
  label: "NIK",
});
let id = props.productInfo.id;

const {
  updateProduct,
  validationErrors,
  isLoading,
  rupiahNumberInputFormat, pcsNumberFormatIntegerInputFormat
} = useProducts();

const product = reactive({
  id,
  name,
  price,
  description,
  stock,
});

function submitForm() {
  validate().then((form) => {
    if (form.valid) updateProduct(product);
  });
}

const productsModal = useProductsModal();

watchEffect(() => {
  if (!product.id) {
    product.id = props.productInfo.id;
    product.name = props.productInfo.name;
    product.price = props.productInfo.price;
    product.description = props.productInfo.description;
    product.stock = props.productInfo.stock;
  }
});
</script>
