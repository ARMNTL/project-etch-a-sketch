# The Odin Project

## Project Etch-a-Sketch

### Steps I made

1. We'll be working with a lot of square divs so border-box sizing seems appropriate. In `styles.css`,

```css
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
```

2. Let's add some squares to the `container` div.

```js
const container = document.querySelector(".container");

for (let i = 0; i < 16 * 16; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.style.width = "60px";
    squareDiv.style.height = "60px";
    squareDiv.style.border = "1px solid black";
    container.appendChild(squareDiv);
}
```

3. Ugh... Flexbox... 720px seems like a good number, divisible by many numbers.

```css
.container {
    display: flex;
    flex-wrap: wrap;
    width: 720px;
    height: 720px;
}
```

4. How can I make it a square grid? Math... the square div size is the container size divided by the number of square divs.

```js
const container = document.querySelector(".container");

// new variables here
let numberOfSquares = 16;
let containerSize = 720;
let squareSize = containerSize / numberOfSquares;

for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.style.width = `${squareSize}px`;
    squareDiv.style.height = `${squareSize}px`;
    squareDiv.style.border = "1px solid black";
    container.appendChild(squareDiv);
}
```

5. Setting the "hover" effect.

```js
for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
    ...
    squareDiv.style.border = "1px solid black";

    squareDiv.addEventListener(
        "mouseenter",
        () => (squareDiv.style.backgroundColor = "black")
    );

    container.appendChild(squareDiv);
}
```

6. Adding the button to ask user input on the size of the grid.

```js
const changeGridButton = document.createElement("button");
changeGridButton.style.padding = "1em";
changeGridButton.style.margin = "1em";
changeGridButton.textContent = "Change Grid";
changeGridButton.addEventListener("click", createNewGrid);
body.prepend(changeGridButton);
```

7. Adding the button functionality. My first bug! I'm trying to have the user input a number, if not a number (NaN), ask again.

```js
// can you find the bug?
function createNewGrid() {
    do {
        let numberOfSquares = Number(
            prompt("Please enter the number of squares per side (up to 100): ")
        );
        // console.log(numberOfSquares);
        // console.log(typeof numberOfSquares);
        // console.log(isNaN(numberOfSquares));
    } while (isNaN(numberOfSquares));
}
```

Anyway, here's the working one.

```js
function createNewGrid() {
    do {
        numberOfSquares = Number(
            prompt("Please enter the number of squares per side (up to 100): ")
        );
    } while (isNaN(numberOfSquares) || numberOfSquares === 0);

    // remove existing grid
    container.replaceChildren();

    squareSize = containerSize / numberOfSquares;

    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;
        squareDiv.style.border = "1px solid black";
        squareDiv.addEventListener(
            "mouseenter",
            () => (squareDiv.style.backgroundColor = "black")
        );
        container.appendChild(squareDiv);
    }
}
```

8. DRY! Refactoring! I ended up like this.

```js
const container = document.querySelector(".container");
const body = document.querySelector("body");

// create grid button
const createGridButton = document.createElement("button");
createGridButton.style.padding = "1em";
createGridButton.style.margin = "1em";
createGridButton.textContent = "Create Grid";
createGridButton.addEventListener("click", createNewGrid);
body.prepend(createGridButton);

// CONSTANTS
const CONTAINER_SIZE = 720;

function createNewGrid() {
    let numberOfSquares;

    // prompt user
    do {
        numberOfSquares = prompt(
            "Please enter the number of squares per side (up to 100): "
        );

        if (numberOfSquares === null) {
            return;
        }
    } while (isNaN(Number(numberOfSquares)) || Number(numberOfSquares) === 0);

    // remove existing grid
    container.replaceChildren();

    // fill the grid
    let squareSize = CONTAINER_SIZE / numberOfSquares;
    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;
        squareDiv.style.border = "1px solid black";
        squareDiv.addEventListener(
            "mouseenter",
            () => (squareDiv.style.backgroundColor = "black")
        );
        container.appendChild(squareDiv);
    }
}
```

9. Extra Credits for Random Colors!

```js
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
```

Also changed the event listener.

```js
// helper function
function createRandomNumberForRGB() {
    return Math.floor(Math.random() * 256);
}

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
```

10. More Extra Credits for Opacity!

````js
// fill the grid
    let squareSize = CONTAINER_SIZE / numberOfSquares;
    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;
        squareDiv.style.border = "1px solid black";
        squareDiv.style.opacity = 0.1;
        squareDiv.addEventListener("mouseover", () => {
            squareDiv.style.backgroundColor = isRandomColor
                ? `rgb(${createRandomNumberForRGB()} ${createRandomNumberForRGB()} ${createRandomNumberForRGB()})`
                : "black";
            let currentOpacity = parseFloat(squareDiv.style.opacity) || 0;
            if (currentOpacity < 1) {
                squareDiv.style.opacity = currentOpacity + 0.1;
            }
        });
        container.appendChild(squareDiv);
    }
    ```
````
