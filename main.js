const aimList = document.querySelector(".aim-tracker__aim-list");
const labelList = document.querySelector(".aim-tracker__days-label");
const entriesList = document.querySelector(".aim-tracker__entries-list");
const reviewList = document.querySelector(".aim-tracker__review-list");
const leftArrow = document.querySelector(".aim-tracker__arrow--left");
const rightArrow = document.querySelector(".aim-tracker__arrow--right");
const entriesContainer = document.querySelector(
  ".aim-tracker__entries-container"
);
const addBtn = document.querySelector(".aim-tracker__add-aim-btn");

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
const scrollAmount = 250;

const createAimEntry = () => {
  const div = document.createElement("div");
  const aimInput = document.createElement("div");
  const timeInput = document.createElement("div");
  const icon = document.createElement("i");
  div.classList.add("aim-tracker__aim");
  aimInput.textContent = "Ziel";
  timeInput.textContent = "Zeit";
  icon.classList.add("fa-regular", "fa-circle-xmark");
  aimInput.classList.add("aim-tracker__aim-input");
  aimInput.append(icon);

  timeInput.classList.add("aim-tracker__time-input");
  div.append(aimInput, timeInput);
  aimList.append(div);
};

const createReviewEntry = () => {
  const entry = document.createElement("div");

  entry.classList.add("aim-tracker__review-input");
  entry.textContent = "Auswertung";
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

    entry.classList.add("aim-tracker__entry");

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

addBtn.addEventListener("click", () => {
  createAimEntry();
  createReviewEntry();
  createLogEntry();
});
