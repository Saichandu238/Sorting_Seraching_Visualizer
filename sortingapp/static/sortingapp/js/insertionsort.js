console.log("Insertion Sort Step Controller loaded");

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

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        stepsList.push({
            arr: [...a],
            compare: [i],
            explanation: `Select ${key} as the key for insertion.`
        });

        while (j >= 0 && a[j] > key) {
            stepsList.push({
                arr: [...a],
                compare: [j, j + 1],
                explanation: `Since ${a[j]} > ${key}, shift ${a[j]} to the right.`
            });
            a[j + 1] = a[j];
            j--;
        }

        a[j + 1] = key;

        stepsList.push({
            arr: [...a],
            compare: [j + 1],
            explanation: `Insert key ${key} at position ${j + 1}.`
        });
    }

    return stepsList;
}

function renderStep(index) {
    const step = steps[index];
    stepsContainer.innerHTML = "";

    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.alignItems = "center";
    rowDiv.style.justifyContent = "center";
    rowDiv.style.flexWrap = "nowrap";
    rowDiv.style.gap = "10px";

    step.arr.forEach((num, idx) => {
        const box = document.createElement("div");
        box.className = "number";
        box.innerText = num;
        box.style.backgroundColor = step.compare.includes(idx) ? "#e67e22" : "#2980b9";
        box.style.padding = "10px 15px";
        box.style.borderRadius = "8px";
        box.style.color = "#fff";
        box.style.fontSize = "18px";
        box.style.fontWeight = "bold";
        box.style.minWidth = "40px";
        box.style.textAlign = "center";

        rowDiv.appendChild(box);

        if (step.compare.length === 2 && idx === step.compare[0]) {
            const arrow = document.createElement("span");
            arrow.innerText = "↔️";
            arrow.style.fontSize = "22px";
            arrow.style.margin = "0 5px";
            rowDiv.appendChild(arrow);
        }
    });

    const explanation = document.createElement("span");
    explanation.innerText = ` — Step ${index + 1}/${steps.length}: ${step.explanation}`;
    explanation.style.marginLeft = "20px";
    explanation.style.fontSize = "16px";
    explanation.style.color = "#2c3e50";

    rowDiv.appendChild(explanation);
    stepsContainer.appendChild(rowDiv);

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