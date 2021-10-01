import {
  addItemToPage,
  clearInputs,
  renderItemsList,
  getInputValues,
} from "./dom_util.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const itemsCounter = document.getElementById("items_counter");
const itemsSortASC = document.getElementById("sort_items_asc");
const itemsSortDESC = document.getElementById("sort_items_desc");

let cameras = [];

itemsSortASC.addEventListener("click", (event) => {
  event.preventDefault();

  cameras.sort((a, b) => (a.memory > b.memory) ? 1 : -1);

  renderItemsList(cameras);
});

itemsSortDESC.addEventListener("click", (event) => {
  event.preventDefault();

  cameras.sort((a, b) => (a.memory < b.memory) ? 1 : -1);

  renderItemsList(cameras);
});

const addItem = ({ title, memory, zoom }) => {
  const generatedId = () => Math.random().toString(36).substr(2, 9);

  const newItem = {
      id: generatedId,
      title,
      memory,
      zoom,
  };

  cameras.push(newItem);

  addItemToPage(newItem);
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const { title, memory, zoom } = getInputValues();

  clearInputs();

  addItem({
      title,
      memory: memory,
      zoom: zoom,
  });

});

findButton.addEventListener("click", (event) => {
  event.preventDefault();
  const foundCamera = cameras
      .filter(d => d.title.search(findInput.value) !== -1);
  
  itemsCounter.innerHTML = `${foundCamera.length}`;

  renderItemsList(foundCamera);
});

cancelFindButton.addEventListener("click", (event) => {
  event.preventDefault();

  renderItemsList(cameras);

  itemsCounter.innerHTML = `${cameras.length}`;
  findInput.value = "";
});

renderItemsList(cameras);