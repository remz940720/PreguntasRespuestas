document.addEventListener('DOMContentLoaded', function () {
    const categoriasContainer = document.getElementById('categorias');
    const respuestasContainer = document.getElementById('respuestas');

    function obtenerRespuesta(valorBuscado) {
        fetch('./JSON/facilitador/respuestas_facilitador_plataforma.json')
            .then(response => response.json())
            .then(respuestas => {
                let resp = respuestas.respuestas.find(function (respuesta) {
                    return respuesta.id === valorBuscado;
                });
                if (resp === undefined) {
                    console.log("Elemento no encontrado");
                }
                respuestasContainer.innerHTML = `<p class="resp">Respuesta: ${resp.respuesta}</p>`;
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetch('./JSON/facilitador/categorias_facilitador.json')
        .then(response => response.json())
        .then(categorias => {
            // Fetch para obtener las preguntas
            fetch('./JSON/facilitador/preguntas_facilitador_plataforma.json')
                .then(response => response.json())
                .then(preguntas => {
                    // Combinar categorías y preguntas
                    categorias.categorias.forEach(categoria => {
                        const categoriaElement = document.createElement('div');
                        categoriaElement.classList.add('categoria');
                        categoriaElement.innerHTML = `<h3 id="${categoria.nombre}">${categoria.nombre}</h3>`;

                        const preguntasCategoria = preguntas.preguntas.filter(pregunta => pregunta.id_categoria === categoria.id);

                        const opcionesElement = document.createElement('div');
                        opcionesElement.classList.add('categoria-options');

                        preguntasCategoria.forEach(pregunta => {
                            const opcionItem = document.createElement('p');
                            opcionItem.classList.add(`${pregunta.id}`)

                            opcionItem.innerHTML = `${pregunta.pregunta}`;

                            opcionesElement.appendChild(opcionItem);
                            categoriaElement.appendChild(opcionesElement);
                            categoriasContainer.appendChild(categoriaElement);
                        });
                        document.getElementById(`${categoria.nombre}`).addEventListener('click', function () {
                            opcionesElement.classList.toggle('visible');
                        });
                        $("p").on("click", function () {
                            //Realizar la busqueda
                            obtenerRespuesta(this.className);
                        });
                    });
                })
                .catch(error => console.error('Error al obtener las preguntas:', error));
        })
        .catch(error => console.error('Error al obtener las categorías:', error));

    
});