const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const filter = document.querySelector('#filter');
const items = itemList.querySelectorAll('li');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUi();
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert('Item already exists...');
      return;
    }
  }

  //Create item DOM element
  addItemToDOM(newItem);

  //Save to local storage
  addItemToStorage(newItem);
  checkUi();

  itemInput.value = '';
};

const addItemToDOM = (item) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  const i = createIcon('fa-solid fa-xmark');
  button.appendChild(i);
  li.appendChild(button);

  //Add li
  itemList.appendChild(li);
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  //convert to json string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  return button;
};

const createIcon = (classes) => {
  const i = document.createElement('i');
  i.className = classes;
  return i;
};

const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    deleteItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExist = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
};

const deleteItem = (item) => {
  if (confirm('Are you sure?')) {
    //Remove item from DOM
    item.remove();

    //Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUi();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const clearItems = () => {
  itemList.remove();

  localStorage.removeItem('items');
  checkUi();
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');

  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const checkUi = () => {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clear.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clear.style.display = 'block';
    filter.style.display = 'block';
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
};

//Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clear.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUi();
