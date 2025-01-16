document.addEventListener('DOMContentLoaded', () => {
    function loadFromLocalStorage() {
        // Load series and myList from localStorage
        const storedSeries = localStorage.getItem('series');
        const storedMyList = localStorage.getItem('myList');
        if (storedSeries) {
            window.series = JSON.parse(storedSeries);
        }
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
            itemElement.classList.add('series-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="series-info">
                    <h3>${item.title}</h3>
                    <p>Year: ${item.year}</p>
                    <p>Genre: ${item.genre}</p>
                    <p>Rating: ${item.rating}</p>
                    <button class="add-to-list-btn">${isInMyList(item) ? 'Added to My List' : 'Add to My List'}</button>
                </div>
            `;
            container.prepend(itemElement); // Add to the beginning of the container

            itemElement.querySelector('.add-to-list-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event propagation
                addToMyList(item, e.target);
            });

            itemElement.addEventListener('click', () => {
                localStorage.setItem('selectedItem', JSON.stringify(item));
                window.location.href = 'details.html';
            });
        });
    }

    function isInMyList(item) {
        return window.myList.some(existingItem => existingItem.title === item.title);
    }

    function addToMyList(item, button) {
        if (!isInMyList(item)) {
            window.myList.push(item);
            localStorage.setItem('myList', JSON.stringify(window.myList));
            button.textContent = 'Added to My List';
            button.disabled = true;
        }
    }

    function filterItems(query) {
        const filteredSeries = window.series.filter(serie => serie.title.toLowerCase().includes(query.toLowerCase()));
        renderItems(filteredSeries, '.series-grid', 'No series available.');
    }

    document.getElementById('search-input').addEventListener('input', (e) => {
        filterItems(e.target.value);
    });

    renderItems(window.series, '.series-grid', 'No series available.');
});