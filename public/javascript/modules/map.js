import axios from 'axios'

const defaultLat  = 42.6648323
const defafultLng = 23.26632

const mapOptions = {
  center: { lat: defaultLat, lng: defafultLng },
  zoom: 13
}

function loadPlaces(map, lat = defaultLat, lng = defafultLng) {
  axios.get(`/api/jobPosts/near?lat=${lat}&lng=${lng}`)
    .then(res => {
      const places = res.data;
      if (!places.length) {
        alert('no places found!');
        return;
      }
      // create a bounds
      const bounds = new google.maps.LatLngBounds();

      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates;
        const position = { lat: placeLat, lng: placeLng };
        bounds.extend(position);
        const marker = new google.maps.Marker({ map, position });
        marker.place = place;
        return marker;
      })
    })
        // when someone clicks on a marker, show the details of that place
      // markers.forEach...

}

function makeMap(mapDiv) {
  if (!mapDiv) return
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions)
  loadPlaces(map)
}

export default makeMap