// Mappings found @ http://openweathermap.org/weather-conditions

module.exports = [
    { from: 200, to: 300, name: 'thunder-storms' },
    { from: 300, to: 400, name: 'rainy' }, // drizzle
    { from: 500, to: 600, name: 'rainy' },
    { from: 600, to: 700, name: 'snowy' },
    { from: 800, to: 801, name: 'sunny' },
    { from: 801, to: 900, name: 'cloudy' } // special case: 800 is clear sky
];
