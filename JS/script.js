document.addEventListener('DOMContentLoaded', function () {
    const categoriasContainer = document.getElementById('categorias');
    const respuestasContainer = document.getElementById('respuestas');

    function obtenerRespuesta(valorBuscado) {
        fetch('./JSON/respuestas_estudiantes_plataforma.json')
            .then(response => response.json())
            .then(data => {
                let resp = data.respuestas.find(function(respuesta) {
                    return respuesta.id === valorBuscado;
                });
                if(resp === undefined){
                    console.log("Elemento no encontrado");
                }
            respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${resp.respuesta}</p>`;
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetch('./JSON/categorias_estudiantes_plataforma.json')
        .then(response => response.json())
        .then(data => {
            for (const categoria in data) {
                if (data.hasOwnProperty(categoria)) {
                    const categoriaElement = document.createElement('div');
                    categoriaElement.classList.add('categoria');
                    let categoriaMayus = categoria.toUpperCase();
                    let categoriaEspacios = categoriaMayus.replace(/\_/g, ' ');
                    categoriaElement.innerHTML = `<h3 id="${categoria}">${categoriaEspacios}</h3>`;

                    const opcionesElement = document.createElement('div');
                    opcionesElement.classList.add('categoria-options');

                    data[categoria].forEach(opcion => {
                        for (let index = 0; index < opcion.preguntas.length; index++) {
                            const opcionItem = document.createElement('p');
                            opcionItem.classList.add(`${opcion.id}${index+1}`)
                            opcionItem.textContent = opcion.preguntas[index];
                            opcionesElement.appendChild(opcionItem);
                        }
                    });
                    categoriaElement.appendChild(opcionesElement);
                    categoriasContainer.appendChild(categoriaElement);

                    document.getElementById(`${categoria}`).addEventListener('click', function () {
                        opcionesElement.classList.toggle('visible');
                    });
                }
            }

            $("p").on("click", function () {
                //Realizar la busqueda
                obtenerRespuesta(this.className);
            });

            $("h3").on("click", function () {
                //Realizar loa busqueda
                respuestasContainer.innerHTML = "";
                let autenticacion = document.getElementById("autenticación");
                let oferta_educativa = document.getElementById("oferta_educativa");
                let inscripciones = document.getElementById("inscripciones");
                let servicios_escolares = document.getElementById("servicios_escolares");
                let pagos = document.getElementById("pagos");
                let contacto_profesor = document.getElementById("contacto_profesor");
            });

            /*

            $(".AUT1").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                //const respuestaElement = document.createElement("div");
                //respuestaElement.classList.add("respuesta"); 
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.autenticación[0].respuestas[0]}</p>`;
                //respuestasContainer.appendChild(respuestaElement)
            });
            $(".AUT2").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.autenticación[0].respuestas[1]}</p>`;
            });
            $(".AUT3").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.autenticación[0].respuestas[2]}</p>`;
            });
            $(".OE1").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.oferta_educativa[0].respuestas[0]}</p>`;
            });
            $(".OE2").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.oferta_educativa[0].respuestas[1]}</p>`;
            });
            $(".OE3").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.oferta_educativa[0].respuestas[2]}</p>`;
            });
            $(".INS1").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.inscripciones[0].respuestas[0]}</p>`;
            });
            $(".INS2").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.inscripciones[0].respuestas[1]}</p>`;
            });
            $(".INS3").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.inscripciones[0].respuestas[2]}</p>`;
            });
            $(".SE1").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.servicios_escolares[0].respuestas[0]}</p>`;
            });
            $(".SE2").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.servicios_escolares[0].respuestas[1]}</p>`;
            });
            $(".SE3").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.servicios_escolares[0].respuestas[2]}</p>`;
            });
            $(".SE4").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.servicios_escolares[0].respuestas[3]}</p>`;
            });
            $(".SE5").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.servicios_escolares[0].respuestas[4]}</p>`;
            });
            $(".PA1").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.pagos[0].respuestas[0]}</p>`;
            });
            $(".PA2").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.pagos[0].respuestas[1]}</p>`;
            });
            $(".PA3").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.pagos[0].respuestas[2]}</p>`;
            });
            $(".CP1").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.contacto_profesor[0].respuestas[0]}</p>`;
            });
            $(".CP2").click(function () {
                // Acción a realizar cuando se hace clic en el botón
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${data.contacto_profesor[0].respuestas[1]}</p>`;
            });
            */
        })
        .catch(error => {
            console.error('Error al obtener las opciones:', error);
        });
});