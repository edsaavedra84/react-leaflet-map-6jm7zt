import React, { Component } from 'react';
import { render } from 'react-dom';
import MyMap from './my-map/myMap';
import './style.css';
import { map, tileLayer, Browser, Bounds, Layer, Marker } from 'leaflet';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }

  mapIsReadyCallback(map) {
    

    console.log(map);
  }


  render() {
    return <MyMap mapIsReadyCallback={this.mapIsReadyCallback} />;
  }
}

render(<App />, document.getElementById('root'));
