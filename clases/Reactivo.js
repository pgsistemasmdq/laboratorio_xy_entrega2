class Reactivo {
    constructor(codigo, descripcion, proveedor, stock, conservarCamara, fecha) {
        // Validación para evitar error si algún parámetro es undefined
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
        this.stock = stock;
        this.conservarCamara = conservarCamara;
        this.fecha = fecha;
    }

    toString() {
        return `${this.descripcion} (${this.codigo}) - Stock actual ${this.stock}`;
    }

    // Método para agregar reactivos, gestionado desde un contexto global
    agregarReactivo(codigo, descripcion, proveedor, stock, conservarCamara, fecha) {
        // Validación de existencia de proveedor
        if (!sistema.proveedores.some(p => p.codigo === proveedor)) {
            alert(`El proveedor con código ${proveedor} no existe.`);
            return;
        }

        // Validación si el reactivo ya existe
        if (sistema.reactivos.some(reactivo => reactivo.codigo === codigo)) {
            alert(`Ya existe un reactivo con el código: ${codigo}`);
            return;
        }

        const nuevoReactivo = new Reactivo(codigo, descripcion, proveedor, stock, conservarCamara, fecha);
        sistema.reactivos.push(nuevoReactivo);
    }


    
    listarReactivos() {
        return sistema.reactivos.map(reactivo => {
            const proveedor = sistema.proveedores.find(p => p.codigo === reactivo.proveedor);
            const razonSocial = proveedor ? proveedor.razonSocial : "Proveedor no encontrado";
            return `Reactivo: ${reactivo.descripcion} (${reactivo.codigo}), Proveedor: ${razonSocial}, Stock: ${reactivo.stock}, Fecha: ${reactivo.fecha}`;
        }).join("\n");
    }

    
    obtenerStock() {
        return `Stock actual: ${this.stock}`;
    }
}

function agregarReactivoIngreso() {
    const codigo = IngresarReactivo();
    if (!codigo) return;

    const descripcion = IngresarDescripcion();
    if (!descripcion) return;

    const proveedor = IngresarProveedor();
    if (!proveedor) return;

    const stock = prompt("Ingrese el stock inicial del reactivo (o 0 para cancelar):");
    if (stock === "0") return;
    if (!Number.isInteger(parseInt(stock)) || parseInt(stock) <= 0) {
        alert("El stock debe ser un número entero mayor a 0. Intente nuevamente.");
        return;
    }

    const conservarCamara = confirm("¿Se debe conservar en cámara frigorífica?");
    const fecha = new Date().toISOString().split("T")[0];

    try {
        const reactivo = new Reactivo();
        reactivo.agregarReactivo(codigo, descripcion.trim(), proveedor, parseInt(stock), conservarCamara, fecha);
        alert("Reactivo agregado exitosamente.");
    } catch (error) {
        alert("Error al agregar el reactivo: " + error.message);
    }
}

function IngresarProveedor() {
    while (true) {
        const codigo = prompt("Ingrese el código del proveedor (o 0 para cancelar):");
        if (codigo === "0") {
            alert("Cancelando el registro del proveedor...");
            return null; 
        }
        if (!codigo.trim() || isNaN(codigo)) {
            alert("El código del proveedor debe ser un número no vacío. Intente nuevamente.");
            continue;
        }

        const codigoNumerico = parseInt(codigo.trim());

        const proveedorExiste = sistema.proveedores.some(p => p.codigo === codigoNumerico);
        if (!proveedorExiste) {
            alert(`El proveedor con código "${codigoNumerico}" NO existe. Por favor, ingrese un código diferente.`);
            continue;
        }

        return codigoNumerico;
    }
}

function IngresarReactivo() {
    while (true) {
        const codigo = prompt("Ingrese el código del reactivo (o 0 para cancelar):");

        if (codigo === "0") {
            alert("Cancelando el registro del reactivo...");
            return null; 
        }

        if (!codigo || isNaN(codigo.trim())) {
            alert("El código del reactivo debe ser un número no vacío. Intente nuevamente.");
            continue;
        }
 
        const codigoNumerico = parseInt(codigo.trim(), 10);
 
        const reactivoExiste = sistema.reactivos.some(r => r.codigo === codigoNumerico);
        if (reactivoExiste) {
            alert(`El reactivo con código "${codigoNumerico}" ya existe. Ingrese un código diferente.`);
            continue;
        }

        return codigoNumerico;
    }
}

function IngresarDescripcion() {
    while (true) {
        const descripcion = prompt("Ingrese descripcion del reactivo (o 0 para cancelar):");
        if (descripcion === "0") {
            alert("Cancelando el registro del proveedor...");
            return null; 
        }
        if (!descripcion.trim()) {
            alert("La Descripcion no puede estar vacía. Intente nuevamente.");
            continue;
        }
        return descripcion.trim(); 
    }
}


function eliminarReactivo() {
    const codigo = prompt("Ingrese el código del reactivo que desea eliminar (o 0 para cancelar):");
    if (codigo === "0") {
        alert("Operación cancelada.");
        return;
    }

    const codigoNumerico = parseInt(codigo.trim(), 10);
    const index = sistema.reactivos.findIndex(r => r.codigo === codigoNumerico);

    if (index === -1) {
        alert(`No se encontró ningún reactivo con el código ${codigoNumerico}.`);
        return;
    }

    const confirmacion = confirm(`¿Está seguro de que desea eliminar el reactivo con código ${codigoNumerico}?`);
    if (confirmacion) {
        sistema.reactivos.splice(index, 1);
        alert("Reactivo eliminado exitosamente.");
    } else {
        alert("Operación cancelada.");
    }
}

// Función para modificar un reactivo
function modificarReactivo() {
    const codigo = prompt("Ingrese el código del reactivo que desea modificar (o 0 para cancelar):");
    if (codigo === "0") {
        alert("Operación cancelada.");
        return;
    }

    const codigoNumerico = parseInt(codigo.trim(), 10);
    const reactivo = sistema.reactivos.find(r => r.codigo === codigoNumerico);

    if (!reactivo) {
        alert(`No se encontró ningún reactivo con el código ${codigoNumerico}.`);
        return;
    }

    alert("Deje el campo vacío si no desea modificar un valor.");
    const nuevaDescripcion = prompt(`Descripción actual: ${reactivo.descripcion}\nIngrese nueva descripción:`);
    const nuevoProveedor = prompt(`Proveedor actual: ${reactivo.proveedor}\nIngrese nuevo proveedor (número):`);
    const nuevoStock = prompt(`Stock actual: ${reactivo.stock}\nIngrese nuevo stock:`);
    const nuevaConservacion = confirm("¿Debe conservarse en cámara frigorífica?");

    // Actualización de valores
    if (nuevaDescripcion.trim()) reactivo.descripcion = nuevaDescripcion.trim();
    if (nuevoProveedor.trim() && !isNaN(nuevoProveedor)) reactivo.proveedor = parseInt(nuevoProveedor.trim(), 10);
    if (nuevoStock.trim() && !isNaN(nuevoStock)) reactivo.stock = parseInt(nuevoStock.trim(), 10);
    reactivo.conservarCamara = nuevaConservacion;

    alert("Reactivo modificado exitosamente.");
}
