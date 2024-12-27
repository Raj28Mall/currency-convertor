# Currency Converter

**Implemented using HTML, CSS (Tailwind), and JS**

## Features:
- Fully responsive design
- Swapping functionality implemented
- Dropdown menu sorted for easy searching
- Silly jokes for specific inputs (e.g., 69, 420, values larger than 10 billion, or 404)

## Implementation Details:
- **Sorted Currency List**: I added the sorted functionality using the currency_names.json file which has the currency names for the codes (i generated them by putting the api data into chatgpt and telling it generate the json file with the names and codes). The sort function below is to sort the currencies by their currency name so that it would be easy to search in the dropdown menu cause some codes and currencies are like GBP:Pound Sterling so even if you type P to search, you wont be able to find it cause it would be sorted according to G, which is a mess. I know that hard coding the json file is not good practice, but honestly I couldnt find good APIs which had currency names too (it was kinda annoying to try to find apis too cause most of them require signing up and it took time to activate the keys too sometimes) (maybe i just dont know how to search for apis well yet). 

- **Design**: Added a money-note icon that I found on Google and edited using Canva.

## Final Thoughts:
- Had a lot of fun working on this project. 😊
