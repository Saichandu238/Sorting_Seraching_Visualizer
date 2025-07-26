console.log("Selection Sort Step Controller loaded");

const stepsContainer = document.getElementById("steps-container");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const arrayInput = document.getElementById("arrayInput");

let steps = [];
let currentStep = 0;

// Utility to clone array
function deepCopyArray(arr) {
    return arr.slice();
}

// Step generation logic for Selection Sort
function generateSteps(array) {
    let arr = deepCopyArray(array);
    let stepsList = [];

    stepsList.push({
        arr: deepCopyArray(arr),
        compare: [],
        swapped: false,
        explanation: "Initial array before sorting.",
    });

    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        stepsList.push({
            arr: deepCopyArray(arr),
            compare: [i],
            swapped: false,
            explanation: `Selecting index ${i} (value ${arr[i]}) as current minimum.`,
        });

        for (let j = i + 1; j < n; j++) {
            let explanation;
            if (arr[j] < arr[minIndex]) {
                explanation = `Comparing ${arr[j]} with current minimum ${arr[minIndex]} → New minimum at index ${j}.`;
                minIndex = j;
            } else {
                explanation = `Comparing ${arr[j]} with current minimum ${arr[minIndex]} → No change.`;
            }
            stepsList.push({
                arr: deepCopyArray(arr),
                compare: [minIndex, j],
                swapped: false,
                explanation,
            });
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            stepsList.push({
                arr: deepCopyArray(arr),
                compare: [i, minIndex],
                swapped: true,
                explanation: `Swapping index ${i} and ${minIndex} → (${arr[minIndex]} ↔️ ${arr[i]})`,
            });
        } else {
            stepsList.push({
                arr: deepCopyArray(arr),
                compare: [i],
                swapped: false,
                explanation: `No swap needed at index ${i}.`,
            });
        }
    }

    return stepsList;
}

// Create each step visual
function createStepElement(stepIndex) {
    const step = steps[stepIndex];
    const stepDiv = document.createElement("div");

    const arrayDiv = document.createElement("div");
    step.arr.forEach((num, idx) => {
        const el = document.createElement("div");
        el.className = "number";
        el.innerText = num;

        if (step.compare.includes(idx)) {
            el.style.backgroundColor = "#e74c3c";
        } else {
            el.style.backgroundColor = "#3498db";
        }

        arrayDiv.appendChild(el);

        if (step.compare.length === 2 && idx === step.compare[0]) {
            const arrow = document.createElement("span");
            arrow.innerText = " ↔️ ";
            arrayDiv.appendChild(arrow);
        }
    });

    const explanationP = document.createElement("p");
    explanationP.innerText = `Step ${stepIndex + 1}/${steps.length}: ${step.explanation}`;

    stepDiv.appendChild(arrayDiv);
    stepDiv.appendChild(explanationP);

    return stepDiv;
}

// Render only one step
function renderStep(stepIndex) {
    stepsContainer.innerHTML = "";
    const stepElem = createStepElement(stepIndex);
    stepsContainer.appendChild(stepElem);

    nextBtn.disabled = stepIndex === steps.length - 1;
}

// Move to next step
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }
}

// Restart visualization
function resetSteps() {
    currentStep = 0;
    renderStep(currentStep);
}

// Start sorting with user array
function startSort() {
    const input = arrayInput.value;
    const userArray = input.split(",").map((num) => parseInt(num.trim())).filter((n) => !isNaN(n));

    if (userArray.length === 0) {
        alert("Please enter valid numbers separated by commas.");
        return;
    }

    steps = generateSteps(userArray);
    currentStep = 0;
    renderStep(currentStep);
    nextBtn.disabled = false;
}

window.onload = () => {
    nextBtn.onclick = nextStep;
    resetBtn.onclick = resetSteps;
    startBtn.onclick = startSort;
    nextBtn.disabled = true;
};