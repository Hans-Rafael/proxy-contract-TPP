//author: Hans Garcia
import { ethers, upgrades } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const proxyAddress = process.env.PROXY_ADDRESS;
async function main() {
    // Verificar si la dirección del proxy está definida
    if (!proxyAddress) {
        throw new Error("Proxy address is not defined in .env file.");
    }
    console.log("Original proxy addres", proxyAddress);
    // Desplegar BasicContractV2
    const BasicContractV2 = await ethers.getContractFactory("BasicContractV2");
    console.log("Desplegando BasicContractV2...");
    // Actualizar el contrato proxy a la versión 2
    const proxy2 = await upgrades.upgradeProxy(proxyAddress, BasicContractV2);
    //verificar are same address
    const proxy2Address = await proxy2.getAddress();
    console.log(`Verificar son iguales las direcciones ${proxyAddress} y ${proxy2Address}`);
    // Obtener la dirección de la implementación
    console.log(`Dirección de la implementación: ${await upgrades.erc1967.getImplementationAddress(proxy2Address)}`);
    // Obtener la dirección del administrador del proxy
    console.log(`Dirección del administrador del proxy: ${await upgrades.erc1967.getAdminAddress(proxy2Address)}`);
    // Verificar las tareas después de agregar una
  const updatedTasks = await proxy2.getTasks();
  console.log("Tareas después de agregar:", updatedTasks);
  // verificar categories
  const categoriesV2 = await proxy2.getCategories();
  console.log("Categorías (después de actualización):", categoriesV2);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});