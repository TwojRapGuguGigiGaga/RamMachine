window.onload = function() {
    addMemoryElements();
    createNewProgramElement();
}

const instructions = ["read", "add", "halt"];

function addMemoryElements() {
    const memoryTable = document.getElementById("memoryTable");

    for (let i=0; i<10; i++) {
        const newRow = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = i;

        const valueCell = document.createElement("td");
        valueCell.textContent = "?";

        newRow.appendChild(idCell);
        newRow.appendChild(valueCell);

        memoryTable.appendChild(newRow);
    }
}

function createNewProgramElement() {
    const programTable = document.getElementById("programTable");
    const numbersOfRows = programTable.getElementsByTagName("tr").length;

    const id = numbersOfRows - 1;

    const newRow = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = id;

    const labelCell = document.createElement("td");

    const instructionCell = document.createElement("td");
    const select = document.createElement("select");
    for (let i=0; i<instructions.length; i++) {
        let option = document.createElement("option");
        option.value = instructions[i];
        option.textContent = instructions[i];
        select.appendChild(option);
    }
    instructionCell.appendChild(select);

    const argumentCell = document.createElement("td");

    newRow.appendChild(idCell);
    newRow.appendChild(labelCell);
    newRow.appendChild(instructionCell);
    newRow.appendChild(argumentCell);
    programTable.appendChild(newRow);
}

function addElementToProgram() {
    
}