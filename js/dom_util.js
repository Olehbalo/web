//

const titleInput = document.getElementById("title_input");
const priceInput = document.getElementById("price_input");
const itemsContainer = document.getElementById("items_container");

// local functions 
const getItemId = (id) => `item-${id}`;


const itemTemplate = ({ id, title, price }) => `
    <li id="${getItemId(id)}" class="item-card">
        <img
        src="https://crmtools.com.ua/wp-content/uploads/2019/05/main_banner.jpg"
        class="card-img"
        width="375"
        alt="card image"
        />
        <div class="card-body">
            <div>
                <h5 class="card-title">${title}</h5>
                <p class="card-paragraph">${price}</p>
            </div>
        </div>
    </li>
`



export const clearInputs = () => {
    titleInput.value = "";
    priceInput.value = "";
};

export const addItemToPage = ({ id, title, price}) => {
    itemsContainer.insertAdjacentHTML(
        "beforeend",
        itemTemplate({ id, title, price })
    );

};

export const renderItemsList = (items) => {
    itemsContainer.innerHTML = "";
    
    for (const item of items) {
        addItemToPage(item);
    }
};

export const getInputValues = () => {
    return {
        title: titleInput.value,
        price: priceInput.value,
    };
};