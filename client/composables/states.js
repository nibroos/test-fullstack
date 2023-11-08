import moment from "moment";
const datetimeFormat = "YYYY-MM-DD HH:mm"

export const useUserProfile = () => useState(() => ({
  name: '',
  username: '',
  token: '',
}))

export const useToken = () => useState(() => ({}))

export const useUsersModal = () => useState(() => ({
  create: false,
  edit: false,
  show: false,
  id: Number,
  authProfile: false,
  authGroupSelect: false,
  authGroupManualSelect: false,
}))

export const useProductsModal = () => useState(() => ({
  create: false,
  edit: false,
  show: false,
  id: Number,
}))

export const useSearchProducts = () => useState(() => ({
  pageNumber: 1,
  searchPeriodeAt: [moment(new Date()).startOf('month').startOf('day').format(datetimeFormat), moment(new Date()).endOf('month').endOf('day').format(datetimeFormat)],
  searchGlobal: '',
  orderColumn: 'products.id',
  orderDirection: 'desc',
  searchPerPage: 5,
  successCreateProduct: false,
}))
