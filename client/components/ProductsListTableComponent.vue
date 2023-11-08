<template>
  <div>

    <Head>
      <Title>Produk • {{ runtimeConfig.public.APP_NAME }}
      </Title>
      <Meta name="description" content="Halaman pengelolaan master pengguna" />
    </Head>
    <div class="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-x-auto">
      <div class="p-4 flex flex-row gap-4 md:grid-rows-2 bg-white dark:bg-zinc-800 rounded-lg items-center">

        <div class="flex flex-col gap-1 w-1/4 sm:w-full">
          <div class="dark:text-zinc-200">
            Tanggal (bulan)
          </div>
          <VueDatePicker :model-value="searchProducts.searchPeriodeAt" range @update:model-value="setDate"
            placeholder="Pilih tanggal/rentang tanggal" :format="datePickerFormat" :clearable="false" cancelText="Batal"
            selectText="Pilih" :start-time="startTime" :preset-ranges="presetRanges" :enable-time-picker="false"
            multi-calendars multi-calendars-solo teleport-center :day-names="dayName" locale="id">
            <template #action-preview="{ value }">
              <div>{{ moment(value[0]).format(calendarDMYFormat) }}</div>
              <div>{{ moment(value[1]).format(calendarDMYFormat) }}</div>
            </template>
          </VueDatePicker>
        </div>
        <div class="flex flex-col gap-1 grow">
          <div class="dark:text-zinc-200">Pencarian global</div>
          <SearchTextComponent class="col-span-3 md:col-span-full" v-model:searchValue="searchGlobal"
            :placeholderText="['Cari Pisang..', 'sendok...', 'hoodie', 'vitamin A.. ', '..']" labelFor="searchGlobal" />
        </div>
      </div>
      <div v-if="isLoadingProducts"
        class="flex flex-col items-center text-center justify-center m-auto bg-zinc-50 dark:bg-zinc-800 h-max text-emerald-400">
        <div class="w-full animate-pulse grid grid-cols-5 gap-4 p-8 bg-zinc-50 dark:bg-zinc-800">
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
          <div class="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3.5"></div>
        </div>
      </div>
      <table v-else-if="!products.data || !products.data.length"
        class="flex flex-col py-16 items-center text-center justify-center m-auto bg-gray-50 dark:bg-zinc-900 h-max text-emerald-400">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5999 23.091H15.2227L13.3456 18.7196L18.5913 16.7139L21.5999 23.091Z" fill="#5D5FEF" />
          <path d="M10.5941 18.7196L5.33557 16.7139L2.45557 23.091H8.58842L10.5941 18.7196Z" fill="#5D5FEF" />
          <path
            d="M7.27727 15.2097L6.27441 16.8426L9.3987 18.4626L11.4044 16.4697L12.1501 15.5955L14.2844 18.4626L17.6658 16.8426L16.9073 15.2097V13.0883L15.9044 9.70689L14.2844 6.82689V2.69974L13.153 0.951172H11.4044L10.4016 1.4526L9.3987 6.82689L7.27727 11.7126V15.2097Z"
            fill="#FDD7AD" />
          <path
            d="M2.42918 23.4748H8.68276C8.82279 23.4752 8.94964 23.3919 9.0053 23.2632L9.90622 21.1258L10.9767 18.8659V18.8661C11.0151 18.7772 11.0151 18.6765 10.9767 18.5877C10.9415 18.4986 10.8711 18.428 10.7819 18.3928L10.3066 18.2008L10.415 18.0226V18.0228C11.115 17.509 11.6635 16.8159 12.0027 16.0163C12.3384 16.8155 12.883 17.5096 13.5793 18.0256L13.6877 18.2038L13.2122 18.3958C13.1231 18.4307 13.0525 18.5014 13.0176 18.5905C12.9792 18.6794 12.9792 18.7801 13.0176 18.8689L14.0881 21.1287L14.989 23.2661C15.0444 23.3948 15.1715 23.4779 15.3115 23.4775H21.576C21.6895 23.4725 21.7932 23.4123 21.854 23.3162C21.918 23.217 21.9265 23.0918 21.8763 22.985L19.891 18.6489L18.9177 16.4642L18.9179 16.4644C18.8405 16.2943 18.6437 16.2148 18.4703 16.2835L17.8225 16.5422L17.1051 15.3344C17.1412 14.8168 17.2692 12.6766 16.9439 11.4382H16.9437C16.7046 10.5691 16.3522 9.73549 15.8954 8.95843C15.318 8.0045 14.9195 6.95291 14.7193 5.85545C14.5692 5.02049 14.4718 4.31639 14.394 3.74875C14.1465 1.93988 14.0215 1.02977 12.7647 0.567741V0.567547C12.511 0.472616 12.2269 0.506782 12.0028 0.659372C11.7788 0.506787 11.4947 0.472621 11.241 0.567547C9.9842 1.02957 9.85074 1.93963 9.61162 3.74855C9.53384 4.30511 9.43648 5.02591 9.28636 5.85526V5.85545C9.08621 6.95286 8.68762 8.00445 8.11022 8.95843C7.65347 9.73554 7.30105 10.5691 7.06193 11.4382C6.73668 12.6878 6.86449 14.8279 6.90076 15.3344L6.18335 16.5449L5.53555 16.2862H5.53535C5.36196 16.2174 5.16511 16.297 5.08772 16.4671L4.11445 18.6518L2.11539 22.9823C2.06535 23.089 2.07369 23.2142 2.1377 23.3134C2.20112 23.4134 2.31109 23.4742 2.42959 23.4748L2.42918 23.4748ZM21.0305 22.779H15.55L14.8687 21.1788L19.4009 19.2585L21.0305 22.779ZM18.4168 17.0544L19.112 18.6129L14.5854 20.5305L13.8152 18.9023L18.4168 17.0544ZM12.35 7.82022C12.3552 7.71247 12.4178 7.6158 12.514 7.56688C12.6176 7.50495 12.7468 7.50495 12.8503 7.56688C13.1785 7.77284 13.3537 8.28768 13.3537 9.05858C13.3537 11.5632 13.6622 12.2396 13.6956 12.3091L13.6958 12.3093C13.7803 12.4781 13.9848 12.5476 14.1545 12.4651C14.3242 12.3803 14.3977 12.1771 14.3213 12.0031C14.3213 12.0031 14.0432 11.3658 14.0432 9.05877C14.0432 8.02074 13.765 7.31937 13.209 6.97711L13.2092 6.97691C12.9489 6.81675 12.6308 6.78104 12.3416 6.87946V1.3134C12.3439 1.28583 12.3594 1.26098 12.3833 1.24662C12.4225 1.22002 12.4721 1.21381 12.5167 1.22992C13.3509 1.53878 13.44 1.98974 13.6956 3.85437C13.7762 4.43056 13.8736 5.1457 14.0237 5.989C14.2402 7.15882 14.664 8.28028 15.2749 9.30086C15.7041 10.024 16.0359 10.8007 16.2621 11.6108C16.5957 12.8938 16.3955 15.3707 16.3928 15.3957C16.3866 15.4679 16.4043 15.5401 16.4429 15.6015L17.1603 16.8177L14.3436 17.9394L14.1378 17.6055V17.6053C14.1131 17.5668 14.0821 17.5331 14.046 17.5051C12.9913 16.7653 12.3594 15.5603 12.3499 14.2713L12.35 7.82022ZM7.55354 15.5903C7.59214 15.529 7.60978 15.4568 7.60358 15.3844C7.60358 15.3593 7.40051 12.8797 7.7343 11.5994C7.96045 10.7893 8.29228 10.0126 8.72152 9.28953C9.33248 8.2692 9.75625 7.14749 9.97268 5.97787C10.1228 5.14291 10.2202 4.41943 10.3008 3.84324C10.5567 1.97861 10.6484 1.52766 11.4797 1.21879C11.5243 1.20384 11.5733 1.21005 11.6131 1.23549C11.637 1.24966 11.6525 1.27451 11.6548 1.30227V6.86833C11.3656 6.76991 11.0476 6.80563 10.7872 6.96578C10.2312 7.30803 9.95305 8.00942 9.95305 9.04744C9.95305 11.3129 9.69161 11.9641 9.67493 11.9918L9.67512 11.992C9.59056 12.1648 9.66213 12.3734 9.83494 12.4581C10.0078 12.5425 10.2162 12.4709 10.3006 12.2981C10.334 12.2286 10.6425 11.5496 10.6425 9.04764C10.6425 8.27674 10.8177 7.76193 11.1459 7.55593L11.1461 7.55574C11.2496 7.49381 11.3788 7.49381 11.4824 7.55574C11.5786 7.60466 11.6412 7.70114 11.6464 7.80908V14.2712C11.6369 15.5602 11.0051 16.7652 9.95036 17.505C9.91428 17.5329 9.88325 17.5667 9.85862 17.6051L9.65284 17.939L6.83627 16.8065L7.55354 15.5903ZM5.58765 17.0543L10.1893 18.9022L9.41914 20.5304L4.89273 18.6128L5.58765 17.0543ZM4.60336 19.2444L9.13578 21.1787L8.45461 22.7929H2.9741L4.60336 19.2444Z"
            fill="black" />
        </svg>
        <div class="flex flex-col pt-4">
          <div class="text-gray-900 dark:text-zinc-50 font-bold text-xl pb-2">
            Hasil tidak ditemukan
          </div>
          <div class="text-sm text-gray-500">
            Kami tidak menemukan produk yang anda cari
          </div>
          <div class="text-sm text-gray-500">
            Silahkan ulangi pencarian..
          </div>
        </div>
      </table>
      <table v-else class="min-w-full table-fixed border-t border-zinc-200 dark:border-zinc-600">
        <thead>
          <tr>
            <th class="pl-6 py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left">
              <div
                class="flex flex-row items-center cursor-pointer text-zinc-400 dark:text-zinc-600 hover:text-emerald-600 transition ease-in-out dark:hover:text-emerald-600"
                @click="updateOrdering('products.id')">
                <div class="leading-4 text-sm font-bold tracking-wider" :class="{
                  'font-bold text-emerald-600':
                    searchProducts.orderColumn === 'products.id',
                }">
                  ID
                </div>
                <div class="select-none ml-0.5">
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.id',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.id',
                  }">&uarr;</span>
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.id',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.id',
                  }">&darr;</span>
                </div>
              </div>
            </th>
            <th class="py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left">
              <div
                class="flex flex-row items-center cursor-pointer text-zinc-400 dark:text-zinc-600 hover:text-emerald-600 transition ease-in-out dark:hover:text-emerald-600"
                @click="updateOrdering('products.name')">
                <div class="leading-4 font-bold text-sm" :class="{
                  'font-bold text-emerald-600':
                    searchProducts.orderColumn === 'products.name',
                }">
                  Nama
                </div>
                <div class="select-none ml-0.5">
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.name',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.name',
                  }">&uarr;</span>
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.name',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.name',
                  }">&darr;</span>
                </div>
              </div>
            </th>
            <th class="py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left">
              <div
                class="flex flex-row items-center cursor-pointer text-zinc-400 dark:text-zinc-600 hover:text-emerald-600 transition ease-in-out dark:hover:text-emerald-600"
                @click="updateOrdering('products.price')">
                <div class="leading-4 text-sm font-bold tracking-wider" :class="{
                  'font-bold text-emerald-600':
                    searchProducts.orderColumn === 'products.price',
                }">
                  Harga
                </div>
                <div class="select-none ml-0.5">
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.price',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.price',
                  }">&uarr;</span>
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.price',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.price',
                  }">&darr;</span>
                </div>
              </div>
            </th>
            <th class="py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left">
              <div
                class="flex flex-row items-center cursor-pointer text-zinc-400 dark:text-zinc-600 hover:text-emerald-600 transition ease-in-out dark:hover:text-emerald-600"
                @click="updateOrdering('products.stock')">
                <div class="leading-4 text-sm font-bold tracking-wider" :class="{
                  'font-bold text-emerald-600':
                    searchProducts.orderColumn === 'products.stock',
                }">
                  Stok
                </div>
                <div class="select-none ml-0.5">
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.stock',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.stock',
                  }">&uarr;</span>
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.stock',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.stock',
                  }">&darr;</span>
                </div>
              </div>
            </th>
            <th class="py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left">
              <div
                class="flex flex-row items-center cursor-pointer text-zinc-400 dark:text-zinc-600 hover:text-emerald-600 transition ease-in-out dark:hover:text-emerald-600"
                @click="updateOrdering('products.created_at')">
                <div class="leading-4 text-sm font-bold tracking-wider" :class="{
                  'font-bold text-emerald-600':
                    searchProducts.orderColumn === 'products.created_at',
                }">
                  Dibuat tanggal
                </div>
                <div class="select-none ml-0.5">
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.created_at',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'asc' &&
                      searchProducts.orderColumn ===
                      'products.created_at',
                  }">&uarr;</span>
                  <span :class="{
                    'text-emerald-600':
                      searchProducts.orderDirection ===
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.created_at',
                    hidden:
                      searchProducts.orderDirection !==
                      '' &&
                      searchProducts.orderDirection !==
                      'desc' &&
                      searchProducts.orderColumn ===
                      'products.created_at',
                  }">&darr;</span>
                </div>
              </div>
            </th>
            <th
              class="py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left text-sm font-bold text-zinc-400 dark:text-zinc-600">
              Deskripsi
            </th>
            <th
              class="py-2 border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 text-left text-sm font-bold text-zinc-400 dark:text-zinc-600">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white mb-4 text-zinc-900 dark:text-zinc-200">
          <tr v-for="product in products.data" :key="product.id"
            class="even:bg-white odd:bg-gray-50 dark:even:bg-zinc-800 dark:odd:bg-zinc-900 ">
            <td class="pl-6 py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              {{ product.id }}
            </td>
            <td class="py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              {{ product.name }}
            </td>
            <td class="py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              {{ rupiah(product.price) }}
            </td>
            <td class="py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              {{ fixedNumberFormat(product.stock) }}
            </td>
            <td class="py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              {{ product.created_at }}
            </td>
            <td class="py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              {{ product.description }}
            </td>
            <td class="py-1.5 whitespace-no-wrap text-sm leading-5 w-1/12">
              <div class="flex flex-row">
                <div @click="openModal(product.id, false)"
                  class="w-max font-semibold text-white dark:text-white bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-center p-1.5 rounded-full transition ease-in-out duration-200 sm:my-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z" />
                  </svg>
                </div>
                <div @click="openModal(product.id, true)"
                  class="ml-2 w-max font-semibold text-white dark:text-white bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-center p-1.5 rounded-full transition ease-in-out duration-200 sm:my-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Z" />
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="products.meta">
        <div v-if="products.meta.total > 5"
          class="border-t text-xs pl-3 flex rounded-lg items-center bg-white dark:border-zinc-700 dark:bg-zinc-800">
          <PerPageComponent v-model="searchProducts.searchPerPage"
            @update:parentPerPageValue="updateParentPerPageValue" />
          <vue-awesome-paginate v-model="products.meta.current_page" :items-per-page="products.meta.per_page"
            :max-pages-shown="3" :totalItems="products.meta.total" :on-click="paginationChangePage" class="py-4 px-6">
          </vue-awesome-paginate>
        </div>
      </div>
    </div>
    <LazyButtonModalShowProductComponent v-if="productsModal.show" :id="productId" />
  </div>
