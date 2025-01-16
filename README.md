# Movie Website Template

This template is a web application template that allows users to browse, search, and manage their favorite movies and series. This template provides a basic structure for a movie streaming website, including features like adding items to a personal list and viewing detailed information about each movie or series.

## Features

- Browse popular movies and series
- Search for movies and series
- View detailed information about each movie or series
- Add movies and series to a personal list
- Remove movies and series from the personal list
- Developer panel to manage movies and series

## Technologies Used

- HTML
- CSS
- JavaScript
- LocalStorage

### Prerequisites

- Browser
- OMDB API KEY

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NycollaSilva/movie_film_template)

2. Open `index.html` in your browser

### Getting an OMDB API Key
This application uses the OMDB API to fetch movie and series data from IMDB. To use the Developer Panel or any feature that requires external data fetching, you need an OMDB API key. Follow these steps to obtain your API key:

1. Go to the [OMDB website](https://www.omdbapi.com/).
2. Click on the "API Key" option in the navigation menu.
3. Choose the plan that fits your needs (a free plan is available for basic usage).
4. Sign up for an account or log in if you already have one.
5. Once your account is created, you will receive an API key. Make sure to save it securely.

### Adding Your API Key

1. Open the `developer.js` file located in the `javascript/` directory.
2. Find the placeholder for the API key.
3. Replace 'YOUR_OMDB_API_KEY' with your actual API key.
4. Save the file.

## Usage

### Browsing Movies and Series
- The home page displays popular movies and series.
- Use the search bar in the navigation menu to find specific movies or series.

### Viewing Details
- Click on a movie or series to view detailed information, including the synopsis, year, genre, and rating.

### Managing Your List
- Click the **"Add to My List"** button to add a movie or series to your personal list.
- Navigate to the **"My List"** page to view and manage your personal list.
- Click the **"Remove from My List"** button to remove an item from your list.

---

## Developer Panel

The developer panel allows you to manage movies and series in the application. You can add, edit, and remove movies and series, as well as fetch data from OMDB.

### Accessing the Developer Panel
1. Open the `developer.html` file in your web browser.
2. You will see buttons to add, manage, and remove movies and series.

### Adding a Movie or Series
1. Click the **"Add Movie"** or **"Add Series"** button.
2. Enter the OMDB URL of the movie or series and click **"Fetch from OMDB"** to automatically fill in the details.
3. Alternatively, manually enter the details.
4. Click **"Add Movie"** or **"Add Series"** to add the item to the list.

### Managing Movies and Series
1. Click the **"Manage Movies"** or **"Manage Series"** button.
2. A list of movies or series will appear with options to edit or remove each item.
3. Click **"Edit"** to modify the details of an item.
4. Click **"Remove"** to delete an item from the list.

### Removing a Movie or Series
1. Click the **"Remove Movie"** or **"Remove Series"** button.
2. A list of movies or series will appear with options to remove each item.
3. Click **"Remove"** to delete an item from the list.

### Fetching data from OMDB

1. Paste the movie's IMDB URL.
2. Click the **"Fetch from OMDB"** button.
3. It will pull the movie data from IMDB, filling in the data automatically
   
---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

@si_nycollas - contato.nsilvaa@gmail.com 

Project Link: https://github.com/NycollaSilva/movie_film_template
