export async function convert(arg) {
  if (!arg) {
    return `
Format: 'convert [number] [fromUnit] [toUnit]

## Examples:

### Length
- [convert 1 mi km](cmd://convert 1 mi km) converts 1 mile to kilometers
- [convert 5 ft m](cmd://convert 5 ft m) converts 5 feet to meters

### Weight
- [convert 200 lbs kg](cmd://convert 200 lbs kg) converts 200 pounds to kilograms
- [convert 50 kg lbs](cmd://convert 50 kg lbs) converts 50 kilograms to pounds

### Temperature
- [convert 32 F C](cmd://convert 32 F C) converts 32°F to °C
- [convert 100 C F](cmd://convert 100 C F) converts 100°C to °F

### Volume
- [convert 1 gal L](cmd://convert 1 gal L) converts 1 gallon to liters
- [convert 2 L gal](cmd://convert 2 L gal) converts 2 liters to gallons

### Speed
- [convert 60 mph km/h](cmd://convert 60 mph km/h) converts 60 miles per hour to km/h

## Supported Units (fromUnit → toUnit):

### Length
- m → cm, mm, in, ft, yd, mi, km
- cm → m, mm, in, ft, yd, mi, km
- mm → m, cm, in, ft, yd, mi, km
- in → m, cm, mm, ft, yd, mi, km
- ft → m, cm, mm, in, yd, mi, km
- yd → m, cm, mm, in, ft, mi, km
- mi → m, cm, mm, in, ft, yd, km
- km → m, cm, mm, in, ft, yd, mi

### Weight
- kg → g, mg, lb, oz
- g → kg, mg, lb, oz
- mg → kg, g, lb, oz
- lb → kg, g, mg, oz
- oz → kg, g, mg, lb

### Temperature
- °C → °F
- °F → °C

### Volume
- L → gal, ml, ft^3, m^3
- gal → L, ml, ft^3, m^3
- ml → L, gal, ft^3, m^3
- ft^3 → L, gal, ml, m^3
- m^3 → L, gal, ml, ft^3

### Speed
- m/s → km/h, mph
- km/h → m/s, mph
- mph → m/s, km/h

### And many more...

Supported engineering notations: f, p, n, u, m, c, d, k, M, G, T
(from femto 1e-15 to tera 1e12)`;
  }

  const params = arg.split(' ');
  if (params.length !== 3) {
    return "Invalid number of parameters. Format: 'convert [number] [fromUnit] [toUnit]'";
  }

  const [n, fromUnitRaw, toUnitRaw] = params;
  const fromUnit = fromUnitRaw.toLowerCase();
  const toUnit = toUnitRaw.toLowerCase();
  const num = convertEngineeringNotationToNumber(n);

  const fromDimension = unitDimensions[fromUnit];
  const toDimension = unitDimensions[toUnit];

  if (fromDimension !== toDimension) {
    return `Invalid conversion from \`${fromDimension}\` units to \`${toDimension}\` units.`;
  }

  if (fromDimension === "currency") {
    const rate = await fetchCurrencyRates(fromUnit.toUpperCase(), toUnit.toUpperCase());
    if (rate === null) {
      return "Failed to fetch currency rate.";
    }
    return (num * rate).toLocaleString('en-US');
  }

  const fromBaseUnit = unitToBase[fromUnit];
  const toBaseUnit = unitToBase[toUnit];

  if (fromBaseUnit === undefined || toBaseUnit === undefined) {
    return "Conversion not supported.";
  }

  const result = num * (fromBaseUnit / toBaseUnit);
  return result.toLocaleString('en-US');
}

// async function fetchCurrencyRates(fromCurrency, toCurrency) {
//   const url = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`;

//   const response = await fetch(url);
//   if (response.status !== 200) {
//     return null;
//   }

//   const data = await response.json();
//   return data.rates[toCurrency];
// }

// async function fetchSupportedCurrencies() {
//   let supportedCurrencies = [];
//   try {
//     const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
//     const data = await response.json();
//     supportedCurrencies = Object.keys(data.rates);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
//   return supportedCurrencies;
// }

// (async function() {
//   const supportedCurrencies = await fetchSupportedCurrencies();
//   for (const currency of supportedCurrencies) {
//     unitDimensions[currency.toLowerCase()] = "currency";
//   }
// })();

function convertEngineeringNotationToNumber(str) {
  const engineeringNotations = {
    'f': 1e-15, 'p': 1e-12, 'n': 1e-9, 'u': 1e-6, 'm': 1e-3,
    'c': 1e-2, 'd': 1e-1, 'k': 1e3, 'M': 1e6, 'G': 1e9, 'T': 1e12
  };

  const lastChar = str.slice(-1);
  const value = parseFloat(str.slice(0, -1));

  return engineeringNotations[lastChar] ? value * engineeringNotations[lastChar] : parseFloat(str);
}

