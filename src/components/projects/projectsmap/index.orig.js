import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import * as topojson from 'topojson-client';


import SVGPatterns from '../../root/svgpatterns';
import config from '../../root/config';
import muni from '../../../assets/geog/muni';
import wards from '../../../assets/geog/wards';


import './styles.scss';

const osmURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let topoLayer, dataLayer, legend;


class ProjectsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.onFeatureInteraction = this.onFeatureInteraction.bind(this);
    this.onBaseLayerInteraction = this.onBaseLayerInteraction.bind(this);
    this.addMap = this.addMap.bind(this);
    this.addBaseLayer = this.addBaseLayer.bind(this);
    this.addDataLayer = this.addDataLayer.bind(this);
    this.addFeatureStyles = this.addFeatureStyles.bind(this);
    this.addLegend = this.addLegend.bind(this);
    this.removeDataLayer = this.removeDataLayer.bind(this);
    this.removeDataLayer = this.removeDataLayer.bind(this);
    this.removeLegend = this.removeLegend.bind(this);
  }

  componentWillMount() {
    L.LeafIcon = L.Icon.extend({
      options: {
        iconSize: [40, 40],
        // shadowSize: [50, 64],
        // iconAnchor: [22, 94],
        // shadowAnchor: [4, 62],
        // popupAnchor: [-3, -76],
      },
    });


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
    this.addMap();
    this.addBaseLayer();
    this.addDataLayer(this.props.data);
    this.addLegend();
  }

  componentDidUpdate() {
    this.removeDataLayer();
    this.addDataLayer(this.props.data);
    this.removeLegend();
    this.addLegend();
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

  onFeatureInteraction(feature, layer) { //eslint-disable-line
    const onClick = (e) => {
      this.props.onProjectSelect(e.target.feature.properties);


      layer.setStyle(this.addFeatureStyles(feature, true));
      if (layer._bounds) {
        this.map.fitBounds(layer.getBounds());
      } else {
        this.map.setView(layer._latlng, 21);
      }
    };

    const onMouseOver = (e) => {
    };


    const onMouseOut = (e) => {
      layer.setStyle(this.addFeatureStyles(feature, false));
    };

    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOut,
      click: onClick,
    });
  }

  addBaseLayer() {
    topoLayer = new L.TopoJSON();
    topoLayer.addData(wards);
    topoLayer.addTo(this.map);
    topoLayer.eachLayer(this.onBaseLayerInteraction);
    topoLayer.name = 'wards';
  }


  addMap() {
    const map = L.map(findDOMNode(this), {
      zoomSnap: 0.25,
      attributionControl: false,
    }).setView([27.906138694884575, 84.91910755634308], 14);

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

  addDataLayer() {
    const { addFeatureStyles } = this;
    const geojsonMarkerOptions = {
      radius: 10,
      color: '#000',
      weight: 0.5,
      opacity: 0.8,
      fillOpacity: 0.8,
    };
    // const Layers = {};
    if (Object.keys(this.props.data).length !== 0) {
      dataLayer = L.geoJSON(null, {
        style(feature) {
          return addFeatureStyles(feature, false);
        },
        pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: this.onFeatureInteraction,
      }).addTo(this.map);
      dataLayer.addData(this.props.data.budgets);
      dataLayer.addTo(this.map);

      this.map.fitBounds(L.geoJson(muni).getBounds());
    }
  }


  addFeatureStyles(feature, focus) { //eslint-disable-line
    let styles = {
      Point: { radius: 10, fillColor: this.props.colors[feature.properties.category], fillOpacity: 0.8, color: this.props.colors[feature.properties.category] },
      LineString: { weight: 10, color: this.props.colors[feature.properties.category] },
      Polygon: { color: 'black', weight: 0.2, fill: true, fillOpacity: 0.8, fillColor: `url(#${feature.properties.category})` },
    };
    switch (focus) {
      case true:
        styles = {
          Point: { radius: 20, fillColor: this.props.colors[feature.properties.category], fillOpacity: 0.8, color: 'black', weight: 2 },
          LineString: { weight: 15, color: this.props.colors[feature.properties.category] },
          Polygon: { color: this.props.colors[feature.properties.category], weight: 2, fill: true, fillOpacity: 0.8, fillColor: `url(#${feature.properties.category})` },
        };
        break;
      default:
        styles = {
          Point: { radius: 10, fillColor: this.props.colors[feature.properties.category], fillOpacity: 0.8, color: this.props.colors[feature.properties.category] },
          LineString: { weight: 10, color: this.props.colors[feature.properties.category] },
          Polygon: { color: 'black', weight: 0.2, fill: true, fillOpacity: 0.8, fillColor: `url(#${feature.properties.category})` },
        };
        break;
    }

    return styles[feature.geometry.type];
  }

  addLegend() {
    // console.log('addLegend');
    legend = L.control({ position: 'bottomleft' });
    legend.onAdd = (map) => {
      const div = L.DomUtil.create('div', 'info legend');
      this.props.data.budgets.forEach((layer, i) => {
        div.innerHTML += `<i class="fa fa-circle legend-icon" style="color:${config.colorScheme[i]}"></i><span class="mar-r-s">${layer.label}</span><br/>`;
      });
      return div;
    };

    legend.addTo(this.map);
  }

  removeLegend() {
    if (legend !== undefined) {
      this.map.removeControl(legend);
    }
  }

  removeDataLayer() {
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

  render() {
    const { budgets } = this.props.data;
    const { colors } = this.props;
    if (!this.props.isNavMinimized && this.props.isFilterMinimized) {
      return (
        <div id="projectsmap" className="row" style={{ height: '78vh' }} >
          <svg>
            <defs>
              {this.props.data.budgets && budgets.map((layer, i) => {
                const key = i;
                return <SVGPatterns key={key} id={layer.label} color={colors[layer.label]} type="diagonalHatch" />;
              })}
            </defs>
          </svg>

        </div>

      );
    } else if (!this.props.isNavMinimized && !this.props.isFilterMinimized) {
      return (
        <div id="projectsmap" className="row" style={{ height: '51vh' }} >
          <svg>
            <defs>
              {this.props.data.budgets && budgets.map((layer, i) => {
                const key = i;
                return <SVGPatterns key={key} id={layer.label} color={colors[layer.label]} type="diagonalHatch" />;
              })}
            </defs>
          </svg>
        </div>
      );
    } else if (this.props.isNavMinimized && !this.props.isFilterMinimized) {
      return (
        <div id="projectsmap" className="row" style={{ height: '66vh' }} >
          <svg>
            <defs>
              {this.props.data.budgets && budgets.map((layer, i) => {
                const key = i;
                return <SVGPatterns key={key} id={layer.label} color={colors[layer.label]} type="diagonalHatch" />;
              })}
            </defs>
          </svg>
        </div>);
    } else {
      return (
        <div id="projectsmap" className="row" style={{ height: '93vh' }} >
          <svg>
            <defs>
              {this.props.data.budgets && budgets.map((layer, i) => {
                const key = i;
                return <SVGPatterns key={key} id={layer.label} color={colors[layer.label]} type="diagonalHatch" />;
              })}
            </defs>
          </svg>
        </div>);
    }
  }
}


export default ProjectsMap;
