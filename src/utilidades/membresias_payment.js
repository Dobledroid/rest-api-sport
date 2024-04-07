let userData = {
  userID: null,
  total: null,
  currentURL: null,
  tipoMembresiaID: null,
  correo: null
};

module.exports = {
  setUserData: (id, total, currentURL, tipoMembresiaID, correo) => {
    userData.userID = id;
    userData.total = total;
    userData.currentURL = currentURL;
    userData.tipoMembresiaID = tipoMembresiaID;
    userData.correo = correo;
    console.log("userData.userID", userData.userID)
    console.log("userData.total", userData.total)
    console.log("userData.currentURL", userData.currentURL)
    console.log("userData.tipoMembresiaID", userData.tipoMembresiaID)
    console.log("userData.correo", userData.correo)
  },
  getUserData: () => {
    return userData;
  }
};