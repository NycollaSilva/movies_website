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
    const item = JSON.parse(localStorage.getItem('selectedItem'));

    if (item) {
        // Populate the details page with the item data
        detailsTitle.textContent = item.title;
        detailsImage.src = item.image;
        detailsImage.alt = item.title;
        detailsYear.textContent = `Year: ${item.year}`;
        detailsGenre.textContent = `Genre: ${item.genre}`;
        detailsRating.textContent = `Rating: ${item.rating}`;
        detailsSynopsis.textContent = `Synopsis: ${item.synopsis || 'No synopsis available.'}`;
        backgroundImage.style.backgroundImage = `url(${item.backgroundImage})`;

        // Show seasons and episodes if the item is a series
        if (item.seasons) {
            detailsSeasons.style.display = 'block';
            detailsSeasons.textContent = `Seasons: ${item.seasons}`;
        }
        if (item.episodes) {
            detailsEpisodes.style.display = 'block';
            detailsEpisodes.textContent = `Episodes: ${item.episodes}`;
        }

        // Set up the watch button
        watchButton.addEventListener('click', () => {
            alert(`Now watching: ${item.title}`);
        });

        // Set up the add to list button
        addToListButton.addEventListener('click', () => {
            let myList = JSON.parse(localStorage.getItem('myList')) || [];
            if (!myList.some(existingItem => existingItem.title === item.title)) {
                myList.push(item);
                localStorage.setItem('myList', JSON.stringify(myList));
                addToListButton.textContent = 'Added to My List'; // Change button text
                alert(`${item.title} has been added to your list.`);
            } else {
                alert(`${item.title} is already in your list.`);
            }
        });

        // Check if the item is already in the list and update the button text accordingly
        let myList = JSON.parse(localStorage.getItem('myList')) || [];
        if (myList.some(existingItem => existingItem.title === item.title)) {
            addToListButton.textContent = 'Added to My List';
        }
    } else {
        detailsTitle.textContent = 'No item selected';
    }
});