</template>

<script setup>
import moment from "moment";
const runtimeConfig = useRuntimeConfig();

const { products, getProducts, isLoadingProducts,
  searchGlobal, searchPeriodeAt, searchPerPage, orderColumn, orderDirection,
  rupiah, fixedNumberFormat } = useProducts()
const searchProducts = useSearchProducts()
const productId = ref()
const productsModal = useProductsModal()

onMounted(() => {
  getProducts(
    searchProducts.value.pageNumber,
    searchProducts.value.searchPeriodeAt[0],
    searchProducts.value.searchPeriodeAt[1],
    searchProducts.value.searchGlobal,
    searchProducts.value.orderColumn,
    searchProducts.value.orderDirection,
    searchProducts.value.searchPerPage
  );

});

const paginationChangePage = (page) => {
  searchProducts.value.pageNumber = page
  getProducts(
    searchProducts.value.pageNumber,
    searchProducts.value.searchPeriodeAt[0],
    searchProducts.value.searchPeriodeAt[1],
    searchProducts.value.searchGlobal,
    searchProducts.value.orderColumn,
    searchProducts.value.orderDirection,
    searchProducts.value.searchPerPage
  )
}

const updateOrdering = (column) => {
  searchProducts.value.orderColumn = column;
  searchProducts.value.orderDirection = searchProducts.value.orderDirection === "asc" ? "desc" : "asc";
  isLoadingProducts.value = true
  getProducts(
    searchProducts.value.pageNumber,
    searchProducts.value.searchPeriodeAt[0],
    searchProducts.value.searchPeriodeAt[1],
    searchProducts.value.searchGlobal,
    searchProducts.value.orderColumn,
    searchProducts.value.orderDirection,
    searchProducts.value.searchPerPage
  );
};

