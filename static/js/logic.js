// Set initial map coordinates and zoom level
let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function
function createMap(basicStationsLayer, advancedStationsLayer) {
  // Create the tile layer that will be the background of the map
  let lightmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  });

  // Create a baseMaps object to hold the lightmap layer
  let baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold both basic and advanced layers
  let overlayMaps = {
    "Basic Stations": basicStationsLayer,
    "Advanced Stations": advancedStationsLayer
  };

  // Create the map object with options
  let map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, basicStationsLayer] // Default is basic layer
  });

  // Create a layer control and add it to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

// Create the createMarkers function for the basic map
function createBasicMarkers(stations) {
  // Initialize an array to hold the basic bike markers
  let basicMarkers = [];

  // Loop through the stations array
  stations.forEach(station => {
    // Create a simple marker with a popup showing the station name and capacity
    let basicMarker = L.marker([station.lat, station.lon])
      .bindPopup(`<h3>${station.name}</h3><p>Capacity: ${station.capacity}</p>`);

    // Add the marker to the basicMarkers array
    basicMarkers.push(basicMarker);
  });

  // Return a layer group made from the basic markers
  return L.layerGroup(basicMarkers);
}

// Create the createMarkers function for the advanced map
function createAdvancedMarkers(stations) {
  // Initialize an array to hold the advanced bike markers
  let advancedMarkers = [];

  // Loop through the stations array
  stations.forEach(station => {
    // Determine marker color based on station capacity
    let markerColor = "green"; // Default color
    if (station.capacity < 10) {
      markerColor = "red";
    } else if (station.capacity >= 10 && station.capacity < 20) {
      markerColor = "orange";
    }

    // Create a circle marker with color coding and bind a popup
    let advancedMarker = L.circleMarker([station.lat, station.lon], {
      color: markerColor,
      fillOpacity: 0.75,
      radius: 10
    }).bindPopup(`<h3>${station.name}</h3><p>Capacity: ${station.capacity}</p>`);

    // Add the marker to the advancedMarkers array
    advancedMarkers.push(advancedMarker);
  });

  // Return a layer group made from the advanced markers
  return L.layerGroup(advancedMarkers);
}

// Perform an API call to the Citi Bike API to get the station information
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(response => {
  // Extract station data
  let stations = response.data.stations;

  // Create both the basic and advanced marker layers
  let basicStationsLayer = createBasicMarkers(stations);
  let advancedStationsLayer = createAdvancedMarkers(stations);

  // Pass the layers to the createMap function
  createMap(basicStationsLayer, advancedStationsLayer);
});
