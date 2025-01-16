document.addEventListener('DOMContentLoaded', () => {
    function loadFromLocalStorage() {
        // Load myList from localStorage
        const storedMyList = localStorage.getItem('myList');
        if (storedMyList) {
            window.myList = JSON.parse(storedMyList);
        } else {
            window.myList = [];
        }
    }

    loadFromLocalStorage();

    function renderItems(items, containerSelector, emptyMessage) {
        const container = document.querySelector(containerSelector);
        container.innerHTML = ''; // Clear the container before rendering

        if (items.length === 0) {
            container.innerHTML = `<p>${emptyMessage}</p>`;
            return;
        }

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('mylist-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="mylist-info">
                    <h3>${item.title}</h3>
                    <p>Year: ${item.year}</p>
                    <p>Genre: ${item.genre}</p>
                    <p>Rating: ${item.rating}</p>
                    <button class="remove-from-list-btn">Remove from My List</button>
                </div>
            `;
            container.prepend(itemElement); // Add to the beginning of the container

            itemElement.querySelector('.remove-from-list-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event propagation
                removeFromMyList(item, e.target);
            });

            itemElement.addEventListener('click', () => {
                localStorage.setItem('selectedItem', JSON.stringify(item));
                window.location.href = 'details.html';
            });
        });
    }

    function removeFromMyList(item, button) {
        window.myList = window.myList.filter(existingItem => existingItem.title !== item.title);
        localStorage.setItem('myList', JSON.stringify(window.myList));
        renderItems(window.myList, '.mylist-grid', 'No items in your list.');
    }

    function filterItems(query) {
        const filteredMyList = window.myList.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        renderItems(filteredMyList, '.mylist-grid', 'No items in your list.');
    }

    document.getElementById('search-input').addEventListener('input', (e) => {
        filterItems(e.target.value);
    });

    renderItems(window.myList, '.mylist-grid', 'No items in your list.');
});

heroLink.addEventListener('click', () => {
    localStorage.setItem('selectedItem', JSON.stringify(movie));
});