let unitDimensions = {
  // Physics and Engineering
  "m": "length", "ft": "length", "cm": "length", "in": "length", "miles": "length", "km/h": "velocity",
  "kg": "mass", "lbs": "mass", "s": "time", "min": "time", "°C": "temperature", "°F": "temperature",
  "m2": "area", "ft2": "area", "L": "volume", "gal": "volume",
  "m/s": "velocity", "mph": "velocity", "m/s2": "acceleration", "ft/s2": "acceleration",
  "J": "energy", "cal": "energy", "kcal": "caloricEnergy", "kJ": "caloricEnergy",
  "N": "force", "lbf": "force", "Pa": "pressure", "psi": "pressure",
  "W": "power", "hp": "power", "tesla": "magneticField", "gauss": "magneticField",
  "Hz": "frequency", "RPM": "frequency", "BPM": "tempo", "byte": "dataSize", "KB": "dataSize", "MB": "dataSize",
  "mpg": "fuelEfficiency", "L/100km": "fuelEfficiency", "N*m": "torque", "ft*lbf": "torque",

  // Design and Media
  "dpi": "resolution", "ppi": "resolution", "A4": "paperSize", "letter": "paperSize",
  "4:3": "aspectRatio", "16:9": "aspectRatio", "EV": "exposureValue",

  // Business and Computing
  // "USD": "currency", "EUR": "currency", 
  "APR": "interestRate", "APY": "interestRate",
  "FY": "businessTime", "Q": "businessTime", "$M": "marketCap", "$B": "marketCap",
  "single": "unitsSold", "dozen": "unitsSold", "gross": "unitsSold",
  "MIPS": "processingSpeed", "FLOPS": "processingSpeed", "bps": "bandwidth", "Mbps": "bandwidth", "Gbps": "bandwidth",

  // Environmental and Geography
  "degrees": "angles", "radians": "angles", "deg,min,sec": "geoCoords", "decimal": "geoCoords",
  "in": "rainfall",
  "AQI": "airQuality", "PM2.5": "airQuality", "PM10": "airQuality",

  // Medicine, Chemistry, and Material Science
  "mol/L": "concentration", "ppm": "concentration", "mg/dL": "bloodSugar", "mmol/L": "bloodSugar",
  "mg": "dosage", "ug": "dosage", "Katal": "enzymeUnits", "IU": "enzymeUnits",
  "g/cm3": "density", "kg/m3": "density", "Mohs": "hardness", "Vickers": "hardness",
  
  // Miscellaneous
  "dB": "sound", "lux": "lightIntensity", "Bq": "radioactivity", "curie": "radioactivity",
  "tex": "yarnCount", "denier": "yarnCount", "GSM": "fabricWeight", "oz/yd2": "fabricWeight",
  "tsp": "cookingUnits", "Tbsp": "cookingUnits", "cup": "cookingUnits", "/ft2": "pricePerSquare",
  "/m2": "pricePerSquare"
};

const unitToBase = {
  // Length
  "m": 1, "cm": 0.01, "mm": 0.001, "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.34, "km": 1000,
  // Mass
  "kg": 1, "g": 0.001, "mg": 1e-6, "lb": 0.453592, "oz": 0.0283495,
  // Time
  "s": 1, "min": 60, "h": 3600, 
  // Temperature
  "K": 1, "C": 1, "F": 1, 
  // Area
  "m^2": 1, "ft^2": 0.092903, "acre": 4046.86,
  // Volume
  "l": 1, "gal": 3.78541, "m^3": 1000, "ft^3": 28.3168,
  // Velocity
  "m/s": 1, "km/h": 0.277778, "mph": 0.44704,
  // Acceleration
  "m/s^2": 1, "ft/s^2": 0.3048,
  // Energy
  "J": 1, "cal": 4.184, "BTU": 1055.06,
  // Force
  "N": 1, "lbf": 4.44822,
  // Pressure
  "Pa": 1, "bar": 100000, "psi": 6894.76,
  // Fuel Efficiency
  "mpg": 1, "L/100km": 1,
  // Angle
  "degree": 1, "radian": 57.2958, "gradian": 63.662,
  // Cooking
  "tsp": 1, "tbsp": 3, "cup": 48,
  // Medicine
  "mg": 1, "mcg": 0.001, "mol/L": 1, "ppm": 1e-6,
  // Sports
  "cal": 1, "kJ": 0.239006,
  // Textiles
  "tex": 1, "denier": 9,
  // Geography
  "degree": 1, "minute": 1/60, "second": 1/3600,
  // Aviation
  "knot": 0.514444, "mph": 0.44704,
  // Chemistry
  "mol/L": 1, "g/cm^3": 1000, "kg/m^3": 1,
  // Computing
  "MIPS": 1, "FLOPS": 1, "bps": 1, "Mbps": 1e6, "Gbps": 1e9,
  // Environmental
  "mm": 1, "AQI": 1, "PM2.5": 1, "PM10": 1,
  // Music
  "Hz": 1, "kHz": 1000, "BPM": 1,
  // Real Estate
  "ft^2": 1, "m^2": 10.7639,
  // Automotive
  "N*m": 1, "ft*lbf": 1.35582,
  // Miscellaneous
  "dB": 1, "lux": 1, "Bq": 1, "Ci": 3.7e10
};
