console.log("Merge Sort Step Controller loaded");

const stepsContainer = document.getElementById("steps-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const arrayInput = document.getElementById("arrayInput");
const startBtn = document.getElementById("startBtn");

let steps = [];
let currentStep = 0;

// Utility: deep copy array
function deepCopyArray(arr) {
    return arr.slice();
}

// Generate steps for Merge Sort with explanation
function generateSteps(array) {
    let stepsList = [];

    stepsList.push({
        arr: deepCopyArray(array),
        indices: [],
        explanation: "Initial array before sorting."
    });

    function mergeSort(arr, left, right) {
        if (left >= right) return [arr[left]];

        let mid = Math.floor((left + right) / 2);
        let leftPart = mergeSort(arr, left, mid);
        let rightPart = mergeSort(arr, mid + 1, right);

        stepsList.push({
            arr: arr.slice(),
            indices: [left, mid, right],
            explanation: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]: [${leftPart}] and [${rightPart}].`
        });

        let merged = [];
        let i = 0,
            j = 0;
        while (i < leftPart.length && j < rightPart.length) {
            if (leftPart[i] <= rightPart[j]) {
                merged.push(leftPart[i++]);
            } else {
                merged.push(rightPart[j++]);
            }
        }
        while (i < leftPart.length) merged.push(leftPart[i++]);
        while (j < rightPart.length) merged.push(rightPart[j++]);

        for (let k = 0; k < merged.length; k++) {
            arr[left + k] = merged[k];
        }

        stepsList.push({
            arr: arr.slice(),
            indices: [left, right],
            explanation: `After merging, subarray [${left}..${right}] becomes [${merged}].`
        });

        return merged;
    }

    mergeSort(array.slice(), 0, array.length - 1);

    return stepsList;
}

// Render a single step by index
function renderStep(index) {
    const step = steps[index];
    stepsContainer.innerHTML = "";

    const arrayDiv = document.createElement("div");
    step.arr.forEach((num, i) => {
        const circle = document.createElement("div");
        circle.className = "number";

        if (step.indices.length === 3) {
            // Highlight full range [left..right] in red, others blue
            const [left, mid, right] = step.indices;
            circle.style.backgroundColor = (i >= left && i <= right) ? "#e74c3c" : "#3498db";
        } else if (step.indices.length === 2) {
            const [left, right] = step.indices;
            circle.style.backgroundColor = (i >= left && i <= right) ? "#e74c3c" : "#3498db";
        } else {
            circle.style.backgroundColor = "#3498db";
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

// Navigation functions
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

// Start sorting on button click
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