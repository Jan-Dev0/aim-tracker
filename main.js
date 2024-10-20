const aimsContainer = document.querySelector(".aim-tracker__aims-container");
const reviewContainer = document.querySelector(".aim-tracker__review-container");
const leftBtn = document.querySelector(".aim-tracker__nav-arrow--left");
const rightBtn = document.querySelector(".aim-tracker__nav-arrow--right");
const monthsContainer = document.querySelector(".aim-tracker__months-container");
const monthsWrapper = document.querySelector(".aim-tracker__months-wrapper");
const addBtn = document.querySelector(".aim-tracker__add-aim-btn");
const monthEl = document.querySelector(".aim-tracker__month-name");
const prevMonth = document.querySelector(".aim-tracker__month-nav--prev");
const nextMonth = document.querySelector(".aim-tracker__month-nav--next");



const colors = [
  { light: "var(--peach-light)", medium: "var(--peach-medium)", dark: "var(--peach-dark)" },
  { light: "var(--arylide-yellow-light)", medium: "var(--arylide-yellow-medium)", dark: "var(--arylide-yellow-dark)" },
  { light: "var(--thistle-light)", medium: "var(--thistle-medium)", dark: "var(--thistle-dark)" },
  { light: "var(--apricot-light)", medium: "var(--apricot-medium)", dark: "var(--apricot-dark)" },
  { light: "var(--non-photo-blue-light)", medium: "var(--non-photo-blue-medium)", dark: "var(--non-photo-blue-dark)" },
  { light: "var(--thistle-2-light)", medium: "var(--thistle-2-medium)", dark: "var(--thistle-2-dark)" },
  { light: "var(--light-green-light)", medium: "var(--light-green-medium)", dark: "var(--light-green-dark)" },
  { light: "var(--apricot-2-light)", medium: "var(--apricot-2-medium)", dark: "var(--apricot-2-dark)" },
  {
    light: "var(--columbia-blue-2-light)",
    medium: "var(--columbia-blue-2-medium)",
    dark: "var(--columbia-blue-2-dark)",
  },
  { light: "var(--ash-gray-light)", medium: "var(--ash-gray-medium)", dark: "var(--ash-gray-dark)" },
  { light: "var(--french-gray-light)", medium: "var(--french-gray-medium)", dark: "var(--french-gray-dark)" },
  { light: "var(--fairy-tale-light)", medium: "var(--fairy-tale-medium)", dark: "var(--fairy-tale-dark)" },
];

const DateTime = luxon.DateTime;

const date = DateTime.now().setLocale("de");
let year = date.year;
let currentMonth = date.month;
let currentMonthName = date.toFormat("LLLL");

const defaultRows = 8;
let totalRows = 0;

monthEl.textContent = `${currentMonthName} ${year}`;

const createAimRow = (rowNumber) => {
  const aimRow = document.createElement("div");
  const aim = document.createElement("div");
  const interval = document.createElement("div");
  const deleteBtn = document.createElement("span");
  const deleteIcon = document.createElement("i");
  const arrowWrapper = document.createElement("div");
  const arrowIcon = document.createElement("i");

  aimRow.classList.add("aim-tracker__aim-row");
  aimRow.setAttribute("data-row-id", rowNumber);
  aim.textContent = "Ziel";
  aim.classList.add("aim-tracker__aim");
  interval.textContent = "Zeit";
  interval.classList.add("aim-tracker__interval");
  deleteBtn.classList.add("aim-tracker__delete-btn");
  deleteBtn.setAttribute("data-row-id", rowNumber);
  deleteIcon.classList.add("fa-regular", "fa-circle-xmark", "aim-tracker__delete-btn-icon");

  arrowWrapper.classList.add("aim-tracker__aim-arrow-wrapper");
  arrowIcon.classList.add("fa-solid", "fa-arrow-right-long", "fa-xl", "aim-tracker__aim-arrow");

  arrowWrapper.append(arrowIcon);
  deleteBtn.append(deleteIcon);
  aimRow.append(deleteBtn, aim, interval, arrowWrapper);

  deleteBtn.addEventListener("click", (e) => {
    const id = deleteBtn.getAttribute("data-row-id");
    const aimRow = document.querySelector(`.aim-tracker__aim-row[data-row-id="${id}"]`);
    const reviewRow = document.querySelector(`.aim-tracker__review-row[data-row-id="${id}"]`);
    const checkRows = document.querySelectorAll(`.aim-tracker__check-row[data-row-id="${id}"]`);
    totalRows--;

    aimRow.classList.remove("aim-tracker__row--visible");
    checkRows.forEach((checkRow) => checkRow.classList.remove("aim-tracker__row--visible"));
    reviewRow.classList.remove("aim-tracker__row--visible");
    setTimeout(() => {
      aimRow.remove();

      checkRows.forEach((checkRow) => checkRow.remove());

      reviewRow.remove();
    }, 300);
  });

  aim.addEventListener("click", (e) => {
    editEntry(aim);
  });
  interval.addEventListener("click", () => {
    editEntry(interval);
  });

  return aimRow;
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
      label.style.backgroundColor = colors[month - 1].medium;
    }
    label.setAttribute("data-date", date.toFormat("yyyy-MM-dd"));
    fragment.appendChild(label);
  }
  return fragment;
};

