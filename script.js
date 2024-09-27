// CONSTANTS
const CONTAINER_SIZE = 720;

const container = document.querySelector(".container");
const body = document.querySelector("body");

// create grid button
const createGridButton = document.createElement("button");
createGridButton.style.padding = "1em";
createGridButton.style.margin = "1em";
createGridButton.textContent = "Create Grid";
createGridButton.addEventListener("click", createNewGrid);
body.prepend(createGridButton);

// create random color button
let isRandomColor = false;
const randomColorButton = document.createElement("button");
randomColorButton.style.padding = "1em";
randomColorButton.style.margin = "1em";
randomColorButton.textContent = "Change to Random Colors";
randomColorButton.addEventListener("click", () => {
    isRandomColor = !isRandomColor;
    randomColorButton.textContent = isRandomColor
        ? "Change to Black"
        : "Change to Random Colors";
});
createGridButton.insertAdjacentElement("afterend", randomColorButton);

// helper function
function createRandomNumberForRGB() {
    console.log(Math.floor(Math.random() * 256));
    return Math.floor(Math.random() * 256);
}

function createNewGrid() {
    let numberOfSquares;

    // prompt user
    do {
        numberOfSquares = prompt(
            "Please enter the number of squares per side (up to 124): "
        );

        if (numberOfSquares === null) {
            return;
        }
    } while (
        isNaN(Number(numberOfSquares)) ||
        Number(numberOfSquares) <= 0 ||
        Number(numberOfSquares) > 124
    );

    // remove existing grid
    container.replaceChildren();

    // fill the grid
    let squareSize = CONTAINER_SIZE / numberOfSquares;
    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;
        squareDiv.style.border = "1px solid black";
        squareDiv.addEventListener("mouseenter", () => {
            squareDiv.style.backgroundColor = isRandomColor
                ? `rgb(${createRandomNumberForRGB()} ${createRandomNumberForRGB()} ${createRandomNumberForRGB()})`
                : "black";
        });
        container.appendChild(squareDiv);
    }
}
