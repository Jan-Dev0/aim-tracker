const aimsList = document.querySelector(".aim-tracker__aims-list");
const labelList = document.querySelector(".aim-tracker__label-list");
const logList = document.querySelector(".aim-tracker__check-list");
const reviewList = document.querySelector(".aim-tracker__aim-review-list");
const leftArrow = document.querySelector(".aim-tracker__arrow--left");
const rightArrow = document.querySelector(".aim-tracker__arrow--right");
const logListWrapper = document.querySelector(".aim-tracker__log-list-wrapper");
const addBtn = document.querySelector(".aim-tracker__add-aim-btn");
const monthEl = document.querySelector(".aim-tracker__month-name");
const monthPrev = document.querySelector("aim-tracker__month-nav--prev");
const monthNext = document.querySelector(".aim-tracker__month-nav--next");


console.log(logListWrapper.offsetWidth);

const date = new Date();
const year = date.getFullYear();
const currMonth = date.getMonth();
const currMonthName = date.toLocaleString('de-DE', { month: 'long' });
const lastDayOfMonth = new Date(year, currMonth + 1, 0).getDate();
let scrollAmount;

monthEl.textContent = currMonthName;

const createItem = () => {
  const item = document.createElement("div");
  const aim = document.createElement("div");
  const interval = document.createElement("div");
  const span = document.createElement("span");
  const icon = document.createElement("i");

  item.classList.add("aim-tracker__aim-wrapper");
  aim.textContent = "Ziel";
  interval.textContent = "Zeit";
  span.classList.add("aim-tracker__delete-btn");
  icon.classList.add("fa-regular", "fa-circle-xmark");
  aim.classList.add("aim-tracker__aim");
  span.append(icon);
  aim.append(span);

  interval.classList.add("aim-tracker__interval");
  item.append(aim, interval);
  aimsList.append(item);
};

const createReviewEntry = () => {
  const entry = document.createElement("div");

  entry.classList.add("aim-tracker__aim-review");
  entry.textContent = "Auswertung";
  reviewList.append(entry);
};

const createDayLabel = () => {
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const label = document.createElement("div");
    label.classList.add("aim-tracker__day-label");
    label.textContent = `${i}`;
    labelList.append(label);
  }
};

const createCheckField = () => {
  const row = document.createElement("div");
  row.classList.add("aim-tracker__check-row");

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const checkField = document.createElement("div");

    checkField.classList.add("aim-tracker__check-field");

    row.append(checkField);
  }
  logList.append(row);
};

for (let i = 0; i < 8; i++) {
  createItem();
  createReviewEntry();
  createCheckField();
}

createDayLabel();

const checkField = document.querySelector(".aim-tracker__check-field");

leftArrow.addEventListener("click", () => {
    console.log(logListWrapper.offsetWidth);
    scrollAmount = (logListWrapper.offsetWidth) / 2 - 1.5;
    console.log(scrollAmount);
  logListWrapper.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

rightArrow.addEventListener("click", () => {
  console.log(logListWrapper.offsetWidth);
  console.log(checkField.offsetWidth);
  scrollAmount = (logListWrapper.offsetWidth ) / 2 - 1.5;
  console.log(scrollAmount);
  logListWrapper.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

addBtn.addEventListener("click", () => {
  createItem();
  createReviewEntry();
  createCheckField();
});
