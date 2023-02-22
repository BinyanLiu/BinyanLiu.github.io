mapboxgl.accessToken =
"pk.eyJ1IjoiYmlueWFuIiwiYSI6ImNsY3F0Z2tzcTA5NmMzd212eDZmYTc1bG8ifQ.OI_QZja7Kj_71KhJiJooZA";

const map = new mapboxgl.Map({
  container: "map", 
  style: "mapbox://styles/binyan/clefsm8uv001401k4c4gky05c",
  center: [-0.1276, 51.5072],
  zoom: 10
});

map.on("click", (event) => {
  
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["music-venues-london"] 
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
 
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Name: ${feature.properties.Name}</h3>
       <p>Category: ${feature.properties.Categories}</p>
    <p>Address: ${feature.properties.Address}</p>
    <p>Website: ${feature.properties.Website}</p>`
    )
    .addTo(map);
});


 filterType = ["!=", ["get", "Categories"], "placeholder"];


document.getElementById("filters").addEventListener("change", (event) => {
   
    const type = event.target.value;
   
    console.log(type);
   
  if (type == "all") {
      filterType = ["!=", ["get", "Categories"], "placeholder"];
    } 
  else if (type == "Pubs") {
      filterType = ["==", ["get", "Categories"], "Pub"];
    } 
  else if (type == "Arts Centres") {
      filterType = ["==", ["get", "Categories"], "Arts Centre"];
    } 
   else if (type == "Concert Halls") {
      filterType = ["==", ["get", "Categories"], "Concert Hall"];
   }
   else if (type == "Theatres") {
      filterType = ["==", ["get", "Categories"], "Theatre"];
   }
   else if (type == "Clubs") {
      filterType = ["==", ["get", "Categories"], "Club"];
   }
   else if (type == "Lounges") {
     filterType = ["==", ["get", "Categories"], "Lounge"];
   }
   else if (type == "Studios") {
     filterType = ["==", ["get", "Categories"], "Studio"];
   }
  else if (type == "Stores") {
     filterType = ["==", ["get", "Categories"], "Store"];
   }
  else if (type == "Others") {
     filterType = ["==", ["get", "Categories"], "Cultural infrastructure"];
   }
  else if (type == "Creative space") {
     filterType = ["==", ["get", "Categories"], "Creative space"];
   }
     else if (type == "Live") {
     filterType = ["==", ["get", "Categories"], "Live"];
   }
  else {
   console.log("error");
    }

    map.setFilter("music-venues-london", ["all", filterType]);

});