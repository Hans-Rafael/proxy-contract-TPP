# Proyecto de Contratos con Proxy Transparente (TPP)

## Descripción

Este proyecto tiene como objetivo demostrar el uso del **Patrón de Proxy Transparente (TPP)** para la actualización de contratos en Solidity. El TPP permite actualizar la lógica de un contrato sin perder el estado ni la dirección del contrato, lo que es útil en entornos donde la funcionalidad de los contratos puede necesitar mejoras o correcciones después de su despliegue inicial.

El patrón de Proxy Transparente se utiliza para desplegar un contrato proxy que intercede entre el usuario y el contrato de lógica, permitiendo cambiar la implementación del contrato sin cambiar la dirección del proxy. Esto permite una evolución fluida y segura del contrato.

### Características:
1. **Despliegue de contrato inicial (V1)**: Se despliega un contrato con funcionalidades básicas de gestión de tareas y categorías.
2. **Actualización a la versión 2 (V2)**: Se actualiza el contrato proxy a una nueva versión con nuevas funcionalidades sin alterar el estado ni la dirección del proxy.
3. **Comprobación de categorías y tareas**: Verificación de que las categorías y tareas permanecen consistentes a lo largo de la actualización.

---

## Estructura del Proyecto

El proyecto consta de dos versiones de contratos inteligentes:

### **BasicContractV1.sol**
- Implementación inicial que permite agregar tareas y asociarlas a categorías.
- Proporciona funciones para agregar tareas, marcar tareas como completadas y recuperar las categorías y tareas.

### **BasicContractV2.sol**
- Extiende la funcionalidad de V1 al permitir la modificación de tareas existentes y la actualización de su descripción.
- El contrato sigue utilizando el proxy para almacenar el estado.

### **Archivos de Despliegue**
- `scripts/deployV1.ts`: Despliega la versión 1 del contrato.
- `scripts/deployV2.ts`: Actualiza el contrato a la versión 2 usando el proxy.
  
---

## Cómo Funciona el Patrón de Proxy Transparente

### **1. Proxy Contract**
El contrato proxy actúa como intermediario entre el usuario y el contrato de lógica (implementación). Este patrón asegura que el proxy pueda redirigir las llamadas al contrato de lógica actual. Cuando se actualiza la lógica, el proxy se asegura de que el estado se conserve.

- **Dirección del Proxy**: Esta dirección se mantiene constante durante todo el ciclo de vida del contrato.
- **Implementación del Proxy**: El contrato de lógica puede cambiarse sin cambiar la dirección del proxy.

### **2. Desplegar y Actualizar Contratos**
El proceso de despliegue y actualización de los contratos es gestionado por los scripts de despliegue en `deployV1.ts` y `deployV2.ts`:
- Primero, se despliega la versión 1 del contrato y se guarda la dirección del proxy.
- Luego, se actualiza el contrato a la versión 2 sin perder el estado, utilizando el método `upgradeProxy` de la librería `@openzeppelin/hardhat-upgrades`.

---

## Requisitos

- Node.js (>= 16.x)
- Hardhat
- @openzeppelin/contracts-upgradeable
- dotenv (para gestión de variables de entorno)
  
---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/proxy-contract-tpp.git
   cd proxy-contract-tpp
