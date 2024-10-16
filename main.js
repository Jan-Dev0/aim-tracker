const aimsContainer = document.querySelector(".aim-tracker__aims-container");
const reviewContainer = document.querySelector(".aim-tracker__review-container");
const leftArrow = document.querySelector(".aim-tracker__nav-arrow--left");
const rightArrow = document.querySelector(".aim-tracker__nav-arrow--right");
const monthsContainer = document.querySelector(".aim-tracker__months-container");
const addBtn = document.querySelector(".aim-tracker__add-aim-btn");
const monthEl = document.querySelector(".aim-tracker__month-name");
const monthPrev = document.querySelector(".aim-tracker__month-nav--prev");
const monthNext = document.querySelector(".aim-tracker__month-nav--next");

const DateTime = luxon.DateTime;

const date = DateTime.now().setLocale("de");
const year = date.year;
let currentMonth = date.month;

let prevMonth = date.minus({ month: 1 }).month;
let nextMonth = date.plus({ month: 1 }).month;
let currentMonthName = date.toFormat("LLLL");

const defaultRows = 8;
let rowId = 0;
let scrollAmount;

monthEl.textContent = `${currentMonthName} ${year}`;

const createAimRows = (rows = 1) => {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= rows; i++) {
    const aimRow = document.createElement("div");
    const aim = document.createElement("div");
    const interval = document.createElement("div");
    const deleteBtn = document.createElement("span");
    const deleteIcon = document.createElement("i");
    const arrowWrapper = document.createElement("div");
    const arrowIcon = document.createElement("i");

    rowId++;

    aimRow.classList.add("aim-tracker__aim-row", "aim-tracker__aim-row--visible");
    aimRow.setAttribute("data-row-id", rowId);
    aim.textContent = "Ziel";
    aim.classList.add("aim-tracker__aim");
    interval.textContent = "Zeit";
    interval.classList.add("aim-tracker__interval");
    deleteBtn.classList.add("aim-tracker__delete-btn");
    deleteBtn.setAttribute("data-row-id", rowId);
    deleteIcon.classList.add("fa-regular", "fa-circle-xmark", "aim-tracker__delete-btn-icon");

    arrowWrapper.classList.add("aim-tracker__aim-arrow-wrapper");
    arrowIcon.classList.add("fa-solid", "fa-arrow-right-long", "fa-xl", "aim-tracker__aim-arrow");

    arrowWrapper.append(arrowIcon);
    deleteBtn.append(deleteIcon);
    aimRow.append(deleteBtn, aim, interval, arrowWrapper);

    deleteBtn.addEventListener("click", (e) => {
      const id = deleteBtn.getAttribute("data-row-id");
      const aimRow = document.querySelector(`.aim-tracker__aim-row[data-row-id="${id}"]`);
      const checkRow = document.querySelector(`.aim-tracker__check-row[data-row-id="${id}"]`);
      const reviewRow = document.querySelector(`.aim-tracker__review-row[data-row-id="${id}"]`);

      aimRow.classList.remove("aim-tracker__aim-row--visible");
      checkRow.classList.remove("aim-tracker__check-row--visible");
      reviewRow.classList.remove("aim-tracker__review-row--visible");
      setTimeout(() => {
        aimRow.remove();

        checkRow.remove();

        reviewRow.remove();
      }, 300);
    });

    aim.addEventListener("click", (e) => {
      editEntry(aim);
    });
    interval.addEventListener("click", () => {
      editEntry(interval);
    });

    fragment.appendChild(aimRow);
  }
  return fragment;
};

const createDaysLabel = (month) => {
  const fragment = document.createDocumentFragment();
  const date = DateTime.local(year, month);
  let daysInMonth = date.daysInMonth;
  for (let day = 1; day <= daysInMonth; day++) {
    const date = DateTime.local(year, month, day);
    const weekday = date.weekday;
    const label = document.createElement("div");
    label.classList.add("aim-tracker__day-label");
    label.textContent = `${day}`;
    if (weekday === 6 || weekday === 7) {
      label.classList.add("aim-tracker__day-label--weekend");
    }
    label.setAttribute("data-date", date.toFormat("yyyy-MM-dd"));
    fragment.appendChild(label);
  }
  return fragment;
};

const createCheckRows = (month, rows = 1) => {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= rows; i++) {
    const date = DateTime.local(year, month);
    let daysInMonth = date.daysInMonth;
    const row = document.createElement("div");
    row.classList.add("aim-tracker__check-row", "aim-tracker__check-row--visible");
    row.setAttribute("data-row-id", rowId);

    for (let day = 1; day <= daysInMonth; day++) {
      const checkField = document.createElement("div");
      const date = DateTime.local(year, month, day);
      const weekday = date.weekday;
      checkField.classList.add("aim-tracker__check-field");
      checkField.setAttribute("data-date", date.toFormat("yyyy-MM-dd"));
      checkField.setAttribute("data-checked", false);

      if (weekday === 6 || weekday === 7) {
        checkField.classList.add("aim-tracker__check-field--weekend");
      }

      row.append(checkField);

      checkField.addEventListener("click", (e) => {
        isChecked = checkField.getAttribute("data-checked") === "true";
        isChecked = !isChecked;
        checkField.setAttribute("data-checked", isChecked);
        if (isChecked) {
          const icon = document.createElement("i");
          icon.className = "fa-solid fa-x aim-tracker__checkfield-icon";
          checkField.appendChild(icon);
        } else {
          checkField.innerHTML = "";
        }
      });

      fragment.appendChild(row);
    }
  }

  return fragment;
};

