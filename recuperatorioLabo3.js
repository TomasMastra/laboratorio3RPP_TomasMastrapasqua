var formulario = document.getElementById("formDatos");
var botonAgregar = document.getElementById("botonAgregar");
var table = document.getElementById("tablaPersonas");

var cadena = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica", "publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central", "publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500, "asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750, "asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25, "asesinatos":1}]';

// clase de persona
class Persona {
    id = 0;
    nombre;
    apellido;
    edad = 0;

    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString() {

    }
}

// clase de heroe
class Heroe extends Persona {
    alterEgo;
    ciudad = 0;
    publicado

    constructor(alterEgo, ciudad, publicado,  id, nombre, apellido, edad) {
        super(id, nombre, apellido, edad);
        this.alterEgo = alterEgo;
        this.publicado = publicado;
        this.ciudad = ciudad;
    }

   
}

// clase de villano
class Villano extends Persona {
    enemigo;
    robos = 1;
    asesinatos;

    constructor(enemigo, robos, asesinatos,  id, nombre, apellido, edad) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }

   
}

listaPersonas = toString(cadena);
cargarListaPersonas(listaPersonas);


console.log("\nPersonas:");
console.log(listaPersonas);

// convierte una cadena json a un string
function toString(cadenaDatos) {
    let arrayObjetos = JSON.parse(cadenaDatos);

    let personas = arrayObjetos.map(objeto => {
        if ('ciudad' in objeto) {
            let heroe = new Heroe(objeto.alterego, objeto.ciudad, objeto.publicado, objeto.id, objeto.nombre, objeto.apellido, objeto.edad);
            return heroe;
        } else if ('robos' in objeto && 'asesinatos' in objeto) {
            let villano = new Villano(objeto.enemigo, objeto.robos, objeto.asesinatos, objeto.id, objeto.nombre, objeto.apellido, objeto.edad);
            return villano;
        } else {
            return new Persona(objeto.id, objeto.nombre, objeto.apellido, objeto.edad);
        }
    });

    return personas;
}

function cargarListaPersonas(personas) {
    for (var i = 0; i < personas.length; i++) {

        tipo = obtenerTipo(personas[i]);
        cargarPersona(tipo, personas[i]);
    }
}


// genera una persona que se le pasa a la funcion que la carga a la tabla
function generarPersona() {

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = document.getElementById("edad").value;
    var alterEgo = document.getElementById("alterEgo").value;
    var ciudad = document.getElementById("ciudad").value;
    var publicado = document.getElementById("publicado").value;
    var enemigo = document.getElementById("enemigo").value;
    var robos = document.getElementById("robos").value;
    var asesinatos = document.getElementById("asesinatos").value;

    var id = generarId();

    let tipoPersona = document.getElementById("tipoPersona").value;

    if (tipoPersona === "heroe") {
        return new Heroe(alterEgo, ciudad, publicado, id, nombre, apellido, edad);
    } else {
        return new Villano(enemigo, robos, asesinatos, id,  nombre, apellido, edad);
    }

}


// se le pasa una persona y devuelve el tipo que le corresponde
function obtenerTipo(persona)
{
    if(persona.hasOwnProperty('asesinatos'))
    {
        return "villano";
    }else{
        return "heroe";
    }
}

// carga una persona a la tabla, valida que este todo ok
function cargarPersona(tipo, persona) {

    alta = document.getElementById("formAbm").getAttribute("index");
    if(alta == -1)
    {
        if(validar(tipo, persona) == true)
        {
            var newRow = table.insertRow(table.rows.length);

            var cellId = newRow.insertCell(0);
            var cellNombre = newRow.insertCell(1);
            var cellApellido = newRow.insertCell(2);
            var cellEdad = newRow.insertCell(3);
            var cellAlterEgo = newRow.insertCell(4);
            var cellCiudad = newRow.insertCell(5);
            var cellPublicado = newRow.insertCell(6);
            var cellEnemigo = newRow.insertCell(7);
            var cellRobos = newRow.insertCell(8);
            var cellAsesinatos = newRow.insertCell(9);

            cellId.innerHTML = persona.id;
            cellNombre.innerHTML = persona.nombre;
            cellApellido.innerHTML = persona.apellido;
            cellEdad.innerHTML = persona.edad;

            if (persona instanceof Heroe) {
                cellAlterEgo.innerHTML = persona.alterEgo || "-";
                cellCiudad.innerHTML = persona.ciudad || "-";
                cellPublicado.innerHTML = persona.publicado || "-";
                cellEnemigo.innerHTML = "-";
                cellRobos.innerHTML = "-";
                cellAsesinatos.innerHTML = "-";
            } else if (persona instanceof Villano) {
                cellAlterEgo.innerHTML = "-";
                cellCiudad.innerHTML = "-";
                cellPublicado.innerHTML = "-";
                cellEnemigo.innerHTML = persona.enemigo || "-";
                cellRobos.innerHTML = persona.robos || "-";
                cellAsesinatos.innerHTML = persona.asesinatos || "-";
            } else {
                cellAlterEgo.innerHTML = "-";
                cellCiudad.innerHTML = "-";
                cellPublicado.innerHTML = "-";
                cellEnemigo.innerHTML = "-";
                cellRobos.innerHTML = "-";
                cellAsesinatos.innerHTML = "-";
            }
        }else{
            alert("Hubo un error, verifique los datos e intente mas tarde");
        }
    }else{
        alert("No puede dar de alta, solo modificar o eliminar");
    }
}
    
