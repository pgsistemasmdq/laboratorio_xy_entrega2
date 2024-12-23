class Proveedor {

    constructor(codigo, razonSocial, telefono, mail) {
        this.codigo = codigo;
        this.razonSocial = razonSocial;
        this.telefono = telefono;
        this.mail = mail;
    }

    toString() {
        return `${this.razonSocial} (${this.codigo})`;
    }

    agregarProveedor(codigo, razonSocial, telefono, mail) {
        if (sistema.proveedores.some(p => p.codigo === codigo)) {
            throw new Error("El proveedor ya existe.");
        } else {
            sistema.proveedores.push(new Proveedor(codigo, razonSocial, telefono, mail));
        }
    }

    eliminarProveedor(codigo) {
        const index = sistema.proveedores.findIndex(proveedor => proveedor.codigo === codigo);
        if (index !== -1) {
            const usadoEnReactivo = sistema.reactivos.some(reactivo => reactivo.proveedor === codigo);
            if (usadoEnReactivo) {
                alert(`No se puede eliminar el proveedor ${codigo} porque está asociado a un reactivo.`);
                return false;
            }
            sistema.proveedores.splice(index, 1);
            return true;
        }
        return false;
    }

 

     
    listarProveedores() {
        return sistema.proveedores.map(proveedor => proveedor.toString()).join("\n");
    }

}


function controlCodigoProveedor() {
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

        const codigoNumerico = parseInt(codigo.trim(), 10);
 
        const proveedorExiste = sistema.proveedores.some(p => p.codigo === codigoNumerico)
        if (proveedorExiste) {
            alert(`El proveedor con código "${codigoNumerico}" ya existe. Por favor, ingrese un código diferente.`);
            continue;
        }
        return codigoNumerico; 
    }
}

function controlRazonSocial() {
    while (true) {
        const razonSocial = prompt("Ingrese la razón social del proveedor (o 0 para cancelar):");
        if (razonSocial === "0") {
            alert("Cancelando el registro del proveedor...");
            return null; 
        }
        if (!razonSocial.trim()) {
            alert("La razón social no puede estar vacía. Intente nuevamente.");
            continue;
        }
        return razonSocial.trim(); // Razón social válida
    }
}

function modificarProveedor() {
    
    const codigo = prompt("Ingrese el código del proveedor que desea modificar (o 0 para cancelar):");
    if (codigo === "0") {
        alert("Cancelando modificación...");
        return;
    }

    // Buscar el proveedor
    const proveedor = sistema.proveedores.find(p => p.codigo === codigo.trim());
    if (!proveedor) {
        alert(`El proveedor con código "${codigo}" no existe.`);
        return;
    }

    
    alert(`Datos actuales del proveedor:\nRazón Social: ${proveedor.razonSocial}\nTeléfono: ${proveedor.telefono}\nCorreo: ${proveedor.mail}`);

    const nuevaRazonSocial = prompt("Ingrese la nueva razón social (deje vacío para no modificar):").trim();
    const nuevoTelefono = prompt("Ingrese el nuevo teléfono (deje vacío para no modificar):").trim();
    const nuevoMail = prompt("Ingrese el nuevo correo electrónico (deje vacío para no modificar):").trim();

    // Actualizar los datos del proveedor
    const actualizado = sistema.proveedores.find(p => p.codigo === codigo.trim());
    if (actualizado) {
        actualizado.razonSocial = nuevaRazonSocial || actualizado.razonSocial.toUpperCase();
        actualizado.telefono = nuevoTelefono || actualizado.telefono;
        actualizado.mail = nuevoMail || actualizado.mail;
        alert("Proveedor modificado exitosamente.");
    } else {
        alert("No se encontró el proveedor con el código especificado.");
    }

}

function borrarProveedor() {
    
    const codigo = prompt("Ingrese el código del proveedor que desea eliminar (o 0 para cancelar):");
    if (codigo === "0") {
        alert("Cancelando eliminación...");
        return;
    }

    // Verificar si el proveedor existe    
    const codigoNumerico = parseInt(codigo)
   
    const proveedor = sistema.proveedores.find(p => p.codigo === codigoNumerico);
    if (!proveedor) {
        alert(`El proveedor con código "${codigo}" no existe.`);
        return;
    }

    // Confirmar la eliminación
    const confirmar = confirm(`¿Está seguro de que desea eliminar el proveedor "${proveedor.razonSocial}"?`);
    if (!confirmar) {
        alert("Eliminación cancelada.");
        return;
    }

    const eliminado = new Proveedor().eliminarProveedor(codigoNumerico);
    if (eliminado) {
        alert("Proveedor eliminado exitosamente.");
    } else {
        alert("No se pudo eliminar el proveedor.");
    }

}
