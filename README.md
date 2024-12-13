# Citi Bike NYC Interactive Map

This project visualizes Citi Bike station data in New York City using an interactive map built with **Leaflet.js**. Users can switch between a **basic map** view and an **advanced map** view with enhanced features like color-coded markers based on station capacity.

## Features

- **Basic Map View**: 
  - Displays Citi Bike stations as simple markers.
  - Includes popups showing station names and capacities.

- **Advanced Map View**:
  - Uses color-coded circle markers to visualize station capacities:
    - **Green**: High capacity.
    - **Orange**: Medium capacity.
    - **Red**: Low capacity.
  - Popups with detailed information about each station.

- **Layer Toggle**:
  - Allows users to seamlessly switch between basic and advanced views using a layer control.

- **Real-Time Data**:
  - Fetches live Citi Bike station data using the Citi Bike GBFS API.

## Technologies Used

- **Leaflet.js**: For rendering interactive maps.
- **D3.js**: For data fetching and manipulation.
- **HTML & CSS**: For structure and styling.
- **JavaScript**: For logic and map functionality.
