const width = 700
const height = 400

/* Create svg-element. */
const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

/* Select projection, scale, and translate (position). */
const projection = d3.geoNaturalEarth1()
  .scale(125)
  .translate([width/2, height/2])

/* Create a path-element. */
const path = d3.geoPath(projection)

/* Create a path-element for the sphere. */
svg.append("path")
  .attr("class", "sphere")
  .attr("d", path({type: "Sphere"}))

/* Create a g-element for grouping all the individual paths. */
const g = svg.append("g")

/* Read data, convert from topojson to geojson, append paths. */
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(data => {
    const countries = topojson.feature(data, data.objects.countries)
    g.selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("id", (d, i) => countries.features[i].id)
      .attr("name", (d, i) => countries.features[i].properties.name)
      .attr("d", path)
      .on("mouseover", (event, d) => {
        text.innerText = "This is " + d.properties.name
      })
  })

/* Display some text */
const div = document.getElementById("text")
const text = document.createElement("h1")
text.innerText = "Hover over a country to display name"
div.appendChild(text)
