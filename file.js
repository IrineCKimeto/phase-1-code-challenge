const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');


async function fetchItems() {
    try {
        const response = await fetch('https://api.example.com/items'); 
        const items = await response.json();
        items.forEach(item => addItemToDOM(item));
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}


function addItemToDOM(item) {
    const li = document.createElement('li');
    li.textContent = item.name; 
    itemList.appendChild(li);
}


itemForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newItem = { name: itemInput.value };

    try {
        const response = await fetch('https://api.example.com/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });
        
        if (response.ok) {
            const addedItem = await response.json();
            addItemToDOM(addedItem);
            itemInput.value = '';
        } else {
            console.error('Error adding item:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


fetchItems();