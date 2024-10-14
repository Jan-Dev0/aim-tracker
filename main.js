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

const date = new Date();
const year = date.getFullYear();
const currMonth = date.getMonth();
const currMonthName = date.toLocaleString("de-DE", { month: "long" });
const lastDayOfMonth = new Date(year, currMonth + 1, 0).getDate();

let rowId = 0;
let scrollAmount;

monthEl.textContent = currMonthName;

const formatDate = (year, month, day) => {
  return `${year}-${month}-${day}`.replace(/\b(\d)\b/g, "0$1");
};

const createItem = () => {
  const aimWrapper = document.createElement("div");
  const aim = document.createElement("div");
  const interval = document.createElement("div");
  const deleteBtn = document.createElement("span");
  const deleteIcon = document.createElement("i");
  const arrowWrapper = document.createElement("div");
  const arrowIcon = document.createElement("i");

  rowId++;

  aimWrapper.classList.add("aim-tracker__aim-wrapper");
  aimWrapper.setAttribute("data-row-id", rowId);
  aim.textContent = "Ziel";
  aim.classList.add("aim-tracker__aim");
  interval.textContent = "Zeit";
  interval.classList.add("aim-tracker__interval");
  deleteBtn.classList.add("aim-tracker__delete-btn");
  deleteBtn.setAttribute("data-row-id", rowId);
  deleteIcon.classList.add("fa-regular", "fa-circle-xmark");

  arrowWrapper.classList.add("aim-tracker__aim-arrow-wrapper");
  arrowIcon.classList.add(
    "fa-solid",
    "fa-arrow-right-long",
    "fa-xl",
    "aim-tracker__aim-arrow"
  );

  arrowWrapper.append(arrowIcon);
  deleteBtn.append(deleteIcon);
  aim.append(deleteBtn);
  aimWrapper.append(aim, interval, arrowWrapper);
  aimsList.append(aimWrapper);

  deleteBtn.addEventListener("click", (e) => {
    const id = deleteBtn.getAttribute("data-row-id");
    const aimRow = document.querySelector(`.aim-tracker__aim-wrapper[data-row-id="${id}"]`);
    const checkRow = document.querySelector(`.aim-tracker__check-row[data-row-id="${id}"]`);
    const reviewRow = document.querySelector(`.aim-tracker__aim-review-wrapper[data-row-id="${id}"]`);
    aimRow.remove();
    checkRow.remove();
    reviewRow.remove();

  });
  


  createReviewEntry();
  createCheckField();
};

const createReviewEntry = () => {
  const reviewWrapper = document.createElement("div");
  const reviewEntry = document.createElement("div");

  reviewWrapper.classList.add("aim-tracker__aim-review-wrapper");
  reviewWrapper.setAttribute("data-row-id", rowId);
  reviewEntry.classList.add("aim-tracker__aim-review");
  reviewEntry.textContent = "Auswertung";
  reviewWrapper.append(reviewEntry);
  reviewList.append(reviewWrapper);
};

const createDayLabel = () => {
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const label = document.createElement("div");
    label.classList.add("aim-tracker__day-label");
    label.textContent = `${i}`;
    label.setAttribute("data-date", formatDate(year, currMonth, i));
    labelList.append(label);
  }
};

const createCheckField = () => {
  const row = document.createElement("div");
  row.classList.add("aim-tracker__check-row");
  row.setAttribute("data-row-id", rowId);

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const checkField = document.createElement("div");

    checkField.classList.add("aim-tracker__check-field");
    checkField.setAttribute("data-date", formatDate(year, currMonth, i));
    checkField.setAttribute("data-checked", false);
    row.append(checkField);

    checkField.addEventListener("click", (e) => {
      isChecked = checkField.getAttribute("data-checked") === "true";
      checkField.setAttribute("data-checked", !isChecked);
    });
  }
  logList.append(row);
};

for (let i = 0; i < 8; i++) {
  createItem();
}

createDayLabel();

const checkField = document.querySelector(".aim-tracker__check-field");
const deleteBtn = document.querySelector(".aim-tracker__delete-btn");

leftArrow.addEventListener("click", () => {
  console.log(logListWrapper.offsetWidth);
  scrollAmount = logListWrapper.offsetWidth / 2 - 1.5;
  console.log(scrollAmount);
  logListWrapper.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

rightArrow.addEventListener("click", () => {
  console.log(logListWrapper.offsetWidth);
  console.log(checkField.offsetWidth);
  scrollAmount = logListWrapper.offsetWidth / 2 - 1.5;
  console.log(scrollAmount);
  logListWrapper.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

addBtn.addEventListener("click", () => {
  createItem();
});

