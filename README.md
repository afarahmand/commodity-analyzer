<h1>Commodity Analyzer</h1>
<a href="https://afarahmand.github.io/commodity-analyzer/">Live App</a>

<h2>Background and Overview</h2>
Commodity Analyzer is a tool using chart.js to chart information related to commodities.

Users select one or more commodities and are shown historical information about their selection.  Since a commodity has multiple values throughout a day, I anticipate using only one or more of the close price, minimum, or maximum price.

Commodity Analyzer will use the Quandl API to access stock and commodity data.

<h2>Functionality & MVP</h2>

- [ ]  As a first feature, users are able to view a first chart of time-series information related to one or more selected commodities.  Displayed information includes at least price information.

<h2>Wireframes</h2>
The app will include a single screen with the first and second charts together with an input text box and a submit button.

[https://raw.githubusercontent.com/afarahmand/stock-alerter/master/stock_alerter.png]
(Commodity Analyzer)

<h2>Architecture and Technologies</h2>
The following technologies will be used for this project:
<ul>  
  <li>Vanilla Javascript</li>
  <li>chart.js for charting information</li>
  <li>Quandl API for accessing stock and commodity data</li>
  <li>Webpack for bundling</li>
</ul>

It is anticipated that there will be 4 scripts in addition to the webpack entry file:
<ul>
  <li>chart.js - the standard chart.js library for charting</li>
  <li>stock_api_util.js - a script for constructing one or more requests to the Quandl API based on a user selected stock, commodity, or combination thereof</li>
  <li>chart1.js - a script for creating a line chart based on the user selected input that displays either a chart of time vs. price or time vs. the result of the mathematical expression</li>
</ul>

<h2>Implementation Timeline</h2>
<h3>Weekend</h3>
* project proposal

* implement a basic chart.js time-series chart from static data

<h3>Day 1</h3>
* Continue working on chart

* Make the chart look good: zooming, have ticks, have it scale appropriately (especially when zooming)

<h3>Day 2</h3>
* Receive real data from Quandl API and display on chart1

* Receive data based on user input of only 1 stock or commodity

<h3>Day 3</h3>
* Extend the functionality of chart1 to display based on a mathematical equation of 2 or more stocks or commodities

<h3>Day 4</h3>
* Be able to mouseover line chart of chart 1

<h2>Bonus features:</h2>
* Implement an alerter service that allows a user to set a condition, and if that condition is met, notify the user via email.  The condition could initially include less than or greater than some value.

* Add volume or additional stock indicators (RSI, etc.) to chart1

* A statistical analysis will be performed on the data, and a second chart will show a probability mass function that plots the probability of a value vs. the value.
