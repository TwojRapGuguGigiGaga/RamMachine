window.onload = function() {
    addMemoryElements();
    createNewProgramElement();
    addTapeElements("input");
    addTapeElements("output");
}

const instructions = ["read", "add", "write"];

function addMemoryElements() {
    const memoryTable = document.getElementById("memoryTable");

    for (let i=0; i<10; i++) {
        const newRow = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = i;

        const valueCell = document.createElement("td");
        valueCell.setAttribute("id", ("memoryValue" + i.toString()));
        valueCell.textContent = "-";

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
    idCell.setAttribute("id", id);

    const labelCell = document.createElement("td");
    const labelInput = document.createElement("input");
    labelInput.setAttribute("type", "number");
    labelCell.appendChild(labelInput);

    const instructionCell = document.createElement("td");
    const select = document.createElement("select");
    select.setAttribute("id", ("select" + id.toString()))
    for (let i=0; i<instructions.length; i++) {
        let option = document.createElement("option");
        option.value = instructions[i];
        option.textContent = instructions[i];
        select.appendChild(option);
    }
    instructionCell.appendChild(select);

    const argumentCell = document.createElement("td");
    const argumentInput = document.createElement("input");
    argumentInput.setAttribute("type", "number");
    argumentInput.setAttribute("id", ("arg" + id.toString()));
    argumentCell.appendChild(argumentInput);

    newRow.appendChild(idCell);
    newRow.appendChild(labelCell);
    newRow.appendChild(instructionCell);
    newRow.appendChild(argumentCell);
    programTable.appendChild(newRow);
}

function addTapeElements(tapeType) {    
    if (tapeType == "input") {
        tape = document.getElementById("inputTape");
    } else if (tapeType == "output") {
        tape = document.getElementById("outputTape");
    } else {
        return 0;
    }

    for (let i = 0; i < 10; i++) {
        const inputDiv = document.createElement("div");
        inputDiv.classList.add("input");

        const inputIndexP = document.createElement("p");
        inputIndexP.textContent = (i+1);

        const inputNumber = document.createElement("input");
        inputNumber.setAttribute("type", "text");
        inputNumber.setAttribute("id", tapeType == "input" ? "input" + (i+1).toString() : "output" + (i+1).toString());

        inputDiv.appendChild(inputIndexP);
        inputDiv.appendChild(inputNumber);

        tape.appendChild(inputDiv);
    }
}

let currentStep = 1;
let currentInput = 1;

function nextStep() {
    currentStep++;
}

async function startProgram() {
    const programTable = document.getElementById("programTable");
    const numberOfSteps = programTable.getElementsByTagName("tr").length - 2;

    let processorIns = document.getElementById("procIns");
    let processorArg = document.getElementById("procArg");

    let currentInputElement = document.getElementById(("input" + currentInput.toString()));
    currentInputElement.style.backgroundColor = "orange";

    for (let i=0; i<numberOfSteps; i++) {
        const instruction = document.getElementById(("select" + currentInput.toString())).value;
        const argument = document.getElementById(("arg" + currentInput.toString())).value;
        
        processorIns.innerHTML = instruction;
        processorArg.innerHTML = argument;

        const inputValue = document.getElementById(("input" + currentInput.toString())).value;

        let memoryValue = document.getElementById(("memoryValue" + argument));
        memoryValue.innerHTML = inputValue;

        await new Promise(resolve => setTimeout(resolve, 1000));
        currentInput++;

        let currentInputElement = document.getElementById(("input" + currentInput.toString()));
        currentInputElement.style.backgroundColor = "orange";
        let prevInputElement = document.getElementById(("input" + (currentInput-1).toString()));
        prevInputElement.style.backgroundColor = "white";
    }
}