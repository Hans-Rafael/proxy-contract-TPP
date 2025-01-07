//author: Hans Garcia
import { ethers, upgrades } from "hardhat";
import updateEnvFile from "../utils/updateEnvFile"; // Ruta del script automático

async function main() {
  // Desplegar BasicContractV1
  const BasicContractV1 = await ethers.getContractFactory("BasicContractV1");
  console.log("Desplegando BasicContractV1...");
  const proxy = await upgrades.deployProxy(BasicContractV1, [["Leer", "Escribir", "Borrar"]], {
    initializer: "initialize", // Nombre de la función inicializadora
  });

  // Obtener dirección del proxy
  const proxyAddress = await proxy.getAddress();
  console.log("Dirección del proxy:", proxyAddress);
  // Actualiza el archivo .env con la dirección del proxy
  updateEnvFile("PROXY_ADDRESS", proxyAddress);
  // Obtener la dirección de la implementación
  console.log(`Dirección de la implementación: ${await upgrades.erc1967.getImplementationAddress(proxyAddress)}`);
  //// Obtener la dirección del administrador del proxy
  console.log(`Dirección del administrador del proxy: ${await upgrades.erc1967.getAdminAddress(proxyAddress)}`);
  // Verificar las categorías iniciales
  const categories = await proxy.getCategories();
  console.log("Categorías iniciales:", categories);

  // Verificar las tareas iniciales (deberían estar vacías)
  const tasks = await proxy.getTasks();
  console.log("Tareas iniciales:", tasks);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
