function guardar() {

    let ruc_ = document.getElementById('ruc').value
    let cedula_ = document.getElementById('cedula').value
    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value
    let email_ = document.getElementById('email').value
    let domicilio_ = document.getElementById('domicilio').value
    let telefono_ = document.getElementById('telefono').value
    let empresas_ = document.getElementById('hfdempresas').value

    let data = 
        {
            ruc:ruc_,
            cedula:cedula_,
            nombre:nombre_,
            apellido:apellido_,
            email:email_,
            domicilio:domicilio_,
            telefono:telefono_,
            empresas:empresas_
        }
    

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/representante', request_options)
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

const API = 'http://localhost:3000/empresa'

async function obtenerEmpresas(){
   try{
    let response = await fetch(`${API}`)
    llenarSelectEmpresa(personaje( await response.json()))
   }catch(error){
    console.error(`[error]: ${error}`)
   }        
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
