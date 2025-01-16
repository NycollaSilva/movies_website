window.movies = [  // Preset movies
    { title: 'Movie 1', image: 'images/movie1.jpg', backgroundImage: 'images/background1.jpg', year: 2023, genre: 'Drama', rating: 8.5, synopsis: 'A young prince explores the universe and learns about love and loss.' },
    { title: 'Movie 2', image: 'images/movie2.jpg', backgroundImage: 'images/background2.jpg', year: 2017, genre: 'Action', rating: 7.8, synopsis: 'A young blade runner discovers a long-buried secret that has the potential to plunge what\'s left of society into chaos.' },
    { title: 'Movie 3', image: 'images/movie3.jpg', backgroundImage: 'images/background3.jpg', year: 2021, genre: 'Comedy', rating: 8.0, synopsis: 'A hilarious journey of friends navigating life and love.' },
];

window.series = [ // Preset series
    { title: 'Serie 1', image: 'images/serie1.jpg', backgroundImage: 'images/background4.jpg', year: 2013, genre: 'Comedy', rating: 9.0, synopsis: 'A group of friends navigate life and relationships while working in academia.', seasons: 12, episodes: 24 },
    { title: 'Serie 2', image: 'images/serie2.jpg', backgroundImage: 'images/background5.jpg', year: 2022, genre: 'Sci-Fi', rating: 8.7, synopsis: 'A thrilling sci-fi adventure through space and time.', seasons: 3, episodes: 10 },
    { title: 'Serie 3', image: 'images/serie3.jpg', backgroundImage: 'images/background6.jpg', year: 2021, genre: 'Drama', rating: 8.3, synopsis: 'A dramatic tale of love, loss, and redemption.', seasons: 2, episodes: 8 },
];

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const listContainer = document.getElementById('list-container');

    const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Horror', 'Romance', 'Adventure'];

    document.getElementById('add-movie-btn').addEventListener('click', () => {
        showForm('movie');
    });

    document.getElementById('add-series-btn').addEventListener('click', () => {
        showForm('series');
    });

    document.getElementById('manage-movies-btn').addEventListener('click', () => {
        showList('movie');
    });

    document.getElementById('manage-series-btn').addEventListener('click', () => {
        showList('series');
    });

    function showForm(type) {
        formContainer.innerHTML = `
            <h3>Add ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <form id="add-${type}-form">
                <label>OMDB URL: <input type="text" id="omdb-url"></label><br>
                <button type="button" id="fetch-omdb-btn">Fetch from OMDB</button><br>
                <label>Title: <input type="text" id="${type}-title"></label><br>
                <label>Image URL: <input type="text" id="${type}-image"></label><br>
                <label>Upload Image: <input type="file" id="${type}-image-upload" accept="image/*"></label><br>
                <label>Background Image URL: <input type="text" id="${type}-background-image"></label><br>
                <label>Upload Background Image: <input type="file" id="${type}-background-image-upload" accept="image/*"></label><br>
                <label>Year: <input type="number" id="${type}-year"></label><br>
                <label>Genre: <input type="text" id="${type}-genre"></label><br>
                <label>Rating: <input type="number" step="0.1" id="${type}-rating"></label><br>
                <label>Synopsis: <textarea id="${type}-synopsis"></textarea></label><br>
                ${type === 'series' ? '<label>Seasons: <input type="number" id="series-seasons"></label><br><label>Episodes: <input type="number" id="series-episodes"></label><br>' : ''}
                <button type="submit">Add ${type.charAt(0).toUpperCase() + type.slice(1)}</button>
            </form>
        `;

        document.getElementById('fetch-omdb-btn').addEventListener('click', fetchFromOMDB);

        document.getElementById(`${type}-image-upload`).addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById(`${type}-image`).value = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        });

        document.getElementById(`${type}-background-image-upload`).addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById(`${type}-background-image`).value = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        });

        document.getElementById(`add-${type}-form`).addEventListener('submit', (e) => {
            e.preventDefault();
            addItem(type);
        });
    }

    async function fetchFromOMDB() {
        const omdbUrl = document.getElementById('omdb-url').value;
        const omdbIdMatch = omdbUrl.match(/(tt\d+)/);
        if (!omdbIdMatch) {
            alert('Invalid OMDB URL');
            return;
        }
        const omdbId = omdbIdMatch[1]; // Extract the OMDB ID from the URL
        const apiKey = '8ea8c787'; // Replace with your OMDB API key

        try {
            const response = await fetch(`http://www.omdbapi.com/?i=${omdbId}&apikey=${apiKey}`);
            const data = await response.json();

            if (data.Response === 'True') {
                const type = data.Type === 'series' ? 'series' : 'movie';
                document.getElementById(`${type}-title`).value = data.Title;
                document.getElementById(`${type}-image`).value = data.Poster;
                document.getElementById(`${type}-background-image`).value = data.Poster; // Use the same poster as background
                document.getElementById(`${type}-year`).value = data.Year;
                document.getElementById(`${type}-genre`).value = data.Genre; // Get all genres
                document.getElementById(`${type}-rating`).value = data.imdbRating;
                document.getElementById(`${type}-synopsis`).value = data.Plot;
                if (type === 'series') {
                    document.getElementById('series-seasons').value = data.totalSeasons;
                    document.getElementById('series-episodes').value = data.totalEpisodes; // Assuming totalEpisodes is available
                }
            } else {
                alert('Item not found!');
            }
        } catch (error) {
            console.error('Error fetching data from OMDB:', error);
            alert('Failed to fetch data from OMDB.');
        }
    }

    function addItem(type) {
        const title = document.getElementById(`${type}-title`).value;
        const image = document.getElementById(`${type}-image`).value;
        const backgroundImage = document.getElementById(`${type}-background-image`).value;
        const year = document.getElementById(`${type}-year`).value;
        const genre = document.getElementById(`${type}-genre`).value;
        const rating = document.getElementById(`${type}-rating`).value;
        const synopsis = document.getElementById(`${type}-synopsis`).value;
        const seasons = type === 'series' ? document.getElementById('series-seasons').value : null;
        const episodes = type === 'series' ? document.getElementById('series-episodes').value : null;

        const newItem = { title, image, backgroundImage, year, genre, rating, synopsis, seasons, episodes };

        if (type === 'movie') {
            window.movies.unshift(newItem); // Add to the beginning of the list
        } else {
            window.series.unshift(newItem); // Add to the beginning of the list
        }

        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
        formContainer.innerHTML = '';
        updateLocalStorage();
        renderItems(window.movies, '.movie-grid');
        renderItems(window.series, '.series-grid');
    }

    function showList(type) {
        listContainer.innerHTML = `
            <h3>Manage ${type.charAt(0).toUpperCase() + type.slice(1)}s</h3>
            <ul>
                ${type === 'movie' ? window.movies.map((movie, index) => `<li>${movie.title} <button onclick="editItem('movie', ${index})">Edit</button> <button onclick="removeItem('movie', ${index})">Remove</button></li>`).join('') : window.series.map((serie, index) => `<li>${serie.title} <button onclick="editItem('series', ${index})">Edit</button> <button onclick="removeItem('series', ${index})">Remove</button></li>`).join('')}
            </ul>
        `;
    }

    window.editItem = function(type, index) {
        const item = type === 'movie' ? window.movies[index] : window.series[index];
        formContainer.innerHTML = `
            <h3>Edit ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <form id="edit-${type}-form">
                <label>Title: <input type="text" id="${type}-title" value="${item.title}"></label><br>
                <label>Image URL: <input type="text" id="${type}-image" value="${item.image}"></label><br>
                <label>Upload Image: <input type="file" id="${type}-image-upload" accept="image/*"></label><br>
                <label>Background Image URL: <input type="text" id="${type}-background-image" value="${item.backgroundImage}"></label><br>
                <label>Upload Background Image: <input type="file" id="${type}-background-image-upload" accept="image/*"></label><br>
                <label>Year: <input type="number" id="${type}-year" value="${item.year}"></label><br>
                <label>Genre: <input type="text" id="${type}-genre" value="${item.genre}"></label><br>
                <label>Rating: <input type="number" step="0.1" id="${type}-rating" value="${item.rating}"></label><br>
                <label>Synopsis: <textarea id="${type}-synopsis">${item.synopsis}</textarea></label><br>
                ${type === 'series' ? `<label>Seasons: <input type="number" id="series-seasons" value="${item.seasons}"></label><br><label>Episodes: <input type="number" id="series-episodes" value="${item.episodes}"></label><br>` : ''}
                <button type="submit">Save Changes</button>
            </form>
        `;

        document.getElementById(`${type}-image-upload`).addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById(`${type}-image`).value = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        });

        document.getElementById(`${type}-background-image-upload`).addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById(`${type}-background-image`).value = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        });

        document.getElementById(`edit-${type}-form`).addEventListener('submit', (e) => {
            e.preventDefault();
            saveItem(type, index);
        });
    }

    function saveItem(type, index) {
        const title = document.getElementById(`${type}-title`).value;
        const image = document.getElementById(`${type}-image`).value;
        const backgroundImage = document.getElementById(`${type}-background-image`).value;
        const year = document.getElementById(`${type}-year`).value;
        const genre = document.getElementById(`${type}-genre`).value;
        const rating = document.getElementById(`${type}-rating`).value;
        const synopsis = document.getElementById(`${type}-synopsis`).value;
        const seasons = type === 'series' ? document.getElementById('series-seasons').value : null;
        const episodes = type === 'series' ? document.getElementById('series-episodes').value : null;

        const updatedItem = { title, image, backgroundImage, year, genre, rating, synopsis, seasons, episodes };

        if (type === 'movie') {
            window.movies[index] = updatedItem;
        } else {
            window.series[index] = updatedItem;
        }

        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
        formContainer.innerHTML = '';
        showList(type);
        updateLocalStorage();
        renderItems(window.movies, '.movie-grid');
        renderItems(window.series, '.series-grid');
    }

    window.removeItem = function(type, index) {
        if (type === 'movie') {
            window.movies.splice(index, 1);
        } else {
            window.series.splice(index, 1);
        }

        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} removed successfully!`);
        showList(type); // Update the list after removal
        updateLocalStorage();
        renderItems(window.movies, '.movie-grid');
        renderItems(window.series, '.series-grid');
    }

    function updateLocalStorage() {
        localStorage.setItem('movies', JSON.stringify(window.movies));
        localStorage.setItem('series', JSON.stringify(window.series));
    }

    function loadFromLocalStorage() {
        const storedMovies = localStorage.getItem('movies');
        const storedSeries = localStorage.getItem('series');
        if (storedMovies) {
            window.movies = JSON.parse(storedMovies);
        }
        if (storedSeries) {
            window.series = JSON.parse(storedSeries);
        }
    }

    loadFromLocalStorage();

    function renderItems(items, containerSelector) {
        const container = document.querySelector(containerSelector);
        container.innerHTML = ''; // Clear the container before rendering
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
                </div>
            `;
            container.prepend(itemElement); // Add to the beginning of the container
        });
    }

    renderItems(window.movies, '.movie-grid');
    renderItems(window.series, '.series-grid');
});