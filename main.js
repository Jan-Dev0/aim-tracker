const aimList = document.querySelector(".aim-tracker__aim-list");
const labelList = document.querySelector(".aim-tracker__days-label");
const entriesList = document.querySelector(".aim-tracker__entries-list");
const reviewList = document.querySelector(".aim-tracker__review-list");
const leftArrow = document.querySelector(".aim-tracker__arrow--left");
const rightArrow = document.querySelector(".aim-tracker__arrow--right");
const entriesContainer = document.querySelector(
  ".aim-tracker__entries-container"
);

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
const scrollAmount = 250;

const createAimEntry = () => {
  const div = document.createElement("div");
  const aimInput = document.createElement("input");
  const timeInput = document.createElement("input");

  div.classList.add("aim-tracker__aim");

  aimInput.type = "text";
  aimInput.placeholder = "Ziel";
  aimInput.classList.add("aim-tracker__aim-input");

  timeInput.type = "text";
  timeInput.placeholder = "Zeit";
  timeInput.classList.add("aim-tracker__time-input");
  div.append(aimInput, timeInput);
  aimList.append(div);
};

const createReviewEntry = () => {
  const entry = document.createElement("div");
  const input = document.createElement("input");

  entry.classList.add("aim-tracker__review-list");
  input.type = "text";
  input.placeholder = "Auswertung";
  input.classList.add("aim-tracker__review-input");

  entry.append(input);
  reviewList.append(entry);
};

const createLogLabel = () => {
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const label = document.createElement("div");
    label.classList.add("aim-tracker__day");
    label.textContent = `${i}`;
    labelList.append(label);
  }
};

const createLogEntry = () => {
  const listRow = document.createElement("div");
  listRow.classList.add("aim-tracker__entries");

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const entry = document.createElement("div");
    const input = document.createElement("input");

    entry.classList.add("aim-tracker__entry");
    input.type = "text";
    input.classList.add("aim-tracker__entry-input");

    entry.append(input);
    listRow.append(entry);
  }
  entriesList.append(listRow);
};

for (let i = 0; i < 5; i++) {
  createAimEntry();
  createReviewEntry();
  createLogEntry();
}

createLogLabel();

leftArrow.addEventListener("click", () => {
  console.log("left");
  entriesContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

rightArrow.addEventListener("click", () => {
  console.log("right");
  entriesContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});
