import moment from "moment";

export default function () {
  const config = useConfig()
  const products = ref({})
  const product = ref({
    id: 0,
    name: '',
    price: '',
    stock: '',
    description: '',
    created_at: '',
  })
  const searchProducts = useSearchProducts()
  const productOptions = ref([])
  const validationErrors = ref({})
  const isLoading = ref(false)
  const swal = inject('$swal')
  const isLoadingProducts = ref(true)
  const isLoadingProduct = ref(true)
  const isLoadingProductOptions = ref(false)

  const searchPeriodeAt = ref([searchProducts.value.searchPeriodeStartAt, searchProducts.value.searchPeriodeEndAt])
  const searchGlobal = ref(searchProducts.value.searchGlobal);
  const orderColumn = ref(searchProducts.value.orderColumn);
  const orderDirection = ref(searchProducts.value.orderDirection);
  const searchPerPage = ref(searchProducts.value.searchPerPage);
  const pageNumber = ref(searchProducts.value.pageNumber);

  const optionSelectedProduct = ref({
    id: '',
    text: ''
  });

  const productsModal = useProductsModal()
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(number);
  };

  const fixedNumberFormat = (number) => {
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(number);
  };

  const rupiahNumberInputFormat = {
    decimal: ',',
    separator: '.',
    prefix: 'Rp. ',
    precision: 2,
    masked: false
  }

  const pcsNumberFormatIntegerInputFormat = {
    decimal: ',',
    separator: '.',
    suffix: ' pcs',
  }

  const bearerToken = useToken()
  const assignToken = () => {
    if (process.client) {
      bearerToken.value = localStorage.getItem('token')
    }
  }

  const getProducts = async (
    page = 1,
    search_periode_start_at = '',
    search_periode_end_at = '',
    search_global = '',
    order_column = '',
    order_direction = '',
    search_per_page = 5
  ) => {
    assignToken()
    $fetch(config.public.BASE_URL + '/api/products?page=' + page +
      '&search_periode_start_at=' + search_periode_start_at +
      '&search_periode_end_at=' + search_periode_end_at +
      '&search_global=' + search_global +
      '&order_column=' + order_column +
      '&order_direction=' + order_direction +
      '&search_per_page=' + search_per_page, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        products.value = response;
        isLoadingProducts.value = false;
      })
      .catch(error => {
        products.value = error.response._data;
        isLoadingProducts.value = false;
      })
  }

  const getProduct = async (id) => {
    assignToken()
    await $fetch(config.public.BASE_URL + '/api/products/' + id, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        product.value = response.data;
        isLoadingProduct.value = false;
      })
      .catch(error => {
        product.value = error.response._data;
      })
  }

  const storeProduct = async (product) => {
    if (isLoading.value) return;

    isLoading.value = true
    validationErrors.value = {}

    swal({
      title: 'Apa Anda yakin?',
      html: `<p class="text-left text-sm">
      Data yang dimasukan berikut sudah benar?<br><br>
      Nama: ${product.name}<br>
      Harga: ${rupiah(product.price)}<br>
      Stok: ${fixedNumberFormat(product.stock)}<br>
      Deskripsi: ${product.description}<br>
      </p>`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, saya yakin',
      confirmButtonColor: '#10b981',
      timer: 20000,
      timerProgressBar: true,
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        let serializedRequest = JSON.stringify(product)

        $fetch(`${config.public.BASE_URL}/api/products`, {
          method: 'POST',
          credentials: 'omit',
          headers: {
            Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
            'Accept': 'application/json'
          },
          body: serializedRequest
        })
          .then(response => {
            isLoadingProducts.value = true
            productsModal.value.create = false
            searchProducts.value.successCreateProduct = true

            swal({
              icon: 'success',
              title: 'Sukses &#9996',
              text: response.message
            })
          })
          .catch(error => {
            if (error.response?._data) {
              validationErrors.value = error.response._data.errors
            }
          })
          .finally(() => isLoading.value = false)
      }
      else {
        isLoading.value = false
      }
    })
  }

  const updateProduct = async (product) => {
    if (isLoading.value) return;

    isLoading.value = true
    validationErrors.value = {}
    swal({
      title: 'Apa Anda yakin?',
      html: `<p class="text-left text-sm">
      Data yang dimasukan berikut sudah benar?</p>
      <ul class="text-left text-sm list-disc mt-2">
      Nama: ${product.name}<br>
      Harga: ${rupiah(product.price)}<br>
      Stok: ${fixedNumberFormat(product.stock)}<br>
      Deskripsi: ${product.description}<br>
      </ul>`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, saya yakin',
      confirmButtonColor: '#10b981',
      timerProgressBar: true,
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        let serializedRequest = JSON.stringify(product)

        $fetch(`${config.public.BASE_URL}/api/products/${product.id}`, {
          method: 'PUT',
          credentials: 'omit',
          headers: {
            Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
            'Accept': 'application/json'
          },
          body: serializedRequest
        })
          .then(response => {
            isLoadingProducts.value = true
            searchProducts.value.successCreateProduct = true

            swal({
              icon: 'success',
              title: 'Sukses &#9996',
              text: response.message
            })
          })
          .catch(error => {
            if (error.response?._data) {
              isLoading.value = false
              validationErrors.value = error.response._data.errors
            }
          })
          .finally(() => isLoading.value = false)
      }
      else {
        isLoading.value = false
      }
    })
  }

  const deleteProduct = async (uuid) => {
    swal({
      title: 'Apa Anda yakin?',
      text: 'Produk akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, hapus produk',
      confirmButtonColor: '#ef4444',
      timer: 20000,
      timerProgressBar: true,
      reverseButtons: true
    })
      .then(result => {
        if (result.isConfirmed) {
          $fetch(`${config.public.BASE_URL}/api/products/${uuid}`, {
            method: 'DELETE',
            credentials: 'omit',
            headers: {
              Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
              'Accept': 'application/json'
            }
          })
            .then(response => {
              isLoadingProducts.value = true
              searchProducts.value.successCreateProduct = true
              productsModal.value.show = false

              swal({
                icon: 'success',
                title: 'Sukses &#9996',
                text: response.message
              })
            })
            .catch(error => {
              swal({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: error.response._data.message
              })
            })
        }
      })
  }

  const selectProducts = async (
    search_name = ''
  ) => {
    assignToken()
    isLoadingProductOptions.value = true;
    await $fetch(`${config.public.BASE_URL}/api/product/select?search_name=` + search_name, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      isLoadingProductOptions.value = false;
      productOptions.value = response.results;
    })
      .catch(error => {
        isLoadingProductOptions.value = false;
        productOptions.value = error.response._data.results;
      })
  }

  return {
    products,
    product,
    getProducts,
    getProduct,
    storeProduct,
    updateProduct,
    deleteProduct,
    validationErrors,
    isLoading,
    isLoadingProducts,
    isLoadingProduct,
    selectProducts,
    productOptions,
    searchGlobal, searchPeriodeAt, orderColumn, orderDirection, searchPerPage, pageNumber, rupiah, fixedNumberFormat, rupiahNumberInputFormat, pcsNumberFormatIntegerInputFormat,
    optionSelectedProduct,
    isLoadingProductOptions
  }
}