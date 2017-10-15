import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import 'leaflet-sidebar-v2';
import * as topojson from 'topojson-client';
import turfCentroid from '@turf/centroid';
import _ from 'lodash';


import muni from '../../../../assets/geog/muni';
import wards from '../../../../assets/geog/wards';
import CommentModal from '../../root/commentmodal';
import RenderComments from '../../root/rendercomments';

import './styles.scss';

const osmURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let topoLayer, dataLayer, polygonClickLayer, polygonHoverLayer;

const mapProjectToIcon = {
  education: 'https://www.dl.dropboxusercontent.com/s/iq0h1ilr9aepg6k/projects_education.png',
  irrigation: 'https://www.dl.dropboxusercontent.com/s/ujvbq1w5ats57wy/projects_irrigation.png',
  water_supply: 'https://www.dl.dropboxusercontent.com/s/ujvbq1w5ats57wy/projects_irrigation.png',
  infrastructure: 'https://www.dl.dropboxusercontent.com/s/s17z236w6ygwx2r/projects_infrastructure.png',
  transport: 'https://www.dl.dropboxusercontent.com/s/w8cstd8ewol41m4/projects_transport.png',
  targeted_group: 'https://www.dl.dropboxusercontent.com/s/10w5t7dok439oea/projects_target_group.png',
  religion_culture_recreational: 'https://www.dl.dropboxusercontent.com/s/xryj43eway1uj8e/projects_religion.png',
  agriculture: 'https://www.dl.dropboxusercontent.com/s/2aq6wklppi909w7/projects_projects_agriculture.png',
  construction: 'https://www.dl.dropboxusercontent.com/s/7jxyoceiznsfues/projects_construction.png',
  electricity: 'https://www.dl.dropboxusercontent.com/s/pyqojndlxohqzdz/projects_electricity.png',
  supplementary_maintainance_emergency: 'https://www.dl.dropboxusercontent.com/s/551jrmex5i5f4xx/projects_miscellaneous.png',
  health: 'https://www.dl.dropboxusercontent.com/s/gyvrnlt09fszn0e/projects_health.png',
  tourism: 'https://www.dl.dropboxusercontent.com/s/k7ik7l2w927xqzk/projects_tourism.png',
  waste_management: 'https://www.dl.dropboxusercontent.com/s/51bgyi8vew9eqir/projects_waste_management.png',
};


const geoJsonStyle = {
  fillColor: 'red',
  fillOpacity: 0.2,
  color: 'red',
  weight: 1.5,
  opacity: 0.8,
};


class ProjectsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.addMap = this.addMap.bind(this);
    this.addWardBoundaries = this.addWardBoundaries.bind(this);
    this.addDataLayer = this.addDataLayer.bind(this);
    this.featureInteraction = this.featureInteraction.bind(this);
    this.addIcon = this.addIcon.bind(this);
    this.afterCommentSubmission = this.afterCommentSubmission.bind(this);
    this.removeDataLayer = this.removeDataLayer.bind(this);
  }

  componentWillMount() {
    L.LeafIcon = L.Icon.extend({
      options: {
        iconSize: [30, 30],
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
    this.addWardBoundaries();
    this.addDataLayer(this.props.data.budgets);
  }

  componentDidUpdate() {
    this.removeDataLayer();
    this.addWardBoundaries();
    this.addDataLayer(this.props.data.budgets);
    // this.removeLegend();
    // this.addLegend();
  }


  addMap() {
    const map = L.map(findDOMNode(this), { //eslint-disable-line
      zoomSnap: 0.25,
      attributionControl: false,
      scrollWheelZoom: false,
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


    const bounds = L.geoJson(muni).getBounds();

    bounds._northEast.lng = bounds._northEast.lng + 0.15;//eslint-disable-line
    map.fitBounds(bounds);
    const sidebar = L.control.sidebar('sidebar', { position: 'right' });

    sidebar.addTo(map);
    sidebar.open('projects');
    this.sidebar = sidebar;
  }

  addWardBoundaries() {
    const wardStyles = (layer) => {
      layer.setStyle({
        fillColor: '#fff',
        fillOpacity: 0.0,
        color: '#000',
        weight: 1.5,
        opacity: 0.5,
      });
    };


    topoLayer = new L.TopoJSON();
    topoLayer.addData(wards);
    topoLayer.addTo(this.map);
    topoLayer.eachLayer(wardStyles);
    topoLayer.name = 'wards';
  }


  addDataLayer(apiData) { //eslint-disable-line
    const polyToPoints = (data) => {
      const originalData = data;
      const duplicateData = JSON.parse(JSON.stringify(originalData));
      const allFeatures = [];

      originalData.forEach((geoJsonLayer, i) => {
        geoJsonLayer.features.forEach((project, j) => {
          allFeatures.push(project);
          if (project.geometry.type === 'Polygon' || project.geometry.type === 'LineString') {
            const centroid = turfCentroid(project, project.properties);
            const lon = centroid.geometry.coordinates[0];
            const lat = centroid.geometry.coordinates[1];
            duplicateData[i].features[j].geometry.coordinates = [lon, lat];
            duplicateData[i].features[j].geometry.type = 'Point';
          }
        });
      });

      return { duplicateData, originalData, allFeatures };
    };

    const simplifiedData = polyToPoints(apiData);
    const selectedFeature = _.find(simplifiedData.allFeatures, (o) => { return o.properties.id === this.props.projectId; });


    if (selectedFeature !== undefined) {
      if (selectedFeature.geometry.type !== 'Point') {
        polygonClickLayer = L.geoJSON(null, {
          style: geoJsonStyle,
        }).addTo(this.map);
        polygonClickLayer.clearLayers();
        polygonClickLayer.addData(selectedFeature);
      }
    }


    if (Object.keys(this.props.data).length !== 0) {
      const {
        // addFeatureStyles,
        addIcon,
      } = this;
      const featureInteraction = this.featureInteraction.bind(this, simplifiedData.allFeatures, this.sidebar);

      const markers = L.markerClusterGroup();

      dataLayer = L.geoJSON(null, {
        pointToLayer(feature, latlng) {
          return L.marker(latlng, { icon: addIcon(feature.properties.category) }).bindPopup('Hi');
        },
        onEachFeature: featureInteraction,
      });

      dataLayer.addData(simplifiedData.duplicateData);
      markers.addLayer(dataLayer);
      this.map.addLayer(markers);
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
        }
      }
    });
  }

  featureInteraction(allFeatures, sidebar,  feature, layer) { //eslint-disable-line

    polygonClickLayer = L.geoJSON(null, { style: geoJsonStyle }).addTo(this.map);
    polygonHoverLayer = L.geoJSON(null, { style: geoJsonStyle }).addTo(this.map);

    const onClick = (e) => {
      this.props.onProjectSelect(e.target.feature.properties);
      sidebar.open('details');

      const selectedFeature = _.find(allFeatures, (o) => { return o.properties.id === layer.feature.properties.id; });

      if (selectedFeature.geometry.type !== 'Point') {
        polygonClickLayer.clearLayers();
        polygonClickLayer.addData(selectedFeature);
      }
    };

    const onMouseOver = (e) => {
      const selectedFeature = _.find(allFeatures, (o) => { return o.properties.id === layer.feature.properties.id; });
      if (selectedFeature.geometry.type !== 'Point') {
        polygonHoverLayer.addData(selectedFeature);
      }
    };


    const onMouseOut = (e) => {
      polygonHoverLayer.clearLayers();
    };

    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOut,
      click: onClick,
    });
  }

  afterCommentSubmission() {
    this.props.afterCommentSubmission(this.props.projectDetails);
  }

  addIcon(type) { //eslint-disable-line
    const icon = new L.LeafIcon({
      iconUrl: mapProjectToIcon[type],
    });

    return icon;
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-12">

          <div id="sidebar" className="sidebar collapsed">

            <div className="sidebar-tabs">

              <ul role="tablist">
                <li><a href="#projects" role="tab"><i className="fa fa-home" /></a></li>
                <li><a href="#filters" role="tab"><i className="fa fa-filter" /></a></li>
                <li><a href="#details" role="tab"><i className="fa fa-info" /></a></li>
              </ul>

            </div>

            <div className="sidebar-content">

              <div className="sidebar-pane" id="projects">
                <h1 className="sidebar-header">
                  PROJECTS
                  <span className="sidebar-close"><i className="fa fa-times" /></span>
                </h1>

                <div className="projects-container">
                  <p>
                    In this map, you will be able to browse through all of the projects
                    that are currently underway in Nilkantha Municipality. You can get more information
                    about the project &mdash; or leave a comment &mdash; by simply clicking on its icon.
                  </p>
                  <p>
                    Looking for projects in a particular ward? You can also filter projects based on location, budget or category by clicking on the <i className="fa fa-filter" /> icon to the right.
                  </p>
                </div>
              </div>


              <div className="sidebar-pane" id="filters">
                <h1 className="sidebar-header">
                  FILTERS
                  <span className="sidebar-close"><i className="fa fa-times" /></span>
                </h1>
                <div className="filters-container">
                  {this.props.children}
                </div>
              </div>


              <div className="sidebar-pane" id="details">
                <h1 className="sidebar-header">
                  PROJECT DETAILS
                  <span className="sidebar-close"><i className="fa fa-times" /></span>
                </h1>
                <div className="projects-container">
                  {Object.keys(this.props.projectDetails).length === 0 && <p>Please click on a project to continue.</p>}
                  {Object.keys(this.props.projectDetails).length !== 0 &&
                    <div className="row">
                      <div className="col-md-12">
                        <span className="project-title">
                          {this.props.projectDetails.title}
                        </span>
                        <hr />
                      </div>

                      <div className="col-md-6">
                        <span className="label"><i className="fa fa-map-marker" aria-hidden="true" /> Ward Number:</span> <br />
                        <span className="label-value">{this.props.projectDetails.ward}</span>
                      </div>

                      <div className="col-md-6">
                        <span className="label"><i className="fa fa-money" aria-hidden="true" /> Budget:</span> <br />
                        <span className="label-value">Nrs. {this.props.projectDetails.budget_amount}</span>
                      </div>

                      <hr />
                      <div className="col-md-12">
                        <RenderComments comments={this.props.comments.comments} />
                        <CommentModal afterCommentSubmission={this.afterCommentSubmission} type="budgets" id={this.props.projectDetails.id} />
                      </div>
                    </div>
                  }
                </div>
              </div>

            </div>

          </div>

          <div id="projectsmap" className="row" style={{ height: '91vh' }} />

        </div>
      </div>
    );
  }
}


export default ProjectsMap;
