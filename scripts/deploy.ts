//author: Hans Garcia
import { ethers } from "hardhat";

async function main() {
     // Obtennemos el contrato a desplegar
     const BasicContractV1 = await ethers.getContractFactory("BasicContractV1");
     console.log("Desplegando el contrato BasicContractV1...");
     // Desplegamos el contrato
     const basicContractV1 = await BasicContractV1.deploy();
     // Esperar a que el contrato sea minado
     await basicContractV1.waitForDeployment();
     // Obtenemos la dirección del contrato desplegado
    const contractAddress = await basicContractV1.getAddress();
    console.log("BasicContractV1 deployed to:", contractAddress);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});