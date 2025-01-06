//author: Hans Garcia
import { ethers, upgrades } from "hardhat";

async function main() {
  //// Deploy LogicV1
  // Obtennemos el contrato a desplegar
  const BasicContractV1 = await ethers.getContractFactory("BasicContractV1");
  console.log("Desplegando el contrato BasicContractV1...");
  // Desplegamos el contrato usando deployProxy con un inicializador
  const proxy = await upgrades.deployProxy(
    BasicContractV1,
    [["Leer", "Escribir", "Borrar"]], // Pasamos un solo array que contiene las categorías,
    {
      initializer: "initialize", // Nombre de la función inicializadora
    }
  );
  // Espera a que el despliegue sea confirmado
  await proxy.deploymentTransaction()?.wait();
  // Obtenemos la dirección del proxy
  const proxyAddress = await proxy.getAddress();
  console.log("Contrato proxy desplegado en:", proxyAddress);
  // Verificar la categoria inicial
  const categories = await proxy.getCategories();
  console.log("Categoría inicial:", categories);
  // Verificar el numero de tareas
  const numTasks = await proxy.getTaskCount();
  console.log("Número de tareas:", numTasks);
  //Obtener las tareas
  const tasks = await proxy.getTasks();
  console.log("Tareas:", tasks);
  /********* Deploy LogicV2 ********/
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
