// SPDX-License-Identifier: MIT
// author: Hans Garcia.
// Description: Gestión de una Lista de Tareas (To-Do List).
pragma solidity 0.8.26;
// Para TTP important ser initializable
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BasicContractV1 is Initializable {
    struct Task {
        string description;
        bool completed;
    }
    Task[] public tasks;
    string[] public categories; // Array de categorias de tareas
    
    // Funcion inicializadora para categoria inicial de tareas
    function initialize(string[] memory _categories) public initializer {
        categories = _categories; // inicializo array con valores pasados
    }

    // Función para agregar una nueva tarea
    function addTask(string memory _taskDescription) public {
        tasks.push(Task({ description: _taskDescription, completed: false }));
        categories.push(_taskDescription); // Agregar la tarea como una categoría
    }

    // Función para marcar tarea como completada
    function completeTask(uint256 _taskId) public {
        require(_taskId < tasks.length, "Tarea no existe");
        tasks[_taskId].completed = true;
    }

    // Función para obtener tareas
    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    // Función para obtener categorías
    function getCategories() public view returns (string[] memory) {
        return categories;
    }
    
    //Function actualizar la descripción de una tarea futuro V2
}
