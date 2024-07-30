// LOGIN
async function login() {
    try {
      const emailField = document.getElementById("email");
      const passwordField = document.getElementById("password");
      const email = emailField.value;
      const password = passwordField.value;
  
      const res = await axios.post("https://09-api-node.vercel.app/auth", {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      axiosConfig.headers.authorization =
        "Bearer " + localStorage.getItem("token");
      // alert("Login realizado com sucesso!");
      location.href = "home.html";
    } catch (error) {
      alert("Login incorreto!" + error);
    }
  }