import React, { useState } from 'react';
// import ReactMapBoxGl, { Layer, Feature, GeoJSONLayer, Source } from 'react-mapbox-gl'
import ReactMapGl, { Source, Layer, Marker, Popup } from 'react-map-gl'
import Provinces from './assets/provinces.json'
import './App.css';

var hqs = [
  {
    title: "Karnali Pradesh",
    description: "Birendranagar",
    image: null,
    position: [28.586337, 81.623349]
  },
  {
    title: "Pradesh 5",
    description: "Butwal",
    image: null,
    position: [27.683869, 83.442147]
  },
  {
    title: "Gandaki Pradesh",
    description: "Pokhara",
    image: null,
    position: [28.204780, 84.019066]
  },
  {
    title: "Pradesh 2",
    description: "Janakpur",
    image: null,
    position: [26.721384, 85.963912]
  },
  {
    title: "Sudurpaschim pradesh",
    description: "Godawari",
    image: null,
    position: [29.246977, 80.637780]
  },
  {
    title: "Pradesh 1",
    description: "BiratNagar",
    image: null,
    position: [26.439486, 87.288524]
  },
  {
    title: "Bagmati pradesh",
    description: "Hetauda",
    image: null,
    position: [27.410497, 85.016496]
  }]


var eventsA = [
  {
    title: "Demonstration in LekhNath",
    image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/19/e5f862edc0e440a6ae0a8cc28d5e89db_18.jpg",
    description: "Pokhara/Lekhnath Municipality has seen a rise in people coming out for demonstration against government LockDown",
    position: [28.165410, 84.101063]
  },
  {
    title: "Mob lynch in Janakpur",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/1a/03/a7/f2/janakpur-2-days-1-night.jpg",
    description: "Local people have taken matters in their own hands when people from across the border start flooding in",
    position: [26.728232, 85.923408]
  }
]

var eventsB = [
  {
    title: "Fund Collection and Distribution to lockdown affectd people",
    image: "https://www.welcomenepal.com/uploads/Tansen1.jpg",
    description: "People have collected Funds and provided free launch/dinner to affected groups.",
    position: [27.824069, 83.536503]
  },
  {
    title: "Sakya brothers run emergency Ambulence service on their private vechile.",
    image: "https://www.woodstocksentinelreview.com/wp-content/uploads/2020/04/lfp20200408mh029_77977228-e1586385870120.jpg?quality=80",
    description: "Day or night, corona or not. You can call these brothers for a ride to nearest hospital. You'll get ride of your life, Literally.",
    position: [27.668112, 84.474647]
  }
]

function App() {
  const [viewport, setViewport] = useState({
    latitude: 27.895259,
    longitude: 84.568670,
    height: '100vh',
    width: '100vw',
    zoom: 6
  })

  const [popup, setPopup] = useState(null)
  const [markers, setMarkers] = useState(hqs)
  // console.log(Object.keys(Provinces))
  return (
    <div className="App">
      <div className="dropdown-sel" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: 500, zIndex:100}}>
        <p>
          Choose:
        </p>
        <div style={{marginLeft: 10}}>
          <select
            onChange={(e) => {
              e.preventDefault()
              if(e.target.value==="hq"){
                setMarkers(hqs)
              } else if(e.target.value==="eventsA"){
                setMarkers(eventsA)
              } else if(e.target.value==="eventsB"){
                setMarkers(eventsB)
              }
            }}
            defaultValue="hq"
          >
            <option value={"hq"} title="Headquarters">
              Headquarters
            </option>
            <option value={"eventsA"} title="Conflict Events">
              Conflict Events
            </option>
            <option value={"eventsB"} title="Social Events">
              Social Events
            </option>
          </select>
        </div>
      </div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidXlvZ2VzaCIsImEiOiJja2EybmZvdGswM2FzM2RtdjdtNXEwZGE3In0.tCXBKM3eH4l-rugw2H_ooQ"
        mapStyle="mapbox://styles/uyogesh/cka75xzxi0ku11ilblflwh1md"
        onViewportChange={(newViewport) => {
          setViewport(newViewport)
        }}
        visibilityConstraints={{
          minZoom: 3,
          maxZoom: 10,
        }}
      >
        {Provinces.features.map(feature => <Source
          data={feature}
          type="geojson"
          key={feature.properties.D_ID}
        >
          <Layer
            type="line"
            paint={{
              'line-color': '#000'
            }}
          />
          <Layer
            type="fill"
            paint={{
              'fill-color': "#0000AA",
              'fill-opacity': 0.3
            }}
          />
        </Source>)}
        {markers.map(marker => (
          <Marker
            latitude={marker.position[0]}
            longitude={marker.position[1]}
            key={marker.position[0]}
          >
            <div
              className="marker-dot"
              onClick={() => {
                setPopup(marker)
              }}
            >

            </div>
          </Marker>
        ))}

        {
          popup ? <Popup
            longitude={popup.position[1]}
            latitude={popup.position[0]}
            onClose={() => {
              setPopup(null)
            }}
            closeOnClick
            className="popup-a"
          >
            <div>
              <h4>{popup.title}</h4>
              <div>
                <div style={{ maxHeight: 180, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                  {popup.image&&<img src={popup.image} alt="" style={{ height: 180 }} />}
                </div>
                <div>
                  <p>
                    {popup.description}
                  </p>
                </div>
              </div>
            </div>
          </Popup> : null
        }
      </ReactMapGl>
    </div>
  );
}

export default App;
