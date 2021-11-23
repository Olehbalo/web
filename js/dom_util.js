export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = 'delete-button-';


const nameInput = document.getElementById("name_input");
const tankInput = document.getElementById("tank_input");
const numberInput = document.getElementById("number_input");

const itemsContainer = document.getElementById("container__items");

const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id,  name, tank, number }) => `
<li id="${getItemId(id)}" class="item-card">
    <img 
        src="https://crmtools.com.ua/wp-content/uploads/2019/05/main_banner.jpg"
        class="item-container__image" alt="card">
    <div>
        <h5>${name}</h5>
        <p> Tank Volume(li) - ${tank} </p>
        <p>Number of passenger - ${number} </p>
        <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="default_button">Edit</button>
        <button id="${DELETE_BUTTON_PREFIX}${id}" type="button" class="default_button">Delete</button>
    </div>
</li>`;

export const addItemToPage = ({id,  name, tank, number}, onEditItem, onDeleteItem) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin", 
        itemTemplate({id,  name, tank, number})
    );

    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
    const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);

    editButton.addEventListener("click", onEditItem);
    deleteButton.addEventListener("click", onDeleteItem);
};

export const renderItemsList = (items, onEditItem, onDeleteItem) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item, onEditItem, onDeleteItem);
    }
};

export const clearInputs = () => {
    nameInput.value = "";
    tankInput.value = "";
    numberInput.value = "";
};

export const getInputValues = () => {
    return {
        name: nameInput.value,
        tank: tankInput.value,
        number: numberInput.value,
    };
};
