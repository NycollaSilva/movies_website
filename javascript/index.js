document.addEventListener('DOMContentLoaded', () => {
    function loadFromLocalStorage() {
        const storedMovies = localStorage.getItem('movies');
        const storedSeries = localStorage.getItem('series');
        const storedMyList = localStorage.getItem('myList');
        if (storedMovies) {
            window.movies = JSON.parse(storedMovies);
        }
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
            itemElement.classList.add('movie-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="movie-info">
                    <h3>${item.title}</h3>
                    <p>Year: ${item.year}</p>
                    <p>Genre: ${item.genre}</p>
                    <p>Rating: ${item.rating}</p>
                    <button class="add-to-list-btn">${isInMyList(item) ? 'Added to My List' : 'Add to My List'}</button>
                </div>
            `;
            container.appendChild(itemElement); // Add to the end of the container

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
        const filteredMovies = window.movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        const filteredSeries = window.series.filter(serie => serie.title.toLowerCase().includes(query.toLowerCase()));
        renderItems(filteredMovies, '.movie-grid', 'No movies available.');
        renderItems(filteredSeries, '.series-grid', 'No series available.');
    }

    document.getElementById('search-input').addEventListener('input', (e) => {
        filterItems(e.target.value);
    });

    function setFeaturedMovie(movie) {
        const heroBackground = document.getElementById('hero-background');
        const heroPoster = document.getElementById('hero-poster');
        const heroLink = document.getElementById('hero-link');
        const watchButton = document.getElementById('watch-button');
        const addToListButton = document.getElementById('add-to-list-button');

        heroBackground.style.backgroundImage = `url(${movie.backgroundImage})`;
        heroPoster.src = movie.image;
        heroPoster.alt = movie.title;

        heroLink.addEventListener('click', () => {
            localStorage.setItem('selectedItem', JSON.stringify(movie));
        });

        watchButton.addEventListener('click', () => {
            localStorage.setItem('selectedItem', JSON.stringify(movie));
            window.location.href = 'details.html';
        });

        addToListButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event propagation
            addToMyList(movie, addToListButton);
        });
    }

    // Set the featured movie (the first movie in the list)
    if (window.movies.length > 0) {
        setFeaturedMovie(window.movies[0]);
    }

    renderItems(window.movies, '.movie-grid', 'No movies available.');
    renderItems(window.series, '.series-grid', 'No series available.');
});

function scrollLeft(containerSelector) {
    const container = document.querySelector(containerSelector);
    container.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}

function scrollRight(containerSelector) {
    const container = document.querySelector(containerSelector);
    container.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}