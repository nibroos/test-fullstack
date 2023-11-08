const required = (value, args, { field }) => {
  if (!value || value.length === 0) {
    return `${field} perlu diisi.`
  }

  return true
}

const requiredNum = (value, args, { field }) => {
  if (!value === 0) {
    return `${field} perlu diisi.`
  }

  return true
}

const min = (value, [limit], { field }) => {
  if (!value || !value.length) {
    return true
  }

  if (value.length < limit) {
    return `${field} minimal ada ${limit} karakter.`
  }

  return true
}

const max = (value, [limit], { field }) => {
  if (!value || !value.length) {
    return true
  }

  if (value.length > limit) {
    return `${field} tidak boleh lebih dari ${limit} karakter.`
  }

  return true
}

const createPassword = (value, [limit], { field }) => {
  if (value.match(/[A-Z]/) < limit) {
    return `${field} minimal ada ${limit} karakter huruf besar.`
  }
  if (value.match(/[a-z]/i) < limit) {
    return `${field} minimal ada ${limit} karakter huruf kecil.`
  }
  if (value.match(/[0-9]/) < limit) {
    return `${field} minimal ada ${limit} karakter angka.`
  }
  if (value.match(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < limit) {
    return `${field} minimal ada ${limit} karakter simbol unik, cth: !@#$%^&*()`
  }

  return true
}

const mail = (value, args, { field }) => {
  if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return `${field} harus berupa email yang valid.`
  }

  return true
}

const numeric = (value = '', args, { field }) => {
  if (!value.toString().match('^(?:[0-9]{16}|)$')) {
    return `${field} hanya berisi angka dan harus 16 digit angka.`
  }

  return true
}

const editPassword = (value, [limit], { field }) => {
  if (value.length > 0) {
    if (0 < value.length && value.length < 6) {
      return `${field} baru minimal ada 6 karakter.`
    }
    if (value.match(/[A-Z]/) < limit) {
      return `${field} minimal ada ${limit} karakter huruf besar.`
    }
    if (value.match(/[a-z]/i) < limit) {
      return `${field} minimal ada ${limit} karakter huruf kecil.`
    }
    if (value.match(/[0-9]/) < limit) {
      return `${field} minimal ada ${limit} karakter angka.`
    }
    if (value.match(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < limit) {
      return `${field} minimal ada ${limit} karakter simbol unik, cth: !@#$%^&*()`
    }
    return true
  }
  return true
}

const num = (value, args, { field }) => {
  if (!value.toString().match(/^\d*\.?\d*$/)) {
    return `${field} hanya berisi angka.`
  }

  return true
}

const maxNum = (value, [limit], { field }) => {
  if (!value) {
    return true
  }

  if (value > limit) {
    return `${field} tidak boleh lebih dari ${limit}.`
  }

  return true
}

const gt = (value, [limit], { field }) => {
  if (!value) {
    return true
  }

  if (value > limit) {
    return true
  } else {
    return `${field} harus lebih dari ${limit}.`
  }
}

const phoneStart = (value, [limit], { field }) => {
  let start = ["0", "62"]
  if (start.some(element => value.startsWith(element))) {
    return `${field} harus dimulai tanpa '0' atau '62'.`
  } else if (value === "6") {
    return `${field} harus dimulai tanpa '62'.`
  } else {
    return true
  }
}

export { required, min, max, createPassword, mail, numeric, editPassword, num, gt, maxNum, requiredNum, phoneStart }
