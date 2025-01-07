# Recomendaciones para Usar el Patrón de Proxy Transparente (TPP) en Contratos Inteligentes

Este archivo describe las condiciones y buenas prácticas para implementar el Patrón de Proxy Transparente (TPP) en contratos inteligentes. Estas recomendaciones aseguran que los contratos sean compatibles con proxies y puedan ser actualizados de manera segura.

---

## 1. Usar una Función Inicializadora
En lugar de usar un constructor, reemplázalo con una función inicializadora marcada con el modificador `initializer` proporcionado por OpenZeppelin.

**Por qué:** El constructor no se ejecuta al desplegar contratos de lógica con proxies.

**Ejemplo:**
```solidity
function initialize(string[] memory _categories) public initializer {
    categories = _categories;
}
```

---

## 2. Herencia de `Initializable`
El contrato debe heredar de `Initializable` para asegurar que la función inicializadora solo se ejecute una vez.

**Por qué:** Protege contra re-ejecuciones accidentales de la inicialización.

**Ejemplo:**
```solidity
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BasicContractV1 is Initializable {
    // Código del contrato...
}
```

---

## 3. Variables de Estado Fijas
El orden y estructura de las variables de estado no deben cambiar entre versiones.

**Por qué:** El proxy almacena el estado en su propia dirección de almacenamiento, y cambios pueden corromper los datos.

**Ejemplo:**
```solidity
string[] public categories;
Task[] public tasks;
```

---

## 4. No Usar Inicialización Directa de Variables de Estado
Evita inicializar variables directamente al declararlas. Inicialízalas en la función `initialize`.

**Incorrecto:**
```solidity
string[] public categories = ["Leer", "Escribir"];
```

**Correcto:**
```solidity
function initialize(string[] memory _categories) public initializer {
    categories = _categories;
}
```

---

## 5. Evitar Cambios en Tipos de Datos Dinámicos
No cambies el tipo o el tamaño de variables de estado entre versiones.

**Por qué:** Cambios en variables dinámicas pueden causar conflictos de almacenamiento.

---

## 6. Implementar Funciones Compatibles con Proxies
Evita funciones que dependan del constructor o usen `selfdestruct`.

**Por qué:** Estas funciones no se comportan correctamente en el contexto de un proxy.

---

## 7. Reservar Espacio para Futuras Variables
Agrega espacio de almacenamiento reservado para futuras variables usando un array privado.

**Por qué:** Ayuda a evitar conflictos al agregar nuevas variables.

**Ejemplo:**
```solidity
uint256[50] private __gap;
```

---

## 8. Usar Librería de Upgrades de OpenZeppelin
Asegúrate de usar `@openzeppelin/contracts-upgradeable` y `@openzeppelin/hardhat-upgrades`.

**Comando para instalar:**
```bash
npm install @openzeppelin/contracts-upgradeable @openzeppelin/hardhat-upgrades
```

---

## 9. Mantener Separada la Lógica y el Almacenamiento
Evita interacciones directas con el almacenamiento del proxy fuera de las funciones esperadas.

**Por qué:** Garantiza que los datos se mantengan consistentes entre actualizaciones.

---

## 10. Cumplir con las Restricciones de EIP-1967
El contrato debe seguir las reglas de EIP-1967 para las ubicaciones de almacenamiento de las direcciones de implementación (`implementation`) y administrador (`admin`).

---

### Resumen
Para garantizar compatibilidad con el Patrón de Proxy Transparente:
1. Usa una función inicializadora con `initializer`.
2. Hereda de `Initializable`.
3. Mantén el orden y tipo de variables de estado.
4. Evita inicializar variables directamente.
5. Reserva espacio de almacenamiento para futuras variables.
6. Usa herramientas de OpenZeppelin para despliegue y actualizaciones.
7. Sigue las reglas de EIP-1967.

Con estas prácticas, tus contratos estarán preparados para ser utilizados y actualizados de manera segura con el Patrón de Proxy Transparente.