const createCheckRow = (month, rowNumber) => {
  const date = DateTime.local(year, month);
  let daysInMonth = date.daysInMonth;
  const row = document.createElement("div");

  row.classList.add("aim-tracker__check-row");
  row.setAttribute("data-row-id", rowNumber);

  for (let day = 1; day <= daysInMonth; day++) {
    const checkField = document.createElement("div");
    const date = DateTime.local(year, month, day);
    const weekday = date.weekday;
    checkField.classList.add("aim-tracker__check-field");
    checkField.setAttribute("data-date", date.toFormat("yyyy-MM-dd"));
    checkField.setAttribute("data-checked", false);

    if (weekday === 6 || weekday === 7) {
      checkField.classList.add("aim-tracker__check-field--weekend");
      checkField.style.backgroundColor = colors[month - 1].medium;
    }

    row.append(checkField);

    checkField.addEventListener("click", (e) => {
      let isChecked = checkField.getAttribute("data-checked") === "true";
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
  }

  return row;
};

const createReviewRow = (rowNumber) => {
  const reviewRow = document.createElement("div");
  const reviewEval = document.createElement("div");
  const reviewBounty = document.createElement("div");
  const reviewChecked = document.createElement("div");

  reviewRow.classList.add("aim-tracker__review-row");
  reviewRow.setAttribute("data-row-id", rowNumber);

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

  return reviewRow;
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
  totalRows++;

  const aimRow = createAimRow(totalRows);
  aimsContainer.appendChild(aimRow);

  const reviewRow = createReviewRow(totalRows);
  reviewContainer.appendChild(reviewRow);

  const months = document.querySelectorAll(".aim-tracker__month-container");
  months.forEach((month, index) => {
    const checkFieldContainer = month.querySelector(".aim-tracker__check-field-container");
    const monthIndex = (currentMonth + index - 2 + 12) % 12;
    const newCheckRow = createCheckRow(monthIndex, totalRows);
    checkFieldContainer.appendChild(newCheckRow);
  });

  setTimeout(() => {
    const newCheckRows = document.querySelectorAll(`.aim-tracker__check-row[data-row-id="${totalRows}"]`);
    [aimRow, reviewRow, ...newCheckRows].forEach((row) => row.classList.add("aim-tracker__row--visible"));
  }, 100);
};

const init = () => {
  for (let row = 1; row <= defaultRows; row++) {
    totalRows++;
    const aimRow = createAimRow(row);
    aimRow.classList.add("aim-tracker__row--visible");
    aimsContainer.appendChild(aimRow);

    const reviewRow = createReviewRow(row);
    reviewRow.classList.add("aim-tracker__row--visible");
    reviewContainer.appendChild(reviewRow);
  }
  initMonths();
};

const initMonths = () => {
  monthsWrapper.innerHTML = "";

  for (let i = -2; i <= 2; i++) {
    const monthIndex = ((currentMonth + i - 1 + 12) % 12) + 1;
    const monthEl = createMonthElement(monthIndex);
    monthsWrapper.append(monthEl);
  }
  const monthWidth = monthsWrapper.children[0].offsetWidth + monthsWrapper.children[1].offsetWidth;
 monthsWrapper.style.transform = `translateX(-${monthWidth}px)`;
  updateCurrentMonthClass();
};

const createMonthElement = (monthIndex) => {
  const monthEl = document.createElement("div");
  monthEl.classList.add("aim-tracker__month-container");

  monthEl.style.backgroundColor = colors[monthIndex - 1].light;
  monthEl.setAttribute("data-month", DateTime.local(year, monthIndex).toFormat("LLLL"));

  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("aim-tracker__labels-container");

  const checkFieldContainer = document.createElement("div");
  checkFieldContainer.classList.add("aim-tracker__check-field-container");

  const labelsFragment = createDaysLabel(monthIndex);
  labelsContainer.append(labelsFragment);

  for (let row = 1; row <= defaultRows; row++) {
    const checkRow = createCheckRow(monthIndex, row);
    checkRow.classList.add("aim-tracker__row--visible");
    checkFieldContainer.appendChild(checkRow);
  }

  monthEl.append(labelsContainer, checkFieldContainer);

  return monthEl;
};

init();


function scrollMonths(direction) {
   const monthWidth = monthsWrapper.children[0].offsetWidth + monthsWrapper.children[1].offsetWidth;
  const months = [...monthsWrapper.children];
  
  if (direction === "next") {
    const width = months[0].offsetWidth + months[1].offsetWidth + months[2].offsetWidth;
    
    [currentMonth, year] = currentMonth + 1 > 12 ? [1, year + 1] : [currentMonth + 1, year];
    let date = DateTime.local(year, currentMonth).setLocale("de");
    monthEl.textContent = `${date.toFormat('LLLL')} ${year}`;
    monthsWrapper.style.transform = `translateX(-${width}px)`;

  } else {
    const width = document.querySelector('.aim-tracker__current-month').offsetWidth;
    
    [currentMonth, year] = currentMonth - 1 < 1 ? [12, year - 1] : [currentMonth - 1, year];
    let date = DateTime.local(year, currentMonth).setLocale("de");
    monthEl.textContent = `${date.toFormat('LLLL')} ${year}`;
    monthsWrapper.style.transform = `translateX(-${width}px)`;
  }

  disableButtons();

  setTimeout(() => {
    if (direction === "next") {
      monthsWrapper.removeChild(monthsWrapper.firstChild);
      const newMonth = createMonthElement((currentMonth + 2) % 12);
      monthsWrapper.appendChild(newMonth);
    } else {
      monthsWrapper.removeChild(monthsWrapper.lastChild);
      const newMonth = createMonthElement((currentMonth - 2 + 12) % 12);
      monthsWrapper.insertBefore(newMonth, monthsWrapper.firstChild);
    }

    // Reset the position to center the current month again
    const width = months[0].offsetWidth + months[1].offsetWidth + months[2].offsetWidth;
    monthsWrapper.style.transition = "none";
    monthsWrapper.style.transform = `translateX(-${width}px)`;

    // Update the "current" class after the new elements are in place
    updateCurrentMonthClass();

    // Re-enable the transition and buttons after a brief delay
    setTimeout(() => {
      monthsWrapper.style.transition = "transform 0.5s ease";
      enableButtons();
    }, 50);
  }, 300);
}

function updateCurrentMonthClass() {
  const months = monthsWrapper.children;
  for (let i = 0; i < months.length; i++) {
    months[i].classList.remove("aim-tracker__current-month");
  }
  months[2].classList.add("aim-tracker__current-month");
}

function disableButtons() {
  prevMonth.disabled = true;
  nextMonth.disabled = true;
}

function enableButtons() {
  prevMonth.disabled = false;
  nextMonth.disabled = false;
}

addBtn.addEventListener("click", () => {
  addRow();
});

leftBtn.addEventListener("click", () => {

  monthsWrapper.style.transform += `translateX(42rem)`;
});

rightBtn.addEventListener("click", () => {
  monthsWrapper.style.transform += `translateX(-42rem)`;
});

prevMonth.addEventListener("click", () => scrollMonths("prev"));
nextMonth.addEventListener("click", () => scrollMonths("next"));
