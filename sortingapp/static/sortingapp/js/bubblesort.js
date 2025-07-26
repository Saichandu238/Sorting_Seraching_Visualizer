console.log("Bubble Sort Visualization Loaded");

const stepsContainer = document.getElementById("steps-container");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const arrayInput = document.getElementById("arrayInput");

let steps = [];
let currentStep = 0;

function parseInputArray(inputStr) {
    return inputStr
        .split(",")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
}

function generateSteps(arr) {
    let stepsList = [];
    let a = [...arr];

    stepsList.push({
        arr: [...a],
        compare: [],
        explanation: "Initial array before sorting."
    });

    let n = a.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let explanation;
            let swapped = false;
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                explanation = `Comparing ${a[j + 1]} and ${a[j]} → Swap since ${a[j + 1]} > ${a[j]}`;
                swapped = true;
            } else {
                explanation = `Comparing ${a[j]} and ${a[j + 1]} → No swap needed`;
            }

            stepsList.push({
                arr: [...a],
                compare: [j, j + 1],
                swapped,
                explanation
            });
        }
    }

    return stepsList;
}

function renderStep(index) {
    const step = steps[index];
    stepsContainer.innerHTML = ""; // Clear previous content

    const bubbleDiv = document.createElement("div");

    step.arr.forEach((num, i) => {
        const span = document.createElement("span");
        span.classList.add("number");
        if (step.compare.includes(i)) {
            span.classList.add("highlight");
        }
        span.textContent = num;
        bubbleDiv.appendChild(span);
    });

    const explanationP = document.createElement("p");
    explanationP.innerText = `Step ${index + 1}/${steps.length}: ${step.explanation}`;

    stepsContainer.appendChild(bubbleDiv);
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

function startSort() {
    const inputStr = arrayInput.value.trim();
    const inputArr = parseInputArray(inputStr);

    if (inputArr.length === 0) {
        alert("Please enter a valid array, like: 60, 20, 30, 10");
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