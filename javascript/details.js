document.addEventListener('DOMContentLoaded', () => {
    const detailsTitle = document.getElementById('details-title');
    const detailsImage = document.getElementById('details-image');
    const detailsYear = document.getElementById('details-year');
    const detailsGenre = document.getElementById('details-genre');
    const detailsRating = document.getElementById('details-rating');
    const detailsSynopsis = document.getElementById('details-synopsis');
    const detailsSeasons = document.getElementById('details-seasons');
    const detailsEpisodes = document.getElementById('details-episodes');
    const backgroundImage = document.getElementById('background-image');
    const watchButton = document.getElementById('watch-button');
    const addToListButton = document.getElementById('add-to-list-button');

    // Retrieve the selected item from localStorage
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));

    if (selectedItem) {
        // Populate the details page with the item data
        detailsTitle.textContent = selectedItem.title;
        detailsImage.src = selectedItem.image;
        detailsImage.alt = selectedItem.title;
        detailsYear.textContent = `Year: ${selectedItem.year}`;
        detailsGenre.textContent = `Genre: ${selectedItem.genre}`;
        detailsRating.textContent = `Rating: ${selectedItem.rating}`;
        detailsSynopsis.textContent = `Synopsis: ${selectedItem.synopsis || 'No synopsis available.'}`;
        backgroundImage.style.backgroundImage = `url(${selectedItem.backgroundImage})`;

        // Show seasons and episodes if the item is a series
        if (selectedItem.seasons) {
            detailsSeasons.style.display = 'block';
            detailsSeasons.textContent = `Seasons: ${selectedItem.seasons}`;
        }
        if (selectedItem.episodes) {
            detailsEpisodes.style.display = 'block';
            detailsEpisodes.textContent = `Episodes: ${selectedItem.episodes.length}`;
            document.getElementById('episodes-list').style.display = 'block';

            const episodesList = document.getElementById('episodes');
            selectedItem.episodes.forEach((episode, index) => {
                const episodeItem = document.createElement('li');
                episodeItem.textContent = `Episode ${index + 1}: ${episode.title}`;
                episodesList.appendChild(episodeItem);
            });
        }

        // Set up the watch button
        watchButton.addEventListener('click', () => {
            window.location.href = `watch.html?videoUrl=${encodeURIComponent(selectedItem.videoUrl)}`; // Redireciona para a página de reprodução
        });

        // Set up the add to list button
        addToListButton.addEventListener('click', () => {
            let myList = JSON.parse(localStorage.getItem('myList')) || [];
            if (!myList.some(existingItem => existingItem.title === selectedItem.title)) {
                myList.push(selectedItem);
                localStorage.setItem('myList', JSON.stringify(myList));
                addToListButton.textContent = 'Added to My List'; // Change button text
                alert(`${selectedItem.title} has been added to your list.`);
            } else {
                alert(`${selectedItem.title} is already in your list.`);
            }
        });

        // Check if the item is already in the list and update the button text accordingly
        let myList = JSON.parse(localStorage.getItem('myList')) || [];
        if (myList.some(existingItem => existingItem.title === selectedItem.title)) {
            addToListButton.textContent = 'Added to My List';
        }
    } else {
        detailsTitle.textContent = 'No item selected';
    }
});