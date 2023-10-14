function guardar() {

    let codigo_ = document.getElementById('codigo').value
    let nombre_ = document.getElementById('nombre').value
    let valor_ = document.getElementById('valor').value

    let data = { codigo:codigo_, nombre:nombre_, valor:valor_ }

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/e', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardar_empresa() {
    guardar()
        .then( (response) => {
            alert('Registro exitoso.')
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
}


function obtenerEmpresas(){
        fetch('/empresa')
            .then((response) => response.json())
            .then(data => {
                llenarSelectEmpresa(data);
            })
            .catch((error) => reject(`[error]: ${error}`));    
}


function llenarSelectEmpresa(data){
    const select = document.getElementById('empresas');
    data.array.forEach(element => {
        const option = document.createElement('option');
        option.text = element.nombre;
        option.value = element._id;
        select.appendChild(option);

    });
}

window.addEventListener('load', function(){
    obtenerEmpresas();
})
