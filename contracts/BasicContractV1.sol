// SPDX-License-Identifier: MIT
// author: Hans Garcia.
pragma solidity 0.8.26;

contract BasicContractV1 {
    // Declaramos una estructura para almacenar el nombre
    struct NameRecord {
        string name;
    }

    // Declaramos un arreglo de registros de nombres public para pruebas
    NameRecord[] public nameRecords; 
    
    // Función para agregar un nuevo nombre junto con un ID único e incremental
    function addName(string memory _name) public {
        // Creamos un nuevo registro de nombre
        NameRecord memory newRecord = NameRecord({
            name: _name
        });

        // Añadimos el nuevo registro al arreglo
        nameRecords.push(newRecord);

    }

    // Función para obtener la cantidad de registros de nombres
    function getNameRecordsCount() public view returns (uint) {
        return nameRecords.length;
    }
}
