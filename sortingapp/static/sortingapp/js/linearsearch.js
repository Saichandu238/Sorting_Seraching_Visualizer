console.log("Linear Search Step Controller loaded");

const stepsContainer = document.getElementById("steps-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const arrayInput = document.getElementById("arrayInput");
const targetInput = document.getElementById("targetInput");

let steps = [];
let currentStep = 0;

function deepCopyArray(arr) {
    return arr.slice();
}

function generateSteps(array, target) {
    let stepsList = [];

    // Initial state
    stepsList.push({
        arr: deepCopyArray(array),
        currentIndex: null,
        foundIndex: null,
        explanation: `Start searching for ${target} in array.`
    });

    for (let i = 0; i < array.length; i++) {
        stepsList.push({
            arr: deepCopyArray(array),
            currentIndex: i,
            foundIndex: null,
            explanation: `Checking element ${array[i]} at index ${i}.`
        });

        if (array[i] === target) {
            stepsList.push({
                arr: deepCopyArray(array),
                currentIndex: i,
                foundIndex: i,
                explanation: `Found target ${target} at index ${i}.`
            });
            return stepsList; // end search early
        }
    }

    // Target not found
    stepsList.push({
        arr: deepCopyArray(array),
        currentIndex: null,
        foundIndex: null,
        explanation: `Target ${target} not found in array.`
    });

    return stepsList;
}

function renderStep(index) {
    const step = steps[index];
    stepsContainer.innerHTML = "";

    const arrayDiv = document.createElement("div");
    step.arr.forEach((num, idx) => {
        const circle = document.createElement("div");
        circle.className = "number";

        if (idx === step.foundIndex) {
            circle.classList.add("found");
        } else if (idx === step.currentIndex) {
            circle.classList.add("highlight");
        }

        circle.innerText = num;
        arrayDiv.appendChild(circle);
    });

    stepsContainer.appendChild(arrayDiv);

    const explanationP = document.createElement("p");
    explanationP.style.fontSize = "16px";
    explanationP.style.marginTop = "10px";
    explanationP.innerText = `Step ${index + 1} / ${steps.length}: ${step.explanation}`;
    stepsContainer.appendChild(explanationP);

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === steps.length - 1;
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }
}

function resetSteps() {
    currentStep = 0;
    renderStep(currentStep);
}

function startSearch() {
    const arrayStr = arrayInput.value.trim();
    const targetStr = targetInput.value.trim();

    if (!arrayStr) {
        alert("Please enter an array of numbers, e.g., 10, 20, 30, 40");
        return;
    }
    if (targetStr === "") {
        alert("Please enter a target value to search.");
        return;
    }

    const inputArr = arrayStr
        .split(",")
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));

    if (inputArr.length === 0) {
        alert("Please enter a valid array of comma-separated numbers.");
        return;
    }

    const target = parseInt(targetStr);
    if (isNaN(target)) {
        alert("Please enter a valid number as target.");
        return;
    }

    steps = generateSteps(inputArr, target);
    currentStep = 0;
    renderStep(currentStep);
}

window.onload = () => {
    startBtn.onclick = startSearch;
    nextBtn.onclick = nextStep;
    prevBtn.onclick = prevStep;
    resetBtn.onclick = resetSteps;
};