console.log("Quick Sort Step Controller loaded");

const stepsContainer = document.getElementById("steps-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const arrayInput = document.getElementById("arrayInput");

let steps = [];
let currentStep = 0;

// Deep copy utility
function deepCopyArray(arr) {
    return arr.slice();
}

// Generate quicksort steps with explanation
function generateSteps(array) {
    let arr = deepCopyArray(array);
    let stepsList = [];

    // Initial step
    stepsList.push({
        arr: deepCopyArray(arr),
        pivotIndex: null,
        low: null,
        high: null,
        swappedIndices: [],
        explanation: "Initial array before sorting."
    });

    function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        stepsList.push({
            arr: deepCopyArray(arr),
            pivotIndex: high,
            low: low,
            high: high,
            swappedIndices: [],
            explanation: `Partitioning with pivot ${pivot} at index ${high}.`
        });

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    stepsList.push({
                        arr: deepCopyArray(arr),
                        pivotIndex: high,
                        low: low,
                        high: high,
                        swappedIndices: [i, j],
                        explanation: `Swapped ${arr[i]} and ${arr[j]} because ${arr[i]} < pivot ${pivot}.`
                    });
                } else {
                    stepsList.push({
                        arr: deepCopyArray(arr),
                        pivotIndex: high,
                        low: low,
                        high: high,
                        swappedIndices: [],
                        explanation: `${arr[j]} < pivot ${pivot}, no swap needed as indices are same.`
                    });
                }
            } else {
                stepsList.push({
                    arr: deepCopyArray(arr),
                    pivotIndex: high,
                    low: low,
                    high: high,
                    swappedIndices: [],
                    explanation: `${arr[j]} ≥ pivot ${pivot}, no action taken.`
                });
            }
        }

        i++;
        [arr[i], arr[high]] = [arr[high], arr[i]];
        stepsList.push({
            arr: deepCopyArray(arr),
            pivotIndex: i,
            low: low,
            high: high,
            swappedIndices: [i, high],
            explanation: `Moved pivot ${pivot} to its correct position at index ${i}.`
        });

        return i;
    }

    function quickSort(arr, low, high) {
        if (low < high) {
            let pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    quickSort(arr, 0, arr.length - 1);

    return stepsList;
}

// Render step at given index
function renderStep(index) {
    const step = steps[index];
    stepsContainer.innerHTML = "";

    const arrayDiv = document.createElement("div");
    step.arr.forEach((num, idx) => {
        const circle = document.createElement("div");
        circle.className = "number";

        if (idx === step.pivotIndex) {
            circle.style.backgroundColor = "#f39c12"; // orange pivot
        } else if (step.swappedIndices.includes(idx)) {
            circle.style.backgroundColor = "#e74c3c"; // red swapped
        } else if (step.low !== null && step.high !== null && idx >= step.low && idx <= step.high) {
            circle.style.backgroundColor = "#3498db"; // blue partition
        } else {
            circle.style.backgroundColor = "#95a5a6"; // gray outside
            circle.style.color = "#ecf0f1";
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

// Navigation
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

// Start sort on user input
function startSort() {
    const inputStr = arrayInput.value.trim();
    if (!inputStr) {
        alert("Please enter some numbers, e.g., 60, 20, 30, 10");
        return;
    }

    const inputArr = inputStr
        .split(",")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

    if (inputArr.length === 0) {
        alert("Please enter valid comma-separated numbers.");
        return;
    }

    steps = generateSteps(inputArr);
    currentStep = 0;
    renderStep(currentStep);
}

window.onload = () => {
    startBtn.onclick = startSort;
    nextBtn.onclick = nextStep;
    prevBtn.onclick = prevStep;
    resetBtn.onclick = resetSteps;
};