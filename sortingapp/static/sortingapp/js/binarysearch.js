console.log("Binary Search Step Controller loaded");

const stepsContainer = document.getElementById("steps-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const arrayInput = document.getElementById("arrayInput");
const targetInput = document.getElementById("targetInput");

let steps = [];
let currentStep = -1;

function deepCopyArray(arr) {
    return arr.slice();
}

function generateSteps(array, target) {
    let stepsList = [];
    let left = 0;
    let right = array.length - 1;

    stepsList.push({
        arr: deepCopyArray(array),
        mid: null,
        explanation: `Start binary search for ${target} in sorted array.`,
        foundIndex: null
    });

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        stepsList.push({
            arr: deepCopyArray(array),
            mid: mid,
            explanation: `Checking middle element ${array[mid]} at index ${mid}.`,
            foundIndex: null
        });

        if (array[mid] === target) {
            stepsList.push({
                arr: deepCopyArray(array),
                mid: mid,
                explanation: `Found target ${target} at index ${mid}.`,
                foundIndex: mid
            });
            return stepsList;
        }

        if (array[mid] < target) {
            stepsList.push({
                arr: deepCopyArray(array),
                mid: mid,
                explanation: `${target} > ${array[mid]} → Search right half.`,
                foundIndex: null
            });
            left = mid + 1;
        } else {
            stepsList.push({
                arr: deepCopyArray(array),
                mid: mid,
                explanation: `${target} < ${array[mid]} → Search left half.`,
                foundIndex: null
            });
            right = mid - 1;
        }
    }

    stepsList.push({
        arr: deepCopyArray(array),
        mid: null,
        explanation: `Target ${target} not found in array.`,
        foundIndex: null
    });

    return stepsList;
}

function createStepElement(stepIndex) {
    const step = steps[stepIndex];
    const stepDiv = document.createElement("div");

    const arrayDiv = document.createElement("div");
    step.arr.forEach((num, idx) => {
        const circle = document.createElement("div");
        circle.className = "number";

        if (idx === step.foundIndex) {
            circle.classList.add("found");
        } else if (idx === step.mid) {
            circle.classList.add("highlight");
        }

        circle.innerText = num;
        arrayDiv.appendChild(circle);
    });

    stepDiv.appendChild(arrayDiv);

    const explanationP = document.createElement("p");
    explanationP.style.fontSize = "16px";
    explanationP.style.marginTop = "10px";
    explanationP.innerText = `Step ${stepIndex + 1} / ${steps.length}: ${step.explanation}`;
    stepDiv.appendChild(explanationP);

    return stepDiv;
}

function displayNextStep() {
    if (currentStep + 1 < steps.length) {
        currentStep++;
        const stepElem = createStepElement(currentStep);
        stepsContainer.innerHTML = "";
        stepsContainer.appendChild(stepElem);
    }

    prevBtn.disabled = currentStep <= 0;
    nextBtn.disabled = currentStep >= steps.length - 1;
}

function displayPreviousStep() {
    if (currentStep > 0) {
        currentStep--;
        const stepElem = createStepElement(currentStep);
        stepsContainer.innerHTML = "";
        stepsContainer.appendChild(stepElem);
    }

    prevBtn.disabled = currentStep <= 0;
    nextBtn.disabled = currentStep >= steps.length - 1;
}

function resetSteps() {
    stepsContainer.innerHTML = "";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    currentStep = -1;
}

function startSearch() {
    const arrayStr = arrayInput.value.trim();
    const targetStr = targetInput.value.trim();

    if (!arrayStr) {
        alert("Please enter a sorted array.");
        return;
    }
    if (!targetStr) {
        alert("Please enter a target value.");
        return;
    }

    const inputArr = arrayStr
        .split(",")
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b); // Ensure sorted for binary search

    const target = parseInt(targetStr);
    if (isNaN(target)) {
        alert("Invalid target number.");
        return;
    }

    steps = generateSteps(inputArr, target);
    currentStep = -1;
    displayNextStep();
}

window.onload = () => {
    startBtn.onclick = startSearch;
    nextBtn.onclick = displayNextStep;
    prevBtn.onclick = displayPreviousStep;
    resetBtn.onclick = resetSteps;
};