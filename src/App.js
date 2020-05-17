import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorhelpers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {palettes: seedColors}
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(rtProps) => <NewPaletteForm savePalette={this.savePalette} {...rtProps} />}
        />
        <Route
          exact
          path='/'
          render={(rtProps) => (
            <PaletteList palettes={this.state.palettes} {...rtProps} />
          )}
        />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
