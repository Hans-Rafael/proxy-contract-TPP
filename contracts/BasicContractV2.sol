// SPDX-License-Identifier: MIT
// author: Hans Garcia.
// Description: Gestión de una Lista de Tareas (To-Do List) - Versión 2
pragma solidity 0.8.26;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./BasicContractV1.sol";

// Heredar de BasicContractV1
contract BasicContractV2 is BasicContractV1 {
    // Función para actualizar la descripción de una tarea
    function updateTaskDescription(
        uint256 _taskId,
        string memory _newDescription
    ) public {
        require(_taskId < tasks.length, "Tarea no existe");
        tasks[_taskId].description = _newDescription;
    }
} 
