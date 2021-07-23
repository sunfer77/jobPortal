const responseGoogle = (googleData) => {
  console.log(googleData);
  setAuthenticating(true);
  console.log(googleData);
  axios
    // .post("http://localhost:3001/jobSeeker/loginWithGoogle", {
    //   userName: googleData.Ys.Ve,
    //   googleID: googleData.Ys.xS,
    //   email: googleData.Ys.It,
    // })
    .post("https://job-app-react.herokuapp.com/jobSeeker/loginWithGoogle", {
      userName: googleData.Ys.Ve,
      googleID: googleData.Ys.xS,
      email: googleData.Ys.It,
    })
    .then((response) => {
      setUserData(response.data);
      setAuthenticating(false);
    })
    .catch((e) => {
      console.log(e);
      setAuthenticating(false);
    });
};
