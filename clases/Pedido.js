class ItemPedido {
    constructor(codReactivo, lote, vencimiento, cantidad) {
        this.codReactivo = codReactivo;
        this.lote = lote;
        this.vencimiento = new Date(vencimiento);
        this.cantidad = cantidad;
    }

    toString() {
        return `Código Reactivo: ${this.codReactivo}, Lote: ${this.lote}, Vencimiento: ${this.vencimiento.toLocaleDateString()}, Cantidad: ${this.cantidad}`;
    }
}

class Pedido {
    constructor(nroPedido, proveedor, observaciones) {
        this.nroPedido = nroPedido;
        this.fecha = new Date();
        this.proveedor = proveedor;
        this.observaciones = observaciones;
        this.items = [];
    }

    agregarItem(codReactivo, lote, vencimiento, cantidad) {
        const nuevoItem = new ItemPedido(codReactivo, lote, vencimiento, cantidad);
        this.items.push(nuevoItem);
    }

    eliminarItem(codReactivo) {
        const index = this.items.findIndex(item => item.codReactivo === codReactivo);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    toString() {
        return `Pedido Nro: ${this.nroPedido}, Fecha: ${this.fecha.toLocaleDateString()}, Proveedor: ${this.proveedor}, Observaciones: ${this.observaciones}`;
    }

    listarItems() {
        return this.items.map((item, index) => `${index + 1}. ${item.toString()}`).join("\n");
    }
}

// Función para agregar un pedido
function agregarPedido() {
    const codigoProveedor = prompt("Ingrese el código del proveedor:");
    if (isNaN(codigoProveedor.trim())) {
        alert("El código del proveedor debe ser un número válido.");
        return;
    }
    const proveedor = sistema.proveedores.find(p => p.codigo === parseInt(codigoProveedor, 10));
    if (!proveedor) {
        alert("El proveedor no existe.");
        return;
    }
    const observaciones = prompt("Ingrese observaciones para el pedido:");
    sistema.contadorPedidos++;
    const nuevoPedido = new Pedido(sistema.contadorPedidos, codigoProveedor, observaciones);

    while (true) {
        const codigoReactivo = prompt("Ingrese el código del reactivo (o 0 para finalizar el pedido):");
        if (codigoReactivo === "0") break;
        const reactivo = sistema.reactivos.find(r => r.codigo === parseInt(codigoReactivo, 10));
        if (!reactivo) {
            alert("El reactivo no existe.");
            continue;
        }
        const lote = prompt("Ingrese el lote del reactivo:");
        const vencimiento = prompt("Ingrese la fecha de vencimiento (YYYY-MM-DD):");
        const cantidad = parseInt(prompt("Ingrese la cantidad:"), 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Cantidad no válida.");
            continue;
        }
        nuevoPedido.agregarItem(reactivo.codigo, lote, vencimiento, cantidad);
    }

    sistema.pedidos.push(nuevoPedido);
    alert(`Pedido N° ${nuevoPedido.nroPedido} creado exitosamente.`);
}

// Función para listar todos los pedidos
function listarPedidos() {
    if (sistema.pedidos.length === 0) {
        alert("No hay pedidos registrados.");
        return;
    }
    console.log("Listado de Pedidos:");
    sistema.pedidos.forEach(pedido => console.log(pedido.toString()));
}

// Función para listar los ítems de un pedido específico
function listarItems() {
    const nroPedido = parseInt(prompt("Ingrese el número del pedido a listar:"), 10);
    const pedido = sistema.pedidos.find(p => p.nroPedido === nroPedido);
    if (!pedido) {
        alert("Pedido no encontrado.");
        return;
    }
    console.log(`Items del Pedido N° ${nroPedido}:\n${pedido.listarItems()}`);
}

// Función para eliminar un ítem de un pedido
function eliminarItem() {
    const nroPedido = parseInt(prompt("Ingrese el número del pedido:"), 10);
    const pedido = sistema.pedidos.find(p => p.nroPedido === nroPedido);
    if (!pedido) {
        alert("Pedido no encontrado.");
        return;
    }
    const codReactivo = parseInt(prompt("Ingrese el código del reactivo a eliminar:"), 10);
    if (pedido.eliminarItem(codReactivo)) {
        alert("Ítem eliminado exitosamente.");
    } else {
        alert("Ítem no encontrado.");
    }
}

function listarPedidosDetalle() {
    if (sistema.pedidos.length === 0) {
        alert("No hay pedidos registrados.");
        return;
    }

    console.log("Listado de Pedidos con Detalles:");
    sistema.pedidos.forEach(pedido => {
        console.log(pedido.toString()); 
        if (pedido.items.length === 0) {
            console.log("  No tiene ítems asociados.");
        } else {
            console.log("  Ítems del Pedido:");
            pedido.items.forEach((item, index) => {
                console.log(`    ${index + 1}. ${item.toString()}`); 
            });
        }
        console.log("\n---------------------------------------\n");
    });
}