# Sistema de Gestión de Proveedores, Reactivos y Pedidos

Este proyecto es un sistema interactivo desarrollado en JavaScript que permite gestionar proveedores, reactivos, pedidos y generar reportes mediante listados y un tablero de métricas. El sistema utiliza ventanas emergentes (`prompt`, `alert`, `console.log`) para interactuar con el usuario y está estructurado de manera modular para facilitar su mantenimiento y ampliación.

---

## Funcionalidades

### **1. Gestión de Proveedores**
Permite administrar los datos de los proveedores asociados al sistema.

#### Opciones:
- **Agregar Proveedor:**
  - Solicita:
    - Código (número único no vacío).
    - Razón social (cadena no vacía).
    - Teléfono (opcional).
    - Correo electrónico (opcional).
  - Valida que el código no exista previamente.
  - Permite cancelar el proceso en cualquier momento ingresando `0`.

- **Modificar Proveedor:**
  - Solicita el código del proveedor a modificar.
  - Permite actualizar:
    - Razón social.
    - Teléfono.
    - Correo electrónico.
  - Mantiene los valores actuales si los campos nuevos están vacíos.

- **Eliminar Proveedor:**
  - Solicita el código del proveedor a eliminar.
  - Verifica que el proveedor no esté asociado a ningún reactivo antes de eliminarlo.

- **Listar Proveedores:**
  - Muestra un listado completo de los proveedores registrados.

---

### **2. Gestión de Reactivos**
Permite administrar los reactivos registrados en el sistema.

#### Opciones:
- **Agregar Reactivo:**
  - Solicita:
    - Código (número único no vacío).
    - Descripción (cadena no vacía).
    - Código de proveedor (debe existir en la lista de proveedores).
    - Stock inicial (número mayor a 0).
    - Indicador de conservación en cámara frigorífica.
    - Fecha de registro.
  - Valida que el código no exista previamente.

- **Modificar Reactivo:**
  - Solicita el código del reactivo a modificar.
  - Permite actualizar:
    - Descripción.
    - Proveedor.
    - Stock.
    - Conservación en cámara frigorífica.
  - Mantiene los valores actuales si los campos nuevos están vacíos.

- **Eliminar Reactivo:**
  - Solicita el código del reactivo a eliminar.
  - Elimina el reactivo del sistema.

- **Listar Reactivos:**
  - Muestra un listado detallado de los reactivos registrados, incluyendo:
    - Descripción.
    - Código.
    - Proveedor asociado.
    - Stock actual.
    - Fecha de registro.

---

### **3. Gestión de Pedidos**
Permite gestionar los pedidos realizados a proveedores, incluyendo reactivos asociados.

#### Opciones:
- **Crear Pedido:**
  - Solicita:
    - Número del pedido.
    - Código del proveedor.
    - Observaciones (opcional).
  - Permite agregar uno o más reactivos al pedido:
    - Código del reactivo (debe existir en el sistema).
    - Lote.
    - Fecha de vencimiento.
    - Cantidad (número mayor a 0).

- **Listar Pedidos:**
  - Muestra todos los pedidos registrados con información básica:
    - Número del pedido.
    - Proveedor asociado.
    - Cantidad de reactivos.
---

### **4. Tablero de Métricas**
Presenta un resumen general de la actividad del sistema.

#### Métricas Incluidas:
- **Total de Pedidos del Día:**
  - Cantidad de pedidos realizados en la fecha actual.

- **Reactivo Más Solicitado:**
  - Identifica el reactivo con la mayor cantidad total solicitada.

- **Proveedor Más Comprado:**
  - Indica el proveedor con el mayor volumen de reactivos pedidos.

- **Cantidad Total de Reactivos Solicitados:**
  - Calcula el total de unidades de reactivos en pedidos del día.

---

## Cómo Usar
1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/pgsistemasmdq/laboratorio_xy_entrega2.git