// modifica la persona de listaPersonas en una posicion que se le pasa previamente por parametro
function modificarPersona(index, nombre, apellido, edad, nuevaAltMax, nuevaAutonomia, nuevaCantPue, nuevaCantRue) {
    if (index >= 0 && index < listaPersonas.length) {
        listaPersonas[index].nombre = nombre;
        listaPersonas[index].apellido = apellido;
        listaPersonas[index].edad = edad;

        if (listaPersonas[index] instanceof Heroe) {
            listaPersonas[index].alterEgo = nuevaAltMax;
            listaPersonas[index].ciudad = nuevaAutonomia;
            listaPersonas[index].publicado = nuevaCantPue;
        } else if (listaPersonas[index] instanceof Villano) {
            listaPersonas[index].enemigo = nuevaCantRue;
            listaPersonas[index].robos = nuevaAutonomia;
            listaPersonas[index].asesinatos = nuevaAltMax;
        }

        console.log("Persona modificada:", listaPersonas[index].nombre);
    } else {
        alert("Hubo un error con la modificacion, intentelo nuevamente");
    }
}

// actualiza los campos de la tabla de personas
function actualizarCampos(tipoPersona) {
    var alterEgoInput = document.getElementById("alterEgo");
    var ciudadInput = document.getElementById("ciudad");
    var publicadoInput = document.getElementById("publicado");
    var enemigoInput = document.getElementById("enemigo");
    var robosInput = document.getElementById("robos");
    var asesinatosInput = document.getElementById("asesinatos");

    alterEgoInput.disabled = false;
    ciudadInput.disabled = false;
    publicadoInput.disabled = false;
    enemigoInput.disabled = false;
    robosInput.disabled = false;
    asesinatosInput.disabled = false;

    alterEgoInput.value = "";
    ciudadInput.value = "";
    publicadoInput.value = "";
    enemigoInput.value = "";
    robosInput.value = "";
    asesinatosInput.value = "";

    alterEgoInput.style.display = 'none';
    ciudadInput.style.display = 'none';
    publicadoInput.style.display = 'none';
    enemigoInput.style.display = 'none';
    robosInput.style.display = 'none';
    asesinatosInput.style.display = 'none';

    if (tipoPersona === "heroe") {
        alterEgoInput.style.display = 'block';
        ciudadInput.style.display = 'block';
        publicadoInput.style.display = 'block';
    
    
    } else if (tipoPersona === "villano") {
        enemigoInput.style.display = 'block';
        robosInput.style.display = 'block';
        asesinatosInput.style.display = 'block';
    }
    
}

// busca una persona por id mediante un for
function buscarPersona(id) {
    for (var i = 0; i < listaPersonas.length; i++) {
        if (listaPersonas[i].id == id) {
            return true;
        }
    }
    return false;
}

// valida todo lo pedido en el ejercicio, que se ingresen datos y sus respectivas validaciones para cada atributo
// no verifico edad <100 porque quizas algun heroe/villano es inmortal 
function validar(tipoPersona, persona) {
    if (persona.nombre !== "" && persona.apellido !== "" && persona.edad !== "" && persona.edad > -1) {
        if (tipoPersona === "heroe") {
            if (persona.alterEgo !== "" && persona.ciudad !== "" && persona.publicado !== "" && persona.publicado > 1940) {
                return true;
            }
        } else if (tipoPersona === "villano") {
            if (persona.enemigo !== "" && persona.robos !== "" && persona.asesinatos !== "" && persona.robos > 0 && persona.asesinatos > 0) {
                return true;
            }
        }
    }
    return false;
}

// recorre la lista de personas y calcula el promedio
function calcularEdadPromedio() {
    var table = document.getElementById("tablaPersonas");
    var filas = table.rows.length;
    var sumaEdades = 0;

    for (var i = 1; i < filas; i++) {
        var celdaEdad = parseInt(table.rows[i].cells[3].innerText);

        if (!isNaN(celdaEdad)) {
            sumaEdades += celdaEdad;
        }
    }

    var cantidadFilasValidas = filas - 1; // Restar 1 para excluir la fila de encabezado
    var edadPromedio = cantidadFilasValidas > 0 ? sumaEdades / cantidadFilasValidas : 0;

    var textEdadPromedio = document.getElementById("promedio");
    textEdadPromedio.value = edadPromedio.toFixed(2); // Mostrar el promedio con dos decimales

    return edadPromedio;
}

// Actualiza la tabla dependiendo del filtro que se elija previamente
function cambiarFiltro() {
    var filtro = document.getElementById("filtroPersona").value;

    if (filtro === "Heroe") {
        vaciarTable();
        cargarListaPersonas(listaHeroes);
    } else if (filtro === "Villano") {
        vaciarTable();
        cargarListaPersonas(listaVillanos);
    } else {
        vaciarTable();
        cargarListaPersonas(listaPersonas);
    }
}

// Vacia la tabla antes de actualizarla
function vaciarTable() {
    var tabla = document.getElementById("tablaPersonas");
    var filas = tabla.rows.length;

    for (var i = filas - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
}

// Busca un ID nuevo, que no se repita
function generarId() {
    var id = table.rows.length - 1; 
    var filas = table.rows.length;

    for (var i = filas - 1; i > 0; i--) {
        if (id == table.rows[i].cells[0].innerText) {
            id++;
            break;
        }
    }

    return id;
}


function cargarPersonas() {
    for (var i = 0; i < listaPersonas.length; i++) {
        if (listaPersonas[i] instanceof Villano) {
            listaVillanos.push(listaPersonas[i]);
        } else if (listaPersonas[i] instanceof Heroe) {
            listaHeroes.push(listaPersonas[i]);
        }
    }
}

// Elimina el elemento de la posición index
function eliminarPersona(index) {
    if (index > -1) {
        listaPersonas.splice(index, 1);
    }
}

// Carga una lista nueva
function obtenerListaPersonas(personas) {
    if (personas) {
        listaPersonas = [];

        Array.prototype.push.apply(listaPersonas, personas);
    }
}
