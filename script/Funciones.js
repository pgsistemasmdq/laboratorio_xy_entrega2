
    //PROVEEDORES

    function gestionarProveedores() {
        let opcion;
        do {
            opcion = prompt(`Gestión de Proveedores:\n1. Agregar Proveedor\n2. Modificar Proveedor\n3. Borrar Proveedor\n4. Listar Proveedores\n5. Volver`);
            const proveedor = new Proveedor();
            switch (opcion) {
                case "1":{
                        const codigo = controlCodigoProveedor();
                        if (!codigo) return; // Si el usuario cancela
                    
                        const razonSocial = controlRazonSocial();
                        if (!razonSocial) return; // Si el usuario cancela
                    
                        const telefono = prompt("Ingrese el teléfono:");
                        const mail = prompt("Ingrese el correo electrónico:");

                        proveedor.agregarProveedor(codigo.trim(), razonSocial.toUpperCase(), telefono, mail);
                        alert("Proveedor agregado exitosamente.");
                    }
                    break;
                case "2":
                    modificarProveedor();
                    break;
                case "3":
                    borrarProveedor();
                    break;
                case "4":
                    alert(proveedor.listarProveedores());
                    break;
                case "5":
                    break;
                default:
                    alert("Opción no válida. Intente nuevamente.");
            }
        } while (opcion !== "5");
    }

   
    ///
    function gestionarReactivos() {
        let opcion;
        do {
            opcion = prompt(`Gestión de Reactivos:\n1. Agregar Reactivo\n2. Modificar Reactivo\n3. Eliminar Reactivo\n4. Listar Reactivos\n5. Volver`);
            
            const reactivo = new Reactivo(); // Crea una instancia de Reactivo
            switch (opcion) {
                case "1":
                    agregarReactivoIngreso();
                    break;
                case "2":
                    modificarReactivo();
                    break;
                case "3":
                    eliminarReactivo();
                    break;
                case "4":

                    alert(reactivo.listarReactivos());
                    break;
                case "5":
                    break;
                default:
                    alert("Opción no válida. Intente nuevamente.");
            }
        } while (opcion !== "5");
    }
    

    

///

    function gestionarPedidos() {
        let opcion;
        do {
            opcion = prompt(`Gestión de Pedidos:\n1. Crear Pedido\n2. Listar Pedidos (Consola)\n3. Volver`);

            switch (opcion) {
                case "1":
                    agregarPedido();
                    break;
                case "2":
                    listarPedidos();
                    break;
                case "3":
                    break;
                default:
                    alert("Opción no válida. Intente nuevamente.");
            }
        } while (opcion !== "3");
    }

    function salir() {
        alert("Gracias por usar el sistema.");
    }    
 