document.addEventListener('DOMContentLoaded', () => {
    const detailsTitle = document.getElementById('details-title');
    const detailsImage = document.getElementById('details-image');
    const detailsYear = document.getElementById('details-year');
    const detailsGenre = document.getElementById('details-genre');
    const detailsRating = document.getElementById('details-rating');
    const detailsSynopsis = document.getElementById('details-synopsis');
    const backgroundImage = document.getElementById('background-image');

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
    } else {
        detailsTitle.textContent = 'No item selected';
    }
});