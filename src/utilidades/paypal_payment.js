let userData = {
    userID: null,
    total: null,
    currentURL: null
  };
  
  module.exports = {
    setUserData: (id, total, currentURL) => {
      userData.userID = id;
      userData.total = total;
      userData.currentURL = currentURL;
      console.log("userData.userID", userData.userID)
      console.log("userData.total", userData.total)
      console.log("userData.currentURL", userData.currentURL)
    },
    getUserData: () => {
      return userData;
    }
  };