import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const ChennaiCoordinates = { lat: 13.0827, lng: 80.2707 };
const BangaloreCoordinates = { lat: 12.9716, lng: 77.5946 };
const MumbaiCoordinates = { lat: 19.076, lng: 72.8777 };
const mapCenter = { lat: 21.5, lng: 83 };


const MapWithMarkers = ({ onCaptureMap, mapLatLng=[{}] }) => {
  console.log(mapLatLng);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markers = [];
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let labelIndex = 0;

   useEffect(() => {
    const mapOptions = {
      center: mapCenter,
      fullscreenControl: false,
      keyboardShortcuts: false,
      gestureHandling: "none",
      zoomControl: false,
      zoom: 4.7,
    };

    let map = new window.google.maps.Map(mapContainerRef.current, mapOptions);

    mapLatLng.map( async (LatLng,index)=>{
      const markersLatLng= await new window.google.maps.Marker({
        position: LatLng,
        label: labels[labelIndex++ % labels.length],
        map:map,
      });
      markers.push(markersLatLng);
    })

    // const chennaiMarker = new window.google.maps.Marker({
    //   position: ChennaiCoordinates,
    //   map,
    // });
    // markers.push(chennaiMarker);

    // const bangaloreMarker = new window.google.maps.Marker({
    //   position: BangaloreCoordinates,
    //   map,
    // });
    // markers.push(bangaloreMarker);

    // const mumbaiMarker = new window.google.maps.Marker({
    //   position: MumbaiCoordinates,
    //   map,
    // });
    // markers.push(mumbaiMarker);

    // const lineCoordinates = [
    //   ChennaiCoordinates,
    //   BangaloreCoordinates,
    //   MumbaiCoordinates,
    // ];
    const lineCoordinates =mapLatLng;

    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 2,
    };
    const line = new window.google.maps.Polyline({
      path: lineCoordinates,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "10px",
        },
      ],
      geodesic: true,
      strokeColor: "#0000FF",
      strokeOpacity: 0,
      strokeWeight: 1,
      map:map,
    });

    mapRef.current = map;

    setTimeout(async () => {
      const mapElement = await mapContainerRef.current;
      if (mapElement) {
        html2canvas(mapElement, {
          useCORS: true,
          allowTaint: true,
          width: mapElement.offsetWidth,
          height: mapElement.offsetHeight,
        }).then(async(canvas) => {
          const imageBase64 = await canvas.toDataURL();
          onCaptureMap(imageBase64);
        });
      }
    },500);

  }, [mapLatLng]);

  //   const captureMap = () => {
  //     const mapElement = mapContainerRef.current;
  //     if (mapElement) {
  //       html2canvas(mapElement, {
  //         useCORS: true,
  //         allowTaint: true,
  //         width: mapElement.offsetWidth,
  //         height: mapElement.offsetHeight,
  //       }).then((canvas) => {
  //         const imageBase64 = canvas.toDataURL();
  //         nu;
  //         onCaptureMap(imageBase64);
  //       });
  //     }
  //   };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />
      {/* <button onClick={captureMap}>Capture Map</button> */}
    </div>
  );
};

export default MapWithMarkers;
