# Manhattan Population Explorer

A MapBoxGL and D3 web mapping tool for exploring the dynamic population of Manhattan.

You've reached the public Github repository for the Manhattan Population Explorer tool.
The tool is currently hosted by Github [here](https://citrusvanilla.github.io/manhattanpopulationexplorer/) with an alias available at [ManPopEx.us](https://manpopex.us).

If you are interested in the methodology, you can view a PDF presentation located in the 'presentation' directory, titled '120507_turnstile_presentation.pdf'.

## Current Status

I let my mapbox account expire because it was costing me hundreds of dollars to host this project. Rest assured if you are a developer you can run this locally. Here are the instructions:

1. Obtain a MapBox key from a new account at [mapbox.com](mapbox.com).
2. Clone this repository and cd into it.
3. Update line 2 of `manpop.js` with your personal key found [here](https://github.com/citrusvanilla/manhattanpopulationexplorer/blob/master/scripts/manpop.js#L2).
4. Run a simple http server from the `manhattanpopulationexplorer` directory. If you use python: `python -m http.server`
5. Navigate to the localhost port the server is listening on. Probably `localhost:8000` in your browser.

## Credits & Links

- Design, Development, Data & Modelling - [Justin Fung](https://linkedin.com/in/citrusvanilla)
- Design & Layout inspiration - [Urbica Design](https://urbica.co/)
- Map engine - [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/)
- Graphing engine - [D3.js](https://d3js.org/)
