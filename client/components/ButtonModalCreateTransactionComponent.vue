<template>
  <div class="sm:w-full">

    <Head>
      <Title>Buat akun • {{ runtimeConfig.public.APP_NAME }}
      </Title>
    </Head>
    <VueFinalModal v-model="transactionsModal.create" classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full border dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 w-7/12"
      :esc-to-close="true" :focus-trap="true" :drag="true" :lock-scroll="true">
      <div class="flex flex-row justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 rounded-t-full">
        <div class="text-zinc-900 dark:text-zinc-50 font-bold text-xl">
          Buat transaksi baru
        </div>
        <div @click="transactionsModal.create = false"
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
              <div class="flex flex-col gap-1">
                <label for="quantity" class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Kuantitas <span class="text-rose-500">*</span>
                </label>
                <div
                  class="relative text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500">
                  <vue-number v-model="quantity" v-bind="pcsNumberFormatIntegerInputFormat"
                    @change="transaction.quantity = quantity"
                    class="block outline-none mt-1 w-full pl-4 py-2 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 placeholder-gray-400 dark:placeholder-zinc-600 border-gray-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 after:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500 dark:after:ring-emerald-500 text-gray-800 dark:text-zinc-100 outline-0 hover:ring-0 after:border-emerald-600 focus:text-gray-800 focus:ring-0 dark:focus:bg-zinc-900 border rounded-md shadow-sm transition text-sm"
                    placeholder="2" autocomplete="on" required></vue-number>
                </div>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.quantity">
                      {{ errors.quantity }}
                    </li>
                    <li v-for="validationError in validationErrors.quantity" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label for="productOptions" class="block font-bold text-gray-700 dark:text-zinc-100 mb-1">
                  Produk <span class="text-rose-500">*</span>
                </label>

                <VueMultiselect class="dark:border-zinc-70 !text-zinc-900 dark:!text-zinc-200" id="ajax"
                  v-model="optionSelectedProduct" :options="productOptions" :close-on-select="true"
                  :internal-search="false" :preserve-search="true" :clear-on-select="false" :allowEmpty="false"
                  label="text" track-by="id" :showLabels="false" :placeholder="onSearchGlobalPlaceholder"
                  :clearable="false" @select="onSelectOptionProduct" @search-change="asyncFindProducts"
                  :loading="isLoadingProductOptions">
                  <template slot="search" slot-scope="props">
                    <div class="option__desc"><span class="option__title">{{ props.option.title }}</span><span
                        class="option__small">{{ props.option.desc }}</span></div>
                  </template>
                  <template v-slot:search>
                    <div>{{ search }}</div>
                  </template>
                  <template v-slot:noResult>Produk tidak ditemukan..</template>
                </VueMultiselect>
                <div class="text-rose-700 text-xs mt-1 flex flex-col ml-4">
                  <ul class="list-disc list-outside">
                    <li v-if="errors.product_id">
                      {{ errors.product_id }}
                    </li>
                    <li v-for="validationError in validationErrors.product_id" :key="validationError">
                      {{ validationError }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Harga produk
                </label>
                <div
                  class="text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ rupiah(product_price) }}
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <label class="block font-bold text-sm text-gray-700 dark:text-zinc-100">
                  Pembayaran
                </label>
                <div
                  class="text-zinc-500 dark:text-gray-400 transition focus-within:text-emerald-500 hover:text-emerald-500 after:text-emerald-500 dark:focus-within:text-emerald-500 dark:hover:text-emerald-500 dark:after:text-emerald-500">
                  {{ rupiah(transaction.payment_amount) }}
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
} from "../utlis/validationRules";

const runtimeConfig = useRuntimeConfig();
const emit = defineEmits('updateCurrentSearchTransaction')

defineRule("required", required);
defineRule("min", min);

// Define a validation schema
const schema = {
  product_id: "required|min:1",
  quantity: "required|min:0",
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });

// Define actual fields for validation
const { value: product_id } = useField("product_id", null, {
  initialValue: "",
  label: "Harga",
});
const { value: quantity } = useField("quantity", null, {
  initialValue: "",
  label: "Kuantitas",
});
let product_name = ''
let product_price = 0
let payment_amount = 0

const { storeTransaction, validationErrors, isLoading, rupiahNumberInputFormat, pcsNumberFormatIntegerInputFormat, optionSelectedProduct, rupiah } = useTransactions();
const searchTransactions = useSearchTransactions()
const transactionsModal = useTransactionsModal()
const { productOptions, selectProducts, isLoadingProductOptions } = useProducts()

const transaction = reactive({
  product_id,
  quantity,
  product_name,
  product_price,
  payment_amount
});

function submitForm() {
  validate().then((form) => {
    if (form.valid) storeTransaction(transaction);
  });
}

watchEffect(() => {
  if (searchTransactions.value.successCreateTransaction === true) {
    transaction.product_id = ''
    transaction.quantity = ''
    transaction.product_name = ''
    transaction.payment_amount = ''
    transactionsModal.create = false
    searchTransactions.value.successCreateTransaction = false
  }

  if (!!transaction.product_id) {
    let refEmployeeTypeObject = productOptions.value.find(checkID, { param: parseInt(transaction.product_id) });
    if (!!refEmployeeTypeObject) {
      const refEmployeeTypeNameValue = Object.values(refEmployeeTypeObject);
      transaction.product_name = refEmployeeTypeNameValue[1];
    }
  }

  if (transaction.quantity) {
    transaction.payment_amount = product_price * transaction.quantity
  }
})

const onSearchGlobalPlaceholder = ref('Cari produk')

const placeHolderArray = ['Cari nama produk', 'pisang...', 'sandal', 'SEPATU..']

const initRandomPlaceholder = () => {
  onSearchGlobalPlaceholder.value = placeHolderArray[Math.floor(Math.random() * placeHolderArray.length)];
}

let autoRandomPlaceholderTimer = ''

function autoRefreshPlaceholder() {
  return autoRandomPlaceholderTimer = setInterval(initRandomPlaceholder, 3000);
}

onBeforeUnmount(() => {
  return clearInterval(autoRandomPlaceholderTimer)
})

onMounted(() => {
  selectProducts()
  autoRefreshPlaceholder()
});

function checkID(modelArray) {
  return modelArray.id === this.param;
}

const onSelectOptionProduct = (option) => {
  if (!!option) {
    transaction.product_id = option.id
    product_price = option.price
    transaction.product_price = option.price
    transaction.payment_amount = product_price * transaction.quantity
  }
}

const searchProductName = ref('')
const asyncFindProducts = (query) => {
  console.log(query);
  clearInterval(autoRandomPlaceholderTimer)
  searchProductName.value = query
  onSearchGlobalPlaceholder.value = query
  if (!query) {
    autoRefreshPlaceholder()
    onSearchGlobalPlaceholder.value = 'Cari produk'
  }
  isLoadingProductOptions.value = true;
  selectProducts(query)
}
</script>
