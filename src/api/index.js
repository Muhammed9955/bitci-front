import Axios from "axios";

import emitter, { EVENTS } from "./emitter";

const axios = Axios.create({
  // baseURL: '/api/',
  baseURL: "https://exchange-demo2.bigdatalabs.io/api/",
});

const catchHandlerCreator = (data) => (error) => {
  if (error.response && error.response.status === 401) {
    emitter.emit(EVENTS.TOKEN_EXPIRED);
  }

  return data;
};

const genFormDataWithFiles = (files) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("file", file));

  return formData;
};

const genFormDataWithFilesMap = (filesMap) => {
  const formData = new FormData();

  Object.keys(filesMap).forEach((key) => formData.append(key, filesMap[key]));

  return formData;
};
//new APIs
export const getProfitLoss = () =>
  axios
    .get("/getprofitloss")
    .then(({ data: pairs }) => pairs)
    .catch(catchHandlerCreator([]));

    // old APIs
export const getPairs = () =>
  axios
    .get("/pairs")
    .then(({ data: pairs }) => pairs)
    .catch(catchHandlerCreator([]));

export const getBalances = () =>
  axios
    .get("/balances")
    .then(({ data: assets }) => (Array.isArray(assets) ? assets : []))
    .catch(catchHandlerCreator([]));

export const getTickerHistory = (pair, fromHour, interval, count) =>
  axios
    .get(`/ticker/${pair}/${fromHour}/${interval}/${count}`)
    .then(({ data: history }) => history)
    .catch(catchHandlerCreator([]));

export const getTickers = (fromHour, interval, count) =>
  axios
    .get(`/tickers/${fromHour}/${interval}/${count}`)
    .then(({ data: tickers }) => tickers)
    .catch(catchHandlerCreator([]));

export const getOrders = (pairName) =>
  axios
    .get("/orders", {
      params: { pair: pairName, t: Date.now() },
    })
    .then(({ data: orders }) => orders)
    .catch(catchHandlerCreator([]));

export const getWalletAddress = (currency) =>
  axios
    .get("/walletaddress", {
      params: { curr: currency },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator({}));

export const changePassword = (currPass, newPass, newPassRepeat) =>
  axios
    .post(
      "/prod/bittest-change",
      {
        password: currPass,
        newpassword: newPass,
        newpassword2: newPassRepeat,
      },
      {
        validateStatus: (status) => status <= 401,
      }
    )
    .then(({ data }) => data)
    .catch(() => ({ message: "Unknown error" }));

export const getF2ASecret = () =>
  axios
    .get("/prod/bittest-getotpsecret")
    .then(({ data }) => data.otpsecret)
    .catch(catchHandlerCreator(null));

export const sendF2AOtp = (otpKey) =>
  axios
    .post(
      "/prod/bittest-setotp",
      {
        otpkey: otpKey,
      },
      {
        validateStatus: (status) => status <= 401,
      }
    )
    .then(({ data }) => data)
    .catch(catchHandlerCreator({ message: "Unknown error" }));

export const getFavoritePairs = () =>
  axios
    .get("/getfavorites", {
      params: { t: Date.now() },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const addFavoritePair = (pairName) =>
  axios
    .get("/addfavorites", {
      params: { pair: pairName },
    })
    .then(() => true)
    .catch(catchHandlerCreator(false));

export const delFavoritePair = (pairName) =>
  axios
    .get("/removefavorites", {
      params: { pair: pairName },
    })
    .then(() => true)
    .catch(catchHandlerCreator(false));

export const logout = () =>
  axios
    .get("/prod/bittest-logout")
    .then(() => true)
    .catch(catchHandlerCreator(false));

export const getAccountInfo = () =>
  axios
    .get("/prod/bittest-accountinfo1")
    .then(({ data }) => data.accountinfo)
    .catch(catchHandlerCreator({}));

export const getRefereeCount = () =>
  axios
    .get("/refereeCount")
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getRefereeGain = () =>
  axios
    .get("/refereeGain")
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getBEMGain = () =>
  axios
    .get("/BEMGain")
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getDepositsHistory = (curr) =>
  axios
    .get("/deposits", {
      params: { curr },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const withdraw = (id, currency, address, amount, tag = null) =>
  axios
    .post("/withdrawalrequest", {
      amount: Number(amount),
      pk: id,
      currencytype: currency,
      toaddress: address,
      toaddresstag: tag,
    })
    .then(({ data }) => data.Result === "OK")
    .catch(catchHandlerCreator(false));

export const getUsers = () =>
  axios
    .get("/admin/users")
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getOrdersByUser = (userId) =>
  axios
    .get("/admin/orders", {
      params: { userId },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getTransactionsByUser = (userId) =>
  axios
    .get("/admin/txns", {
      params: { userId },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getDepositsByUser = (userId) =>
  axios
    .get("/admin/deposits", {
      params: { userId },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getWithdrawalsByUser = (userId) =>
  axios
    .get("/admin/withdrawals", {
      params: { userId },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getFundsByUser = (userId) =>
  axios
    .get("/admin/funds", {
      params: { userId },
    })
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getAllDeposits = () =>
  axios
    .get("/admin/alldeposits")
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getUploadedDocsByUser = (userId) =>
  axios
    .get(`/admin/listDocs/${userId}`)
    .then(({ data }) => data)
    .catch(catchHandlerCreator([]));

export const getUserIdByEmail = (email) =>
  axios
    .post(
      "/prod/bittest-getuserid",
      { email },
      { validateStatus: (status) => status <= 401 }
    )
    .then(({ data }) => data.userid || null)
    .catch(catchHandlerCreator(null));

export const setUserVerified = (userId, status) =>
  axios
    .post("/prod/bittest-setidverified", { userid: userId, idverified: status })
    .then(() => true)
    .catch(catchHandlerCreator(false));

export const uploadVerificationDocs = (filesMap) =>
  axios
    .post("/uploadVerificationDocs", genFormDataWithFilesMap(filesMap), {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => true)
    .catch(catchHandlerCreator(false));
