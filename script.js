const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  const i = createIcon('fa-solid fa-xmark');
  button.appendChild(i);
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = '';
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

//Event listeners
itemForm.addEventListener('submit', addItem);
