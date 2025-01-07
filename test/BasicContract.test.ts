import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("Proxy Contract Tests with Console Logs", function () {
  it("Debería confirmar que ambas versiones usan el mismo proxy", async function () {
    // Desplegar BasicContractV1
    const BasicContractV1 = await ethers.getContractFactory("BasicContractV1");
    console.log("Desplegando BasicContractV1...");
    const proxy = await upgrades.deployProxy(BasicContractV1, [["Leer", "Escribir", "Borrar"]], {
      initializer: "initialize",
    });
    const proxyAddress = await proxy.getAddress();
    console.log("Proxy Address:", proxyAddress);

    // Verificar dirección de implementación inicial
    const implementationV1 = await upgrades.erc1967.getImplementationAddress(proxyAddress);
    console.log("Logic Contract V1 Address:", implementationV1);

    // Confirmar que las categorías iniciales están presentes
    const categories = await proxy.getCategories();
    console.log("Categorías iniciales:", categories);
    expect(categories).to.deep.equal(["Leer", "Escribir", "Borrar"]);

    // Actualizar a BasicContractV2
    const BasicContractV2 = await ethers.getContractFactory("BasicContractV2");
    console.log("Actualizando a BasicContractV2...");
    const upgradedProxy = await upgrades.upgradeProxy(proxy, BasicContractV2);

    // Verificar dirección de implementación actualizada
    const implementationV2 = await upgrades.erc1967.getImplementationAddress(proxyAddress);
    console.log("Logic Contract V2 Address:", implementationV2);

    // Verificar que la dirección del proxy es la misma
    const proxyAddressAfterUpgrade = await upgradedProxy.getAddress();
    console.log("Proxy Address After Upgrade:", proxyAddressAfterUpgrade);
    expect(proxyAddressAfterUpgrade).to.equal(proxyAddress);

    // Confirmar que el estado (categorías) se conserva después de la actualización
    const categoriesAfterUpgrade = await upgradedProxy.getCategories();
    console.log("Categorías después de la actualización:", categoriesAfterUpgrade);
    expect(categoriesAfterUpgrade).to.deep.equal(["Leer", "Escribir", "Borrar"]);

    // Confirmar que las nuevas funciones de V2 están disponibles
    console.log("Agregando nuevas tareas en V2...");
    await upgradedProxy.addTask("Nueva Tarea");
    const tasksAfterUpgrade = await upgradedProxy.getTasks();
    console.log("Tareas después de la actualización:", tasksAfterUpgrade);
    expect(tasksAfterUpgrade.length).to.equal(1);
    expect(tasksAfterUpgrade[0].description).to.equal("Nueva Tarea");
    expect(tasksAfterUpgrade[0].completed).to.be.false;
  });
});
