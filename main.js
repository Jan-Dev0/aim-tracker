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

const createDayLabel = () => {
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const label = document.createElement("div");
    label.classList.add("aim-tracker__day-label");
    label.textContent = `${i}`;
    label.setAttribute("data-date", formatDate(year, currMonth, i));
    labelList.append(label);
  }
};

const createAimRow = () => {
  const aimRow= document.createElement("div");
  const aim = document.createElement("div");
  const interval = document.createElement("div");
  const deleteBtn = document.createElement("span");
  const deleteIcon = document.createElement("i");
  const arrowWrapper = document.createElement("div");
  const arrowIcon = document.createElement("i");

  rowId++;

  aimRow.classList.add("aim-tracker__aim-wrapper");
  aimRow.setAttribute("data-row-id", rowId);
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
  aimRow.append(aim, interval, arrowWrapper);

  deleteBtn.addEventListener("click", (e) => {
    const id = deleteBtn.getAttribute("data-row-id");
    const aimRow = document.querySelector(
      `.aim-tracker__aim-wrapper[data-row-id="${id}"]`
    );
    const checkRow = document.querySelector(
      `.aim-tracker__check-row[data-row-id="${id}"]`
    );
    const reviewRow = document.querySelector(
      `.aim-tracker__aim-review-wrapper[data-row-id="${id}"]`
    );

    aimRow.classList.remove("aim-tracker__aim-wrapper--visible");
    checkRow.classList.remove("aim-tracker__check-row--visible");
    reviewRow.classList.remove("aim-tracker__aim-review-wrapper--visible");
    setTimeout(() => {
      aimRow.remove();

      checkRow.remove();

      reviewRow.remove();
    }, 300);
  });

  aim.addEventListener('click', () => {
    editEntry(aim);
  });
    interval.addEventListener("click", () => {
      editEntry(interval);
    });


  return aimRow;
};

const createReviewRow = () => {
  const reviewWrapper = document.createElement("div");
  const reviewEntry = document.createElement("div");

  reviewWrapper.classList.add("aim-tracker__aim-review-wrapper");
  reviewWrapper.setAttribute("data-row-id", rowId);
  reviewEntry.classList.add("aim-tracker__aim-review");
  reviewEntry.textContent = "Auswertung";
  reviewWrapper.append(reviewEntry);
  return reviewWrapper;
};

const createCheckRow = () => {
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
      isChecked = !isChecked;
      checkField.setAttribute("data-checked", isChecked);
      console.log(isChecked);
      if (isChecked) {
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-x";
        checkField.appendChild(icon);
      } else {
        checkField.innerHTML = ""; // Entfernt den Inhalt, falls `isChecked` false ist
      }
    });
  }
  return row;
};

const addRow = () => {
  const aimRow = createAimRow();
  aimsList.appendChild(aimRow);

  const checkRow = createCheckRow();
  logList.appendChild(checkRow);

  const reviewRow = createReviewRow();
  reviewList.appendChild(reviewRow);

  setTimeout(() => {
    aimRow.classList.add("aim-tracker__aim-wrapper--visible");
    checkRow.classList.add("aim-tracker__check-row--visible");
    reviewRow.classList.add("aim-tracker__aim-review-wrapper--visible");
  }, 10);
};

const editEntry = (entry) => {
  const currentText = entry.textContent;
  const input = document.createElement('input');

  input.type = "text";
  input.value = currentText;
  input.classList.add('aim-tracker__aim-input');
  entry.classList.add('aim-tracker__aim--editing');
  entry.innerHTML = "";
  entry.append(input);

}


for (let i = 0; i < 8; i++) {
  const aimRow = createAimRow();
  aimsList.appendChild(aimRow);
  aimRow.classList.add("aim-tracker__aim-wrapper--visible");
  const checkRow = createCheckRow();
  logList.appendChild(checkRow);
  checkRow.classList.add("aim-tracker__check-row--visible");
  const reviewRow = createReviewRow();
  reviewList.appendChild(reviewRow);
  reviewRow.classList.add("aim-tracker__aim-review-wrapper--visible");
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
  addRow();
});
