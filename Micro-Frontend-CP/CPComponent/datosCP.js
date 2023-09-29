class DatosCP extends HTMLElement {
  #urlService = "http://localhost:3000/codigospostales/";
  #urlCodigoPostal = this.#urlService + "cp/";

  constructor() {
    super();
  }

  connectedCallback() {
    //const codigoPostal = this.getAttribute("codigoPostal");
    this.attachShadow({ mode: "open" });
    this.#render();
    //this.#validarCodigoPostal();
    //this.#getCodigoPostal();
    this.#pushBoton();
    this.#agregaEstilo();
  }

  #render() {
    this.shadowRoot.innerHTML +=
    
    `

<div class="container">
<div class="form-row d-flex justify-content-start">
    <div class="col-md-4 mb-3">
        <div>
            <label>Ingrese el codigo postal</label>
            <br>
        </div>
        <div class="d-flex justify-content-between">
            <div>
                <input type="text" pattern="[0-9]{5} placeholder="Ingrese codigo postal" maxlength="5"
                    class="codigoPostal border border-danger btn btn-light border"id="codigoPostal" name="codigoPostal"
                    style="height: 40px" >

            </div>

            <div>
                <button id="buscador" name="buscador" class="buscador"
                    style="margin-bottom: 20px;"><img src="./CPComponent/img/lupa.png"
                        onclick="#validarCodigoPostal()" style="width: 22px" />
                    </button>
            </div>

        </div>


    </div>

</div>
</div>

<div class="container">

<div class="form-row">
    <div class="col-md-3 mb-3">
        <label id="palabra1">Estado </label>
        <br>
        <input id="estado" name="estado" type="text" readonly
            class="form-control border border-danger btn btn-light border">
    </div>
    <div class="col-md-3 mb-3">
        <label id="palabra2">Municipio </label>
        <input id="municipio" name="municipio" type="text" readonly
            class="form-control border border-danger btn btn-light border">
    </div>
</div>
<div class="form-row">
    <div class="col-md-3 mb-3">
        <label id="palabra3">Ciudad </label>
        <br>
        <input id="ciudad" name="ciudad" type="text" readonly readonly
            class="form-control border border-danger btn btn-light border">
    </div>
</div>

</div>
<div class="container">
<div class="form-row">
    <div class="col-md-9 mb-7">
        <label for="opciones" id="palabra4">Colonia</label>
        <br>

        <select id="cbColonias">
        <option value=""></option>
</section>

    </div>
</div>
</div>
</div>
`;

    // `
    //  <section>
    //  <label for="codigoPostal">Codigo Postal</label>
    //      <input id="codigoPostal">...</input>
    //      <label for="estado">Estado</label>
    //      <p id="estado">...</p>
    //      <label for="municipio">Municipio</label>
    //      <p id="municipio">...</p>
    //      <label for "ciudad">Ciudad</label>
    //      <p id="ciudad">...</p>
    //      <label for="colonia">Colonia</label>
    //       <select id="cbColonias">
    //           <option value="">Seleciona una opción</option>
    //   </section>

    //      `;
  }

  #getCodigoPostal() {




    let codigoPostal= this.#validarCodigoPostal();


    fetch(this.#urlCodigoPostal + codigoPostal)
      .then((response) => response.json())
      .then((datos) => {
        // let dato = this.shadowRoot.querySelector("#codigoPostal");
        // dato.innerHTML = datos.info.codigo_postal.codigo_postal;
        // dato = this.shadowRoot.querySelector("#estado");
        // dato.innerHTML = datos.info.estado.nombre_estado;
        // dato = this.shadowRoot.querySelector("#municipio");
        // dato.innerHTML = datos.info.municipio.nombre_municipio;
        // dato = this.shadowRoot.querySelector("#ciudad");
        // dato.innerHTML = datos.info.ciudad.nombre_ciudad;
        // dato = this.shadowRoot.querySelector("#colonia");
        // dato.innerHTML = this.#llenaColonias(datos.info.colonias);
        this.shadowRoot.getElementById("codigoPostal").value =  datos.info.codigo_postal.codigo_postal;
        //dato.innerHTML = datos.info.codigo_postal.codigo_postal;
        this.shadowRoot.getElementById("estado").value = datos.info.estado.nombre_estado;
        
        this.shadowRoot.getElementById("municipio").value = datos.info.municipio.nombre_municipio;
        
        this.shadowRoot.getElementById("ciudad").value = datos.info.ciudad.nombre_ciudad;

        let selectColonias = this.shadowRoot.getElementById("cbColonias");
        selectColonias.innerHTML = "";

        datos.info.colonias.forEach((colonia) => {
          let option = document.createElement("option");
          option.setAttribute("value", colonia.nombre_colonia);
          option.innerHTML = colonia.nombre_colonia;
          selectColonias.appendChild(option);
        });

        
         
        // let dato = this.shadowRoot.querySelector("#colonia");
        // dato.innerHTML = this.#llenaColonias(datos.info.colonias);
      });
  }

  // #llenaColonias(colonias) {
  //   let cbColonias = this.shadowRoot.querySelector("#cbColonias");
  //   colonias.forEach((colonia) => {
  //     let option = document.createElement("option");
  //     option.setAttribute("value", colonia.nombre_colonia);
  //     option.innerHTML = colonia.nombre_colonia;
  //     cbColonias.appendChild(option);
  //   });
  // }

  #agregaEstilo() {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
    );
    this.shadowRoot.appendChild(link);
  }

  #validarCodigoPostal() {
    let codigoPostal = this.shadowRoot.querySelector("#codigoPostal").value;
    if (codigoPostal.length == 5 && !isNaN(codigoPostal)) {
      return codigoPostal;
    } else {
      alert("El codigo postal debe de ser de 5 digitos");
    }



  }

  #pushBoton() {
    let boton = this.shadowRoot.querySelector("#buscador");
    boton.addEventListener("click", () => {
      this.#getCodigoPostal();
    });
  }
}
window.customElements.define("cp-info", DatosCP);
