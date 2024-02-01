# AutoComplete Country Selector App

This React application provides an auto-complete feature for selecting countries. It fetches country data from an external API and allows users to search and select a country from the auto-complete suggestions.

## Features

- **Auto-complete Search**: Dynamically search for countries as you type.
- **Debounce Input**: Implements debouncing to optimize search performance.
- **Country Selection**: Click to select a country from the auto-complete suggestions, country flag will be displayed.
- **Error Handling**: Displays error messages for failed data fetching.
- **Loading State**: Shows a loading indicator while fetching data.

## Installation and Setup

To get this project running locally:

1. Navigate to the project directory and run `npm install` to install dependencies.
2. Start the application with `npm start`. The app should now be running on [http://localhost:3000](http://localhost:3000).

## Technologies Used

- React (Functional Components)
- CSS for styling
- External API: [Rest Countries](https://restcountries.com/v3.1/all)

## Components

- **AutoComplete**: The main component that handles the auto-complete logic and renders the UI.
- **ListItem**: Renders each country suggestion with query-matching text highlighted.
- **LoadingAndError**: Displays loading and error messages.
- **useDebounce**: A custom hook to debounce the search input.
- **useFetchCategories**: A custom hook to fetch country data.

## Testing

This application includes tests for the `ListItem` and `AutoComplete` components using React Testing Library and Jest.

Run `npm test` to execute the tests.

> This project was made with ❤️ by Yonatan Salmon