watch(searchGlobal, (current, previous) => {
  isLoadingProducts.value = true
  searchProducts.value.searchGlobal = current
  searchProducts.value.pageNumber = 1
  getProducts(
    searchProducts.value.pageNumber,
    searchProducts.value.searchPeriodeAt[0],
    searchProducts.value.searchPeriodeAt[1],
    current,
    searchProducts.value.orderColumn,
    searchProducts.value.orderDirection,
    searchProducts.value.searchPerPage
  );
});

watch(searchPeriodeAt, (current, previous) => {
  isLoadingProducts.value = true
  searchProducts.value.searchPeriodeAt = current
  searchProducts.value.pageNumber = 1
  getProducts(
    searchProducts.value.pageNumber,
    current[0],
    current[1],
    searchProducts.value.searchGlobal,
    searchProducts.value.orderColumn,
    searchProducts.value.orderDirection,
    searchProducts.value.searchPerPage
  );
})

watch(searchPerPage, (current, previous) => {
  isLoadingProducts.value = true
  searchProducts.value.searchPerPage = current
  searchProducts.value.pageNumber = 1
  getProducts(
    searchProducts.value.pageNumber,
    current[0],
    current[1],
    searchProducts.value.searchGlobal,
    searchProducts.value.orderColumn,
    searchProducts.value.orderDirection,
    current
  );
})

