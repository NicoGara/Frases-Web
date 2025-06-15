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
      console.log(response);
      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        // Redirigir o mostrar mensaje de éxito
      } else {
        console.log("Error en el inicio de sesión");
        // Mostrar mensaje de error
      }
    });
  });
});
