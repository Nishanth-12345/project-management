"use client";
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/projectStore";

const MapScreen = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { projects, loading } = useProjectStore();
  const router = useRouter();

  useEffect(() => {
    if (projects.length === 0 || !mapRef.current) return;
    
    const olMap = new Map({
      target: mapRef.current as HTMLDivElement,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([77.5946, 12.9716]),
        zoom: 5,
      }),
    });
  
    const vectorSource = new VectorSource();

    projects.forEach((project) => {
      if (!project.location || typeof project.location.lng !== "number") return;

      const coordinates = fromLonLat([project.location.lng, project.location.lat]);

      const feature = new Feature({
        geometry: new Point(coordinates),
        projectId: project.id,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "/location.svg",
            scale: 0.07,
          }),
        })
      );

      vectorSource.addFeature(feature);
    });

    const vectorLayer = new VectorLayer({ source: vectorSource });
    olMap.addLayer(vectorLayer);

    const popup = new Overlay({ element: document.getElementById("popup") as HTMLElement });
    olMap.addOverlay(popup);

    olMap.on("click", function (event) {
      const feature = olMap.forEachFeatureAtPixel(event.pixel, (feature) => feature, {
        hitTolerance: 10,
     });
      if (feature) {
        const projectId = feature.get("projectId");
        router.push(`/projects?selected=${projectId}`);
      }
    });

    return () => {
      olMap.setTarget("");
    };
  }, [router,projects]);

  return (
    <div>
      {loading ? <p>Loading...</p> : 
      <div className="relative">
        <div ref={mapRef} className="h-200 w-full"></div>
        <div id="popup" className="absolute bg-white p-2 rounded shadow-md"></div>
      </div>}
    </div>


  );
};

export default MapScreen;