watchEffect(() => {
  if (searchProducts.value) {
    // pageNumber.value = searchProducts.value.pageNumber,
    searchPeriodeAt.value = searchProducts.value.searchPeriodeAt
    searchGlobal.value = searchProducts.value.searchGlobal
    orderColumn.value = searchProducts.value.orderColumn
    orderDirection.value = searchProducts.value.orderDirection
    searchPerPage.value = searchProducts.value.searchPerPage
  }

  if (searchProducts.value.successCreateProduct === true) {
    getProducts(
      searchProducts.value.pageNumber,
      searchProducts.value.searchPeriodeAt[0],
      searchProducts.value.searchPeriodeAt[1],
      searchProducts.value.searchGlobal,
      searchProducts.value.orderColumn,
      searchProducts.value.orderDirection,
      searchProducts.value.searchPerPage
    );
    searchProducts.value.successCreateProduct = false
  }
})

const openModal = (id, showEdit) => {
  productId.value = id
  productsModal.value.show = true
  productsModal.value.edit = showEdit
}

const calendarDMYFormat = "DD/MM/YYYY"
const datetimeFormat = "YYYY-MM-DD HH:mm"
const startTime = [{ hours: 0, minutes: 0 }];

const presetRanges = ref([
  { label: 'Bulan ini', range: [moment(new Date()).startOf('month').startOf('day'), moment(new Date()).endOf('month').endOf('day')] },
  { label: 'Bulan lalu', range: [moment(new Date()).subtract(1, 'month').startOf('month').startOf('day'), moment(new Date()).subtract(1, 'month').endOf('month').endOf('day')] },
  { label: 'Tahun ini', range: [moment(new Date()).startOf('year').startOf('day'), moment(new Date()).endOf('year').endOf('day')] },
  { label: 'Tahun lalu', range: [moment(new Date()).subtract(1, 'year').startOf('year').startOf('day'), moment(new Date()).subtract(1, 'year').endOf('year').endOf('day')] },
])
const dayName = ['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'St', 'Mg']
const setDate = (value) => {
  if (!!value) {
    const start = moment(value[0]).startOf('day').format(datetimeFormat)
    let end = ''
    if (!!value[1]) {
      end = moment(value[1]).endOf('day').format(datetimeFormat)
    } else {
      value[1] = value[0]
      end = moment(value[1]).endOf('day').format(datetimeFormat)
    }
    searchProducts.value.searchPeriodeAt = [start, end];
    searchPeriodeAt.value = [start, end];
    console.log(start);
    console.log(end);
    console.log(searchProducts.value.searchPeriodeAt);
  }
};

const datePickerFormat = () => {
  let periodeStart = moment(searchProducts.value.searchPeriodeAt[0]).format(calendarDMYFormat)
  let periodeEnd = moment(searchProducts.value.searchPeriodeAt[1]).format(calendarDMYFormat)
  if (periodeStart === periodeEnd) {
    return periodeStart
  } else {
    return `${periodeStart} - ${periodeEnd}`
  }
}

function updateParentPerPageValue(newValue) {
  searchProducts.value.searchPerPage = parseInt(newValue)
}

</script>