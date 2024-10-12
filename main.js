const aimList = document.querySelector(".aim-tracker__aim-list");
const labelList = document.querySelector(".aim-tracker__days-label");
const entriesList = document.querySelector(".aim-tracker__entries");
const reviewList = document.querySelector(".aim-tracker__review-list");
const leftArrow = document.querySelector(".aim-tracker__arrow--left");
const rightArrow = document.querySelector(".aim-tracker__arrow--right");

const createAims = () => {
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

const createLabels = () => {};

const createEntries = () => {};

const createReview = () => {};

for (let i = 0; i < 5; i++) {
  createAims();
}

