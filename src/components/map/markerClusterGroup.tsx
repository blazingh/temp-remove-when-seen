import 'leaflet.markercluster';
import {createPathComponent} from '@react-leaflet/core';
import L from 'leaflet';

const MarkerClusterGroup = createPathComponent(({children: _c, ...props}, ctx) => {
  const clusterProps: Record<string, any> = {};
  const clusterEvents: Record < string, any >= {};

  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) => propName.startsWith('on') ? (clusterEvents[propName] = prop)
                                                                                : (clusterProps[propName] = prop));

  // Creating markerClusterGroup Leaflet element
  const markerClusterGroup = new L.MarkerClusterGroup({ 
    iconCreateFunction: function (cluster) {
        var markers = cluster.getAllChildMarkers();
        var html = '<div style="background-color:#7626FF;"" class="marker-pin"></div><span class="cluster-markers">' + markers.length + '</span>';
        return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(32, 32) });
    },
    spiderfyOnMaxZoom: false, showCoverageOnHover: true, zoomToBoundsOnClick: true 
});

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    markerClusterGroup.on(clusterEvent, callback);
  });

  return {
    instance: markerClusterGroup,
    context: {...ctx, layerContainer: markerClusterGroup},
  };
});

export default MarkerClusterGroup;