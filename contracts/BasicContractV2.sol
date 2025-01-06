// SPDX-License-Identifier: MIT
// author: Hans Garcia.
// Description: Gestión de una Lista de Tareas (To-Do List) - Versión 2
pragma solidity 0.8.26;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./BasicContractV1.sol";
// Heredar de BasicContractV1
contract BasicContractV2 is BasicContractV1 {
    // Nueva funcion para agregar tareas en V2
    function addTask(string memory _description) public {
        Task memory newTask = Task({
            description: _description,
            completed: false
        });
        tasks.push(newTask);
    }
}