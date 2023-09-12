export class Post extends HTMLElement {
    #codigoPostalPromovente = null;
    #buscador = null;
    #mostrarText = null;
    //set get
    #seleccionColonia = null;
    #estadoAutomtico = null;
    #municipioAutomatico = null;
    #ciudadAutomatico = null;
    #textOtros = null;

    #comboColonia = null;

    #path = "/postCodigoPostal/CP.html";

    #html = null;

    constructor() {
        super();
        
        this.#getHtml();

    }

    #getHtml() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.#path, false);
        xhr.onload =  (e) =>{
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                   this.#html=xhr.responseText;
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }

    connectedCallback() {

        const shadow = this.attachShadow({mode: "open"});
        this.#agregaEstilo(shadow);
        this.#render(shadow);
        this.#codigoPostalPromovente = shadow.getElementById("codigoPostal"); //tambien get y set
        this.#codigoPostalPromovente.oninput = () => this.#validarCodigoPostal();
        this.#buscador = shadow.getElementById("buscador"); // OBTENGO EL BOTON ESPECIFICO CON EL ID DE ESE BOTON
        this.#buscador.onclick = () => this.#consultarDatosCodigoPostal(); //LE DOY LA FUNCIÓN QUE NECESITA HACER ESE BOTON EN ESPECIFICO
        this.#mostrarText = this.shadowRoot.getElementById("cbColonia");
        this.#mostrarText.onchange = () => this.#mostrarCampoTexto();



        //set get
        this.#seleccionColonia = this.shadowRoot.querySelector("#cbColonia");
        this.#estadoAutomtico = this.shadowRoot.querySelector("#txtEstado");
        this.#municipioAutomatico = this.shadowRoot.querySelector('#txtMunicipio');
        this.#ciudadAutomatico = this.shadowRoot.querySelector("#txtCiudad");
        this.#textOtros = this.shadowRoot.querySelector("#otros");

        this.#comboColonia = this.shadowRoot.querySelector("#cbColonia");


    }
    #render(shadow) {
        shadow.innerHTML += this.#html;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./postCodigoPostal/css/post.css");
        shadow.appendChild(link);
    }

    #promoventeColonia(colonias) {
        var selectColonia = this.shadowRoot.getElementById("coloniasPromovente");
        //var option = this.shadowRoot.createElement("option");
        var option = document.createElement("option");

        colonias.forEach(function (colonia) {
            option = this.shadowRoot.createElement("option");
            option.value = colonia.id;
            option.text = colonia.descripcion;
            selectColonia.add(option);
        });
    }

    #validarCodigoPostal() {
        var codigoPostal = this.#codigoPostalPromovente.value;

        // Validar que solo se ingresen números
        var regex = /^[0-9]+$/;
        if (!regex.test(codigoPostal)) {
            //codigoPostal.value = "";
            var valorIngresado = codigoPostal;
            this.#codigoPostalPromovente.value = "";
            alert("Solo se permiten números en el campo del código postal.\nValor ingresado: " + valorIngresado);
        }
    }

    #consultarDatosCodigoPostal() {
      this.#validarCodigoPostal();
  
      var codigo = this.#codigoPostalPromovente.value;
      //'/ConsejeriaRestFul/webresources/CodigoPostal/
      fetch('/webresources/CodigoPostal/'+codigo, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( response => {
             //200
             if(response.status === 200)
              return response.json();
             else
              throw "ERROR AL CONSULTAR EL SERVICIO";
          }).then(data => {
          if (data) {
            // Si se encontraron datos, llenar los campos
            var estado = data.estado;
            var municipio = data.municipio;
            var ciudad = data.ciudad;
  
            this.shadowRoot.getElementById("txtEstado" ).value = estado;
            this.shadowRoot.getElementById("txtMunicipio" ).value = municipio;
            this.shadowRoot.getElementById("txtCiudad" ).value = ciudad;
  
            // Actualizar opciones del combo de colonias
            var coloniasPromovente = this.shadowRoot.getElementById("cbColonia");
            coloniasPromovente.innerHTML = ""; // Limpiar opciones actuales
  
          
            var optionSeleccionar = document.createElement("option");
            optionSeleccionar.value = "";
            optionSeleccionar.textContent = "SELECCIONAR COLONIA";
            optionSeleccionar.disabled = true;
            optionSeleccionar.selected = true;
            coloniasPromovente.appendChild(optionSeleccionar);
  
            // Obtener las colonias del resultado y agregarlas como opciones
            var colonias = data.colonias.map(item => item);
  
            // Agregar opciones al combo
            colonias.forEach(colonia => {
              var option = document.createElement("option");
              option.value = colonia;
              option.textContent = colonia;
              coloniasPromovente.appendChild(option);
            });
  
            // Agregar opción "Otro..."
            var optionOtro = document.createElement("option");
            optionOtro.value = "otro";
            optionOtro.textContent = "Otro...";
            coloniasPromovente.appendChild(optionOtro);
  
            coloniasPromovente.appendChild(optionOtro);
          } else {
            alert("No se encontraron resultados para el código postal ingresado.");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert(error);
        });
    }
    #mostrarCampoTexto() {
        var combo = this.shadowRoot.getElementById("cbColonia");
        var campoTexto = this.shadowRoot.getElementById("otros");

        if (combo && campoTexto) {
            if (combo.value === "otro") {
                campoTexto.style.display = "block";
                
                campoTexto.value = "";
                
            } else {
                campoTexto.style.display = "none";
            }
        }
    }

    /******************************************* */
    static get observedAttributes() {
        return ['txtCodigoPostal', 'selectColonia', 'estado', 'municipio', 'ciudad', 'txtOtro'];
    }

    get txtCodigoPostal() {
        return this.#codigoPostalPromovente.value;
    }

    set txtCodigoPostal(codigoP) {
        this.#codigoPostalPromovente.value = codigoP;
    }

    get selectColonia() {
        return this.#seleccionColonia.value;
    }

    set selectColonia(colonia) {
        this.#seleccionColonia.value = colonia;
        /* var colonia = colonia;
        var nuevaColonia = document.createElement("option");

        var combo = this.#comboColonia;

        combo.options.add(nuevaColonia, colonia);

        nuevaColonia.value;
        nuevaColonia.text;

        combo.options.remove(1);
         ubicar el combo 
         var cp = document.getElementById("codigoPostalDemandado")
         var nuevo = cp.selectColonia
         var nuevo2 = document.createElement("option")
         
         cp.appendChild(nuevo2)
         cp.selectColonia = nuevo2
         
         var combo = cp.shadowRoot.querySelector("#cbColonia")
         
         cp.selectColonia = combo.options.add(nuevo2, nuevo)
         
         nuevo2.value= "option-1"
         nuevo2.text = "Nueva opcion de colonia"
         
         combo.options.remove(1)
         
         cp.selectColonia = nuevo2
         */
    }

    get estado() {
        return this.#estadoAutomtico.value;
    }

    set estado(estado) {
        this.#estadoAutomtico.value = estado;
    }

    get municipio() {
        return this.#municipioAutomatico.value;
    }

    set municipio(municipio) {
        this.#municipioAutomatico.value = municipio;
    }

    get ciudad() {
        return this.#ciudadAutomatico.value;
    }

    set ciudad(ciudad) {
        this.#ciudadAutomatico.value = ciudad;
    }

    get txtOtro() {
        return this.#textOtros.value;
    }

    set txtOtro(otro) {
        this.#textOtros.value = otro;
    }
}