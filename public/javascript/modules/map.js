import axios from 'axios'

const  defaultLat  = 42.6648323
const  defafultLng = 23.26632

const mapOptions = {
  center: { lat: defaultLat, lng: defafultLng },
  zoom: 10
}

function loadPlaces(map, lat = defaultLat, lng = defafultLng) {

}

function makeMap(mapDiv) {
  if (!mapDiv) return

  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions)
  // loadPlaces(map)
}

export default makeMap