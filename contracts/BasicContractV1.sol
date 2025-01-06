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
    string[] public categories; // Array de categorias o tareas
    
    // Funcion inicializadora para categoria inicial de tareas
    function initialize(string[] memory _categories) public initializer {
        categories = _categories; // inicializo array con valores pasados
    }
    //Funcion para marcar tarea completada
    function completeTask(uint256 _taskId) public {
        require(_taskId < tasks.length, "Tarea no existe");
        tasks[_taskId].completed = true;
    }
    //Funcion para obtener todas las tareas
    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }
    // funcion para obtener numero de tareas
    function getTaskCount() public view returns (uint256) {
        return tasks.length;
    }
    // Función 5 para obtener todas las categorías
    function getCategories() public view returns (string[] memory) {
        return categories;  // Devuelve el array de categorías
    }
    //Function 6 para agregar una nueva tarea en futuro V2
}
