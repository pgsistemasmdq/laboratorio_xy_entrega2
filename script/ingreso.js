
let codigo = "";
let descripcion ="";
let lote ="";
let cantidad = "";


let fechaActual = new Date();
let formatoFecha = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
}
).format(fechaActual);

let ingreso_acumulados = "";
do {
    codigo = prompt("Ingrese el codigo de Reactivo: [FIN o fin] para salir")
    if (codigo.toUpperCase() != "FIN")
    {
        descripcion = prompt("Ingrese el nombre del Reactivo:").toUpperCase();
        lote = prompt("Ingrese el LOTE del Reactivo:")
        cantidad="";
        while (isNaN(cantidad) || cantidad === "") {
            cantidad = parseInt(prompt("Ingrese el cantidad del Reactivo (solo numeros):","1"))
            if (isNaN(cantidad) || cantidad === "")
            {
                alert("El valor ingresdo no es numerico. Intente de nuevo")
            }
        }

        alert("Información del Reactivo ingresado:\n " +
            "Codigo......: " + codigo + "\n" + 
            "Descripción.: " + descripcion.toUpperCase() + "\n" + 
            "Lote........: " + lote  + "\n" +
            "Cantidad....: " + cantidad.toString() + "\n" + 
            "(A continuación por consola se mostraran los rotulos identificatorios de cada reactivo");
            for (let i = 1; i < cantidad; i++)
            {
                console.log("------------------------\n" +
                    "Cod  :" + codigo + "\n" +
                    "Lote : " + lote + "\n" +
                    "Fecha: " + formatoFecha.toString() + "\n" +
                    "Orden: " + i.toString().padStart(3, '0') + "\n" +
                    "------------------------\n\n" 
                )
            }
            ingreso_acumulados = ingreso_acumulados + 
            "Codigo......: " + codigo + "\n" + 
            "Descripción.: " + descripcion.toUpperCase() + "\n" + 
            "Lote........: " + lote  + "\n" +
            "Cantidad....: " + cantidad.toString() + "\n" + 
            "<---------------------------------->" + "\n" 

    }
} while (codigo.toUpperCase() != "FIN")

if (ingreso_acumulados.trim().length>0)
{
    alert("LOS INGRESO DEL DIA " + formatoFecha.toString() + " FUERON : \n" + ingreso_acumulados);
}
else
{
    alert("No se ingresaron reactivos");
}

