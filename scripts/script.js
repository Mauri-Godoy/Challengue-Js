let app = new Vue({
  el: "#app",
  data: {
    objects: [],
    totalObj: [],
    buscador: "",
    carrito: [],
    total: 0,
  },
  computed: {
    filterObjects() {
      return this.objects.filter((element) => {
        if (element.nombre) {
          var nombre = element.nombre.toLowerCase();
          var buscado = this.buscador.toLowerCase();
          if (nombre.includes(buscado)) {
            return element;
          }
        }
      });
    },
  },
  methods: {
    enviarMensaje: function () {
      let comentarios = document.querySelector("#comentarios");
      let name = document.querySelector("#name");
      let last_name = document.querySelector("#last_name");

      if (comentarios.value) {
        swal("Bien ahí pa", "Su mensaje ha sido enviado con exito!", "success");
        comentarios.value = "";
        name.value = "";
        last_name.value = "";
      } else {
        swal("Oops!", "Ingresa un comentario campeón!", "error");
      }
    },
    comprar() {
      swal("Genial!", "Gracias por su compra :)", "success");
      this.carrito = [];
      this.total = 0;
    },
    vaciar() {
      this.carrito = [];
      this.total = 0;
      fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          app.objects = data.response;
          //app.totalObj = data.response;
          console.log(app.objects);
        });
    }
  },
});

fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    app.objects = data.response;
    app.totalObj = data.response;
    console.log(app.objects);
  })
  .catch((error) => console.error("Error:", error))
  .finally(() => {
    document.querySelector("#cargando").style.display = "none";
    // document.querySelector("#divider").style.display = "none";
    document.querySelector(".farmacia-banner").style.display = "block";
    document.querySelector(".jugueteria-banner").style.display = "block";
  });



// function del toggle *hacerla con vue
const navToggle = document.querySelector(".toggle");
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible")
})
