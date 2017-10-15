import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';
import * as topojson from 'topojson-client';

import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import 'leaflet.markercluster.layersupport';
// import 'leaflet-control-react';
import 'leaflet.icon.glyph';
import muni from '../../../../assets/geog/muni';
import './styles.scss';
import wards from '../../../../assets/geog/wards';

let topoLayer, layerControl, filterControl;

const filterOptions = [
  { value: 'office', label: 'Government Offices' },
  { value: 'health', label: 'Health Facilities' },
  { value: 'finance', label: 'Financial Institutions' },
  { value: 'education', label: 'Educational Institutions' },
];

const mapAmenityToIcon = {
  bank: 'https://www.dl.dropboxusercontent.com/s/9qbtb3a1ybuqpn1/bank.png',
  atm: 'https://www.dl.dropboxusercontent.com/s/ao68wqqce1acpge/atm.png',
  hospital: 'https://www.dl.dropboxusercontent.com/s/s5qi978ctyfc8ku/hospital.png',
  health_post: 'https://www.dl.dropboxusercontent.com/s/lfb4l7oj3uulvhf/health_post.png',
  pharmacy: 'https://www.dl.dropboxusercontent.com/s/yfhw6wd5em5bk2v/pharmacy.png',
  clinic: 'https://www.dl.dropboxusercontent.com/s/drib1se3jjza2qc/clinic.png',
  school: 'https://www.dl.dropboxusercontent.com/s/zo2vxtc0c0dtu06/schools.png',
  college: 'https://www.dl.dropboxusercontent.com/s/6il0nbg61hv68c8/colleges.png',
  kindergarten: 'https://www.dl.dropboxusercontent.com/s/u36zdlgp0hi3krc/kindergarten.png',
  government: 'https://www.dl.dropboxusercontent.com/s/uu6qcxggk0et8m1/government.png',
  ngo: 'https://www.dl.dropboxusercontent.com/s/p6did0dsfqynpls/ngo.png',
};

const osmURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const osmURL = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';


class InMapsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.addMap = this.addMap.bind(this);
    this.addBaseLayer = this.addBaseLayer.bind(this);
    this.addDataLayer = this.addDataLayer.bind(this);
    this.addLayerControls = this.addLayerControls.bind(this);
    this.addIcon = this.addIcon.bind(this);
    this.removeDataLayers = this.removeDataLayers.bind(this);
    // this.fitBounds = this.fitBounds.bind(this);
    this.onBaseLayerInteraction = this.onBaseLayerInteraction.bind(this);
  }

  componentWillMount() {
    L.LeafIcon = L.Icon.extend({
      options: {
        iconSize: [40, 40],
      },
    });

    this.defineFilterControl();

    L.TopoJSON = L.GeoJSON.extend({
      addData(jsonData) {
        if (jsonData.type === 'Topology') {
          for (const key in jsonData.objects) { //eslint-disable-line
            const geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          }
        } else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      },
    });
  }


  componentDidMount() {
    // console.log('MapData', this.props.data);
    this.addMap();
    this.addBaseLayer();
    this.addDataLayer(this.props.data);
    // this.fitBounds();
  }

  componentWillUpdate() {
    this.defineFilterControl();
  }

  componentDidUpdate() {
    this.removeDataLayers();
    this.addBaseLayer();
    this.addDataLayer(this.props.data);
    // this.fitBounds();
  }


  onBaseLayerInteraction(layer) { //eslint-disable-line
    layer.setStyle({
      fillColor: '#fff',
      fillOpacity: 0.0,
      color: '#000',
      weight: 1.5,
      opacity: 0.5,
    });
  }

  addMap() {
    const map = L.map(findDOMNode(this), {    //eslint-disable-line
      zoomSnap: 0.25,
      attributionControl: false,
      scrollWheelZoom: false,
    }).setView([27.89512, 85.1], 11.75);
    this.map = map;

    L.tileLayer(osmURL, { opacity: 0.4 }).addTo(this.map);

    const baseLayer = L.TileLayer.boundaryCanvas(osmURL, {
      boundary: muni,
      attribution: 'Developed by <a target = "_blank" href="http://kathmandulivinglabs.org">' +
      'Kathmandu Living Labs</a> <br>  <a href = "http://leafletjs.com" >Leaflet</a>' +
      '| &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors ',
    });

    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);
    baseLayer.addTo(map);
  }

  addBaseLayer() {
    topoLayer = new L.TopoJSON();
    topoLayer.addData(wards);
    topoLayer.addTo(this.map);
    topoLayer.eachLayer(this.onBaseLayerInteraction);
    topoLayer.name = 'wards';
  }

  addIcon(type) { //eslint-disable-line
    const icon = new L.LeafIcon({
      iconUrl: mapAmenityToIcon[type],
    });

    return icon;
  }

  addDataLayer(data) { //eslint-disable-line

    if (data.length !== 0) {
      const mcgLayerSupportGroup = L.markerClusterGroup.layerSupport({
        spiderfyOnMaxZoom: true,
      });
      mcgLayerSupportGroup.name = 'mcg';
      data.forEach((layer) => {
        const { label } = layer;
        window[`mapLayer${label}`] = L.featureGroup();
      });

      // const control = L.control.layers(null, null, { collapsed: false });
      const myLayers = {};
      mcgLayerSupportGroup.addTo(this.map);
      data.forEach((layer) => {
        const currLayer = layer.label;
        layer.features.forEach((point) => {
          const marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]], { icon: this.addIcon(currLayer) });
          marker.bindPopup(point.properties.tags.name);
          marker.addTo(window[`mapLayer${currLayer}`]);
        });
        mcgLayerSupportGroup.checkIn(window[`mapLayer${currLayer}`]);
        myLayers[currLayer] = window[`mapLayer${currLayer}`];
        window[`mapLayer${currLayer}`].addTo(this.map);
      });


      this.map.fitBounds(L.geoJson(muni).getBounds());

      this.addLayerControls(myLayers);
    }
  }


  addLayerControls(layers) {
    if (layerControl !== undefined) {
      this.map.removeControl(layerControl);
      layerControl = L.control.layers({}, layers, { collapsed: false, position: 'bottomleft' });

      layerControl.addTo(this.map);
    } else {
      layerControl = L.control.layers({}, layers, { collapsed: false, position: 'bottomleft' });
      layerControl.addTo(this.map);
    }

    if (filterControl !== undefined) {
      this.map.removeControl(filterControl);
      filterControl = L.control.filter({ position: 'bottomleft' });
      filterControl.addTo(this.map);
    } else {
      filterControl = L.control.filter({ position: 'bottomleft' });
      filterControl.addTo(this.map);
    }
  }

  removeDataLayers() {
    this.map.eachLayer((layer) => {
      if (!layer._url) {
        if (!layer._layers) {
          this.map.removeLayer(layer);
        }
        if (layer.name === 'mcg') {
          this.map.removeLayer(layer);
          console.log(layer.name);
        }
      }
    });
  }

  defineFilterControl() {
    const { type, onFilterChange } = this.props;
    console.log('fc', onFilterChange);
    let options = '';
    filterOptions.forEach((option) => {
      if (option.value === type) {
        options = `${options}<option class="inmaps-option" selected value=${option.value}>${option.label}</option>`;
      } else {
        options = `${options}<option class="inmaps-option" value=${option.value}>${option.label}</option>`;
      }
    });

    // const updateMapVariable = (e) => {
    //   console.log(e.target.value);
    // };


    L.Control.Filter = L.Control.extend({
      onAdd(map) {
        const div = L.DomUtil.create('div');

        div.id = 'inmaps-filter';
        div.innerHTML = `<select class="inmaps-select">${options}</select>`;
        // div.innerHTML = `<div><select>${options}</select></div>`;

        div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        div.firstChild.onmousedown = L.DomEvent.stopPropagation;
        div.firstChild.onchange = onFilterChange;

        return div;
      },

      onRemove(map) {
        // Nothing to do here
      },
    });

    L.control.filter = (opts) => {
      return new L.Control.Filter(opts);
    };
  }


  render() {
    if (!this.props.isNavMinimized) {
      return (<div id="impmapsmap" className="row " style={{ height: '100vh' }} />);
    } else {
      return (<div id="impmapsmap" className="row" style={{ height: '100vh' }} />);
    }
  }
}


export default InMapsMap;