const createReviewRows = (rows = 1) => {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= rows; i++) {
    const reviewRow = document.createElement("div");
    const reviewEval = document.createElement("div");
    const reviewBounty = document.createElement("div");
    const reviewChecked = document.createElement("div");

    reviewRow.classList.add("aim-tracker__review-row", "aim-tracker__review-row--visible");
    reviewRow.setAttribute("data-row-id", rowId);

    reviewEval.classList.add("aim-tracker__review-eval");
    reviewEval.textContent = " / ";

    reviewBounty.classList.add("aim-tracker__review-bounty");
    reviewChecked.classList.add("aim-tracker__review-checked");
    reviewChecked.setAttribute("data-checked", false);

    reviewRow.append(reviewEval);
    reviewRow.append(reviewBounty);
    reviewRow.append(reviewChecked);

    reviewEval.addEventListener("click", () => {
      editEntry(reviewEval, true);
    });

    reviewBounty.addEventListener("click", () => {
      editEntry(reviewBounty);
    });

    reviewChecked.addEventListener("click", () => {
      isChecked = reviewChecked.getAttribute("data-checked") === "true";

      isChecked = !isChecked;
      reviewChecked.setAttribute("data-checked", isChecked);

      if (isChecked) {
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-check aim-tracker__review-check-icon";
        reviewChecked.appendChild(icon);
      } else {
        reviewChecked.innerHTML = "";
      }
    });

    fragment.appendChild(reviewRow);
  }
  return fragment;
};

const editEntry = (entry, setCursorToStart) => {
  const currentText = entry.textContent;
  const input = document.createElement("input");

  input.type = "text";
  input.value = currentText;

  input.classList.add("aim-tracker__edit-input");
  entry.classList.add("aim-tracker__aim--editing");
  entry.innerHTML = "";
  entry.append(input);

  input.focus();
  if (setCursorToStart) {
    input.setSelectionRange(0, 0);
  }

  input.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const textContent = input.value.trim() !== "" ? input.value : currentText;
      const textNode = document.createTextNode(textContent);
      entry.insertBefore(textNode, entry.firstChild);
      entry.removeChild(input);
      entry.classList.remove("aim-tracker__aim--editing");
    }
  });

  input.addEventListener("blur", () => {
    const textContent = input.value.trim() !== "" ? input.value : currentText;
    const textNode = document.createTextNode(textContent);
    entry.insertBefore(textNode, entry.firstChild);
    entry.removeChild(input);
    entry.classList.remove("aim-tracker__aim--editing");
  });
};

const addRow = () => {
  const aimRow = createAimRows();
  aimsContainer.appendChild(aimRow);

  const checkRow = createCheckRows();
  checkFieldContainer.appendChild(checkRow);

  const reviewRow = createReviewRows();
  reviewContainer.appendChild(reviewRow);

  setTimeout(() => {
    aimRow.classList.add("aim-tracker__aim-row--visible");
    checkRow.classList.add("aim-tracker__check-row--visible");
    reviewRow.classList.add("aim-tracker__review-row--visible");
  }, 10);
};

const init = () => {
  const aimsFragment = createAimRows(defaultRows);
  aimsContainer.appendChild(aimsFragment);

  const reviewsFragment = createReviewRows(defaultRows);
  reviewContainer.appendChild(reviewsFragment);
  initMonths();
};

const initMonths = () => {
  monthsContainer.innerHTML = "";

  for (let i = -2; i <= 2; i++) {
    const month = document.createElement("div");
    month.classList.add("aim-tracker__month-container");

    const labelsContainer = document.createElement("div");
    labelsContainer.classList.add("aim-tracker__labels-container");

    const checkFieldContainer = document.createElement("div");
    checkFieldContainer.classList.add("aim-tracker__check-field-container");

    const labelsFragment = createDaysLabel((currentMonth + i + 12) % 12);
    labelsContainer.append(labelsFragment);

    const checkFieldFragment = createCheckRows((currentMonth + i + 12) % 12, defaultRows);
    checkFieldContainer.appendChild(checkFieldFragment);
    month.append(labelsContainer, checkFieldContainer);
    monthsContainer.append(month);
  }
};

const checkField = document.querySelector(".aim-tracker__check-field");
const deleteBtn = document.querySelector(".aim-tracker__delete-btn");

leftArrow.addEventListener("click", () => {
  scrollAmount = monthsContainer.offsetWidth / 2 - 1.5;

  monthsContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

rightArrow.addEventListener("click", () => {
  scrollAmount = monthsContainer.offsetWidth / 2 - 1.5;

  monthsContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

addBtn.addEventListener("click", () => {
  addRow();
});

monthPrev.addEventListener("click", () => {
  nextMonth = currentMonth;
  currentMonth = prevMonth;
  prevMonth = prevMonth - 1;
  createDayLabel();
  checkFieldContainer.innerHTML = "";
  currentMonthName = DateTime.local(year, currentMonth).setLocale("de").toFormat("LLLL");
  monthEl.textContent = `${currentMonthName} ${year}`;
  for (let i = 0; i < 8; i++) {
    const checkRow = createCheckRow();
    checkFieldContainer.appendChild(checkRow);
    checkRow.classList.add("aim-tracker__check-row--visible");
  }
});

monthNext.addEventListener("click", () => {
  prevMonth = currentMonth;
  currentMonth = nextMonth;
  nextMonth = nextMonth + 1;
  createDayLabel();
  checkFieldContainer.innerHTML = "";
  currentMonthName = DateTime.local(year, currentMonth).setLocale("de").toFormat("LLLL");
  monthEl.textContent = `${currentMonthName} ${year}`;
  for (let i = 0; i < 8; i++) {
    const checkRow = createCheckRow();
    checkFieldContainer.appendChild(checkRow);
    checkRow.classList.add("aim-tracker__check-row--visible");
  }
});

init();
