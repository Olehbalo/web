import { deletePlane, getAllPlane, postPlane, updatePlane } from "./api.js";
import {
    getInputValues,
    renderItemsList,
    EDIT_BUTTON_PREFIX,
    DELETE_BUTTON_PREFIX,
    clearInputs
} from "./dom_util.js";


const formField = document.getElementById("item_form");
const submitButton = document.getElementById("submit_button");


const searchButton = document.getElementById("search__button");
const clearSearchButton = document.getElementById("clear__search__button");
const searchInput = document.getElementById("search__input");
const sortCheckbox = document.getElementById("sort__checkbox");
const countButton = document.getElementById("count__button");

let plane = [];

const onEditItem = async (e) => {
    const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");

    await updatePlane(itemId, getInputValues());

    clearInputs();

    refetchAllPlanes();
};

const onDeleteItem = async(event) => {
    const planeId = event.target.id.replace(DELETE_BUTTON_PREFIX, "")
    await     deletePlane(planeId);

    refetchAllPlanes();
}



export const refetchAllPlanes = async () => {
    const allPlanes = await getAllPlane();
    
    plane = allPlanes.sort((a, b) => b.name.localeCompare(a.name));

    renderItemsList(plane, onEditItem, onDeleteItem);
    
};

const validateInput = () => { 
var letters = /^[A-Za-z]+$/;
if(formField.length.match(letters))
{
return true;
}
else
{
alert('Username must have alphabetcharactersonly');
formField.focus();
return false;
}
}
submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!validateInput()) {
        return;
    };

    const {  name, tank, number } = getInputValues();

    clearInputs();

    postPlane({
        name, 
        tank,
        number
    }).then(refetchAllPlanes);
});

searchButton.addEventListener("click", () => {
    const foundPlanes = plane.filter(
        (planes) => planes.name.search(searchInput.value) !== -1
        );

    renderItemsList(foundPlanes, onEditItem, onDeleteItem);
});

clearSearchButton.addEventListener('click', () => {
    renderItemsList(plane, onEditItem, onDeleteItem);

    searchInput.value = "";
});

sortCheckbox.addEventListener("change", function() {
    if (this.checked) {
        const sortedPlanes = plane.sort(
            (a, b) => parseInt(a.number) - parseInt(b.number));
        
        renderItemsList(sortedPlanes, onEditItem, onDeleteItem);
    } else {
        refetchAllPlanes();
    }
});

countButton.addEventListener("click", () => {
    let sum = plane.map(o => o.number).reduce((a, c) => { return a + c });
    document.getElementById("total-number").innerText = sum;
    console.log(sum);
});

refetchAllPlanes();
