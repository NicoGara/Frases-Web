document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos del DOM
  const loginForm = document.getElementById("login-form");

  // Manejar envío del formulario de login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulario de inicio de sesión enviado");

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    const json = JSON.stringify(data);
    console.log(json);

    fetch("http://localhost:3000/login", {
      method: "POST",
      body: json,
      headers: { "Content-type": "application/json; charset=utf-8" },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (data.username && data.password) {
            // Guardar datos del usuario en el localStorage
            if (!localStorage.getItem("username") || !localStorage.getItem("password")) {              
              localStorage.setItem("username", data.username);
              localStorage.setItem("password", data.password);
              console.log("Datos del usuario guardados en localStorage");
            }
          }

          if (data.redirect) {
            window.location.href = data.redirect;
          }

        });
        // Redirigir o mostrar mensaje de éxito
      } else {
        console.log("Error en el inicio de sesión");
        // Mostrar mensaje de error
      }
    });
  });
});




