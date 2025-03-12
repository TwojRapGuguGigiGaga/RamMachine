window.onload = function() {
    addMemoryElements();
    createNewProgramElement();
    addTapeElements("input");
    addTapeElements("output");
}

const instructions = ["read", "add", "write","sub"];

function addMemoryElements() {
    const memoryTable = document.getElementById("memoryTable");

    for (let i=0; i<10; i++) {
        const newRow = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = i;

        const valueCell = document.createElement("td");
        valueCell.setAttribute("id", ("memoryValue" + i.toString()));
        valueCell.setAttribute("value", ("0"));
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
    idCell.setAttribute("id", ("programRow" + id));
    if (id == 1) {
        idCell.style.backgroundColor = "orange";
    }

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
        if (i==0) {
            inputNumber.style.backgroundColor = "orange";
        }
        inputNumber.setAttribute("type", "text");
        inputNumber.setAttribute("id", tapeType == "input" ? "input" + (i+1).toString() : "output" + (i+1).toString());

        inputDiv.appendChild(inputIndexP);
        inputDiv.appendChild(inputNumber);

        tape.appendChild(inputDiv);
    }
}

let currentStep = 1;
let currentInput = 1;
let currentOutput = 1;

function nextStep() {
    currentStep++;
}

function animation(element1, element2) {
    return new Promise((resolve) => {
        let copiedBlock = document.createElement("div");
        copiedBlock.innerText = element1.value;
        copiedBlock.className = "animationBlock"; 
        copiedBlock.style.position = "absolute";
        copiedBlock.style.top = element1.getBoundingClientRect().top + "px";
        copiedBlock.style.left = element1.getBoundingClientRect().left + "px";
        document.body.appendChild(copiedBlock);
        copiedBlock.style.transition = "top 1s linear, left 1s linear, opacity 0.5s ease 1s, transform 1s linear"

        setTimeout(() => {
            copiedBlock.style.top = element2.getBoundingClientRect().top + "px";
            copiedBlock.style.left = element2.getBoundingClientRect().left + "px";
        }, 50);

        setTimeout(() => {
            copiedBlock.style.opacity = "0";
        }, 1100);

        setTimeout(() => {
            copiedBlock.remove();
            resolve();
        }, 1600);
    });
}

function updateInputTape() {
    const inputElement = document.getElementById(("input" + (currentInput+1).toString()));
    inputElement.style.backgroundColor = "orange";
    const prevInputElement = document.getElementById(("input" + currentInput.toString()));
    prevInputElement.style.backgroundColor = "white";
}

function updateOutputTape() {
    const outputElement = document.getElementById(("output" + (currentOutput+1).toString()));
    outputElement.style.backgroundColor = "orange";
    const prevOutputElement = document.getElementById(("output" + currentOutput.toString()));
    prevOutputElement.style.backgroundColor = "white";
}

let processorIns = document.getElementById("procIns");
let processorArg = document.getElementById("procArg");

async function startProgram() {
    const programTable = document.getElementById("programTable");
    const numberOfSteps = programTable.getElementsByTagName("tr").length - 2;

    for (let i=0; i<numberOfSteps; i++) {
        updateVariables();

        const instructionValue = document.getElementById(("select" + currentInput.toString())).value;
        switch (instructionValue) {
            case "read":
                await programRead();
                break;
            case "add":
                await programAdd();
                break;
            case "write":
                await programWrite();
                break;
            case "sub":
                await programSub();
                break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        currentInput++;

        const programRow = document.getElementById(("programRow" + currentInput.toString()));
        programRow.style.backgroundColor = "orange";
        const prevProgramRow = document.getElementById(("programRow" + (currentInput-1).toString()));
        prevProgramRow.style.backgroundColor = "#222";
    }
}

let instruction, instructionValue, argument, argumentValue, zeroMemoryValue, memoryValue;

function updateVariables() {
    instruction = document.getElementById("select" + currentInput.toString());
    instructionValue = instruction.value;
    argument = document.getElementById("arg" + currentInput.toString());
    argumentValue = argument.value;
    zeroMemoryValue = document.getElementById("memoryValue0");
    memoryValue = document.getElementById("memoryValue" + argumentValue);
}

async function loadRowToProcessor() {
    await animation(instruction, processorIns);
    processorIns.innerHTML = instructionValue;
    processorIns.value = instructionValue;

    await animation(argument, processorArg);
    processorArg.innerHTML = argumentValue;
    processorArg.value = argumentValue;
}

async function programRead() {
    const inputElement = document.getElementById(("input" + currentInput.toString()));
    const inputValue = inputElement.value;

    await loadRowToProcessor();

    await animation(inputElement, memoryValue);
    memoryValue.innerHTML = inputValue;
    memoryValue.value = inputValue;

    updateInputTape();
}

async function programAdd() {
    await loadRowToProcessor();

    await animation(processorArg, memoryValue);

    await animation(memoryValue, zeroMemoryValue);
    zeroMemoryValue.innerHTML = (parseInt(memoryValue.value) + parseInt(zeroMemoryValue.value));
    zeroMemoryValue.value = (parseInt(memoryValue.value) + parseInt(zeroMemoryValue.value));
}

async function programWrite() {
    await loadRowToProcessor();

    const outputElement = document.getElementById(("output" + currentOutput.toString()));

    await animation(processorArg, memoryValue);

    await animation(memoryValue, outputElement);
    outputElement.value = memoryValue.value;

    updateOutputTape();
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.click();
}

function handleSubmit(event) {
    event.preventDefault();  // Prevent form submission
    var filename = event.target['name'].value;
    var text = event.target['text'].value;
    download(filename, text);
    zeroMemoryValue.value = (parseInt(memoryValue.value) + parseInt(zeroMemoryValue.value));
}

async function programSub(){
    await loadRowToProcessor();

    await animation(processorArg, memoryValue);
    await animation(memoryValue, zeroMemoryValue);

    memoryValue.value = parseInt(memoryValue.value);
    zeroMemoryValue.value = parseInt(zeroMemoryValue.value);

    zeroMemoryValue.innerHTML = zeroMemoryValue.value - memoryValue.value;
    zeroMemoryValue.value = zeroMemoryValue.value - memoryValue.value;
}