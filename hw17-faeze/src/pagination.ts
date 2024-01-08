import { onLoad, totalPages,mostAlltask } from "./getAllUser";
import { filterStatusT ,allDone} from "./filter";
let pageNumber: number = 1;

export const paginationContainer = <HTMLDivElement>(
  document.getElementById("pagination-container")
);
const paginationButtons = <HTMLDivElement>(
  document.getElementById("pagination-buttons")
);
const onClickNext = <HTMLDivElement>(
  document.getElementById("on-click-next-page")
);
const onClickPrevious = <HTMLDivElement>(
  document.getElementById("on-click-previous-page")
);

export function paginationButton(page: number, isActive = false) {
  if (isActive) {
    return `
    <p
       aria-current="page"
       class="curser-pointer inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600 cursor-pointer">
       ${page}
    </p>
    `;
  }
  return `
    <p
      class="curser-pointer inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 cursor-pointer hover:text-gray-700">
      ${page}
     </p>
    `;
}

export function paginationButtonsListRender(
  totalPages: number,
  activePage: number
) {
  let html = "";

  for (let page = 1; page <= totalPages; page++) {
    html += paginationButton(page, activePage === page);
  }

  paginationButtons.innerHTML = html;
}

paginationButtons.addEventListener("click", (ev: any) => {
  const clickedPageNumber = Number(ev.target.innerText);
  if (!isNaN(clickedPageNumber)) {
    pageNumber = clickedPageNumber;
    if (mostAlltask.classList.contains("active")) {
      // "all" button is active
      onLoad(pageNumber);
    } else if (allDone.classList.contains("active")) {
      // "done" button is active
      filterStatusT(pageNumber);
    }
  }
});

onClickPrevious.addEventListener("click", () => {
  if (pageNumber > 1) {
    pageNumber--;
    if (mostAlltask.classList.contains("active")) {
      onLoad(pageNumber);
    } else if (allDone.classList.contains("active")) {
      filterStatusT(pageNumber);
    }
  }
});

onClickNext.addEventListener("click", () => {
  if (pageNumber < totalPages) {
    pageNumber++;
    if (mostAlltask.classList.contains("active")) {
      onLoad(pageNumber);
    } else if (allDone.classList.contains("active")) {
      filterStatusT(pageNumber);
    }
  }
});
