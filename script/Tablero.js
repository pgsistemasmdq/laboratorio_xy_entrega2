
function tableroResumen(pedidos) {
    const hoy = new Date().toISOString().split("T")[0];

    // Total de pedidos del día
    const pedidosDelDia = pedidos.filter(p => p.fecha.toISOString().split("T")[0] === hoy);
    const totalPedidosDia = pedidosDelDia.length;

    // Reactivo más ingresado
    const reactivos = {};
    pedidos.forEach(pedido => {
        pedido.items.forEach(item => {
            if (!reactivos[item.codReactivo]) {
                reactivos[item.codReactivo] = 0;
            }
            reactivos[item.codReactivo] += item.cantidad;
        });
    });
    const reactivoMasIngresado = Object.entries(reactivos).sort((a, b) => b[1] - a[1])[0];

    // Proveedor más comprado
    const proveedores = {};
    pedidos.forEach(pedido => {
        if (!proveedores[pedido.proveedor]) {
            proveedores[pedido.proveedor] = 0;
        }
        pedido.items.forEach(item => {
            proveedores[pedido.proveedor] += item.cantidad;
        });
    });
    const proveedorMasComprado = Object.entries(proveedores).sort((a, b) => b[1] - a[1])[0];

    console.log("Tablero Resumen:");
    console.log(`Total de pedidos del día: ${totalPedidosDia}`);
    if (reactivoMasIngresado) {
        console.log(`Reactivo más ingresado: ${reactivoMasIngresado[0]} (Cantidad: ${reactivoMasIngresado[1]})`);
    }
    if (proveedorMasComprado) {
        console.log(`Proveedor más comprado: ${proveedorMasComprado[0]} (Cantidad: ${proveedorMasComprado[1]})`);
    }
}
