import moment from "moment";

export default function () {
  const config = useConfig()
  const transactions = ref({})
  const transaction = ref({
    id: 0,
    reference_no: '',
    product_id: '',
    product_name: '',
    product_price: '',
    quantity: '',
    payment_amount: '',
    created_at: '',
  })
  const searchTransactions = useSearchTransactions()
  const transactionSelected = ref([])
  const validationErrors = ref({})
  const isLoading = ref(false)
  const swal = inject('$swal')
  const isLoadingTransactions = ref(true)
  const isLoadingTransaction = ref(true)

  const searchPeriodeAt = ref([searchTransactions.value.searchPeriodeStartAt, searchTransactions.value.searchPeriodeEndAt])
  const searchGlobal = ref(searchTransactions.value.searchGlobal);
  const orderColumn = ref(searchTransactions.value.orderColumn);
  const orderDirection = ref(searchTransactions.value.orderDirection);
  const searchPerPage = ref(searchTransactions.value.searchPerPage);
  const pageNumber = ref(searchTransactions.value.pageNumber);

  const transactionsModal = useTransactionsModal()
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

  const getTransactions = async (
    page = 1,
    search_periode_start_at = '',
    search_periode_end_at = '',
    search_global = '',
    order_column = '',
    order_direction = '',
    search_per_page = 5
  ) => {
    assignToken()
    $fetch(config.public.BASE_URL + '/api/transactions?page=' + page +
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
        transactions.value = response;
        isLoadingTransactions.value = false;
      })
      .catch(error => {
        transactions.value = error.response._data;
        isLoadingTransactions.value = false;
      })
  }

  const getTransaction = async (id) => {
    assignToken()
    await $fetch(config.public.BASE_URL + '/api/transactions/' + id, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        transaction.value = response.data;
        isLoadingTransaction.value = false;
      })
      .catch(error => {
        transaction.value = error.response._data;
      })
  }

  const storeTransaction = async (transaction) => {
    if (isLoading.value) return;

    isLoading.value = true
    validationErrors.value = {}

    swal({
      title: 'Apa Anda yakin?',
      html: `<p class="text-left text-sm">
      Data yang dimasukan berikut sudah benar?<br><br>
      Nama Produk: ${transaction.product_name}<br>
      Kuantitas: ${fixedNumberFormat(transaction.quantity)}<br>
      Harga: ${rupiah(transaction.product_price)}<br>
      Total Pembayaran: ${rupiah(transaction.payment_amount)}<br>
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
        let serializedRequest = JSON.stringify(transaction)

        $fetch(`${config.public.BASE_URL}/api/transactions`, {
          method: 'POST',
          credentials: 'omit',
          headers: {
            Authorization: `Bearer ${JSON.parse(bearerToken.value)}`,
            'Accept': 'application/json'
          },
          body: serializedRequest
        })
          .then(response => {
            isLoadingTransactions.value = true
            transactionsModal.value.create = false
            searchTransactions.value.successCreateTransaction = true

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

  const selectTransactions = async (
    search_name = ''
  ) => {
    await $fetch('/api/transaction/select?search_name=' + search_name)
      .then(response => {
        transactionSelected.value = response.data.data;
      })
      .catch(error => {
        transactionSelected.value = error.response._data.data;
      })
  }

  return {
    transactions,
    transaction,
    getTransactions,
    getTransaction,
    storeTransaction,
    validationErrors,
    isLoading,
    isLoadingTransactions,
    isLoadingTransaction,
    selectTransactions,
    transactionSelected,
    searchGlobal, searchPeriodeAt, orderColumn, orderDirection, searchPerPage, pageNumber, rupiah, fixedNumberFormat, rupiahNumberInputFormat, pcsNumberFormatIntegerInputFormat
  }
}