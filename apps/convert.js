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

### Time
- sec, min, hour, day, year, millennium, decade, century, epoch, fortnight, microsecond, nanosecond

### Frequency
- Hz, RPM, BPM, GHz, MHz, kHz

### Length
- km, m, cm, mm, nanometer, micrometer, in, ft, yd, mi, angstrom, league, nauticalmile, lightyear

### Mass
- kg, gram, mg, lb, oz, tonne, grain, slug

### Temperature
- degC, degF, K, degR

### Volume
- L, gal, mL, ft^3, m^3, tsp, Tbsp, cup, in^3, barrel, bushel, pint, quart, peck

### Speed
- m/s, km/h, mph, ft/min, knot, mach

### Acceleration
- m/s2, ft/s2, g

### Angles
- degrees, radians, gradian, arcmin, arcsec

### Energy
- J, cal, kcal, kJ, erg, Wh, BTU, eV, foot-pound

### Force
- N, lbf, dyne, kgf

### Torque
- N+m, ft-lbf

### Pressure
- Pa, psi, atm, torr, kPa, bar, mmHg

### Power
- W, hp, BTU/h, erg/s, cal/s

### Magnetic Field
- tesla, gauss, A/m

### Ionizing Radiation Exposure
- R, C/kg, Sv

### Fuel Efficiency
- mpg, L/100km, km/L

### Data
- bit, byte, KB, MB, GB, TB, PB, EB, ZB, YB, nibble

### Paper Size
- A3, A4, A5, B4, B5, letter, legal, tabloid

### Blood Sugar
- mg/dL, mmol/L

### Density
- kg/m3, g/cm3, lb/ft3, lb/in3, oz/in3

### Radio Activity
- Bq, Ci, Rd, Gy

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

const unitDimensions = {
  // Time
  "sec": "time", "min": "time", "hour": "time", "day": "time", "year": "time", "millennium": "time", "decade": "time", "century": "time", "epoch": "time", "fortnight": "time", "microsecond": "time", "nanosecond": "time",
  // Frequency
  "Hz": "frequency", "RPM": "frequency", "BPM": "frequency", "GHz": "frequency", "MHz": "frequency", "kHz": "frequency",
  // Length
  "km": "length", "m": "length", "cm": "length", "mm": "length", "nanometer": "length", "micrometer": "length", "in": "length", "ft": "length", "yd": "length", "mi": "length", "angstrom": "length", "league": "length", "nauticalmile": "length", "lightyear": "length",
  // Mass
  "kg": "mass", "gram": "mass", "mg": "mass", "lb": "mass", "oz": "mass", "tonne": "mass", "grain": "mass", "slug": "mass",
  // Temperature
  "degC": "temperature", "degF": "temperature", "K": "temperature", "degR": "temperature",
  // Volume
  "L": "volume", "gal": "volume", "mL": "volume", "ft^3": "volume", "m^3": "volume", "tsp": "volume", "Tbsp": "volume", "cup": "volume", "in^3": "volume", "barrel": "volume", "bushel": "volume", "pint": "volume", "quart": "volume", "peck": "volume",
  // Speed
  "m/s": "speed", "km/h": "speed", "mph": "speed", "ft/min": "speed", "knot": "speed", "mach": "speed",
  // Acceleration
  "m/s2": "acceleration", "ft/s2": "acceleration", "g": "acceleration",
  // Angles
  "degrees": "angle", "radians": "angle", "gradian": "angle", "arcmin": "angle", "arcsec": "angle",
  // Energy
  "J": "energy", "cal": "energy", "kcal": "energy", "kJ": "energy", "erg": "energy", "Wh": "energy", "BTU": "energy", "eV": "energy", "foot-pound": "energy",
  // Force
  "N": "force", "lbf": "force", "dyne": "force", "kgf": "force",
  // Torque
  "N+m": "torque", "ft-lbf": "torque",
  // Pressure
  "Pa": "pressure", "psi": "pressure", "atm": "pressure", "torr": "pressure", "kPa": "pressure", "bar": "pressure", "mmHg": "pressure",
  // Power
  "W": "power", "hp": "power", "BTU/h": "power", "erg/s": "power", "cal/s": "power",
  // MagneticField
  "tesla": "magnetic_field", "gauss": "magnetic_field", "A/m": "magnetic_field",
  // IonizingRadiationExposure
  "R": "ionizing_radiation_exposure", "C/kg": "ionizing_radiation_exposure", "Sv": "ionizing_radiation_exposure",
  // FuelEfficiency
  "mpg": "fuel_efficiency", "L/100km": "fuel_efficiency", "km/L": "fuel_efficiency",
  // Data
  "bit": "data", "byte": "data", "KB": "data", "MB": "data", "GB": "data", "TB": "data", "PB": "data", "EB": "data", "ZB": "data", "YB": "data", "nibble": "data",
  // PaperSize
  "A3": "paper_size", "A4": "paper_size", "A5": "paper_size", "B4": "paper_size", "B5": "paper_size", "letter": "paper_size", "legal": "paper_size", "tabloid": "paper_size",
  // BloodSugar
  "mg/dL": "blood_sugar", "mmol/L": "blood_sugar",
  // Density
  "kg/m3": "density", "g/cm3": "density", "lb/ft3": "density", "lb/in3": "density", "oz/in3": "density",
  // RadioActivity
  "Bq": "radioactivity", "Ci": "radioactivity", "Rd": "radioactivity", "Gy": "radioactivity",
};

const unitToBase = {
  // Time
  "sec": 1, "min": 60, "hour": 3600, "day": 86400, "year": 31536000, "millennium": 31536000000, "decade": 315360000, "century": 3153600000, "epoch": 31557600000, "fortnight": 1209600, "microsecond": 1e-6, "nanosecond": 1e-9,
  // Frequency
  "Hz": 1, "RPM": 1 / 60, "BPM": 1 / 60, "GHz": 1e9, "MHz": 1e6, "kHz": 1e3,
  // Length
  "km": 1000, "m": 1, "cm": 0.01, "mm": 0.001, "nanometer": 1e-9, "micrometer": 1e-6, "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.34, "angstrom": 1e-10, "league": 4828.032, "nauticalmile": 1852, "lightyear": 9.461e15,
  //Mass
  "kg": 1, "gram": 0.001, "mg": 1e-6, "lb": 0.453592, "oz": 0.0283495, "tonne": 1000, "grain": 6.47989e-5, "slug": 14.5939,
  //Temperature
  "degC": 1, "degF": 1, "K": 1, "degR": 1,
  //Volume
  "L": 1, "gal": 3.78541, "mL": 0.001, "ft^3": 0.0283168, "m^3": 1, "tsp": 0.00492892, "Tbsp": 0.0147868, "cup": 0.237, "in^3": 1.6387e-5, "barrel": 0.158987, "bushel": 0.0352391, "pint": 0.473176, "quart": 0.946353, "peck": 0.00880977,
  //Speed
  "m/s": 1, "km/h": 0.277778, "mph": 0.44704, "ft/min": 0.00508, "knot": 0.514444, "mach": 343,
  //Acceleration
  "m/s2": 1, "ft/s2": 0.3048, "g": 9.80665,
  //Angles
  "degrees": 1, "radians": 57.2958, "gradian": 1.11111, "arcmin": 0.0166667, "arcsec": 0.000277778,
  //Energy
  "J": 1, "cal": 4.184, "kcal": 4184, "kJ": 1000, "erg": 1e-7, "Wh": 3600, "BTU": 1055.06, "eV": 1.60218e-19, "foot-pound": 1.35582,
  //Force
  "N": 1, "lbf": 4.44822, "dyne": 1e-5, "kgf": 9.80665,
  //Torque
  "N+m": 1, "ft-lbf": 1.35582,
  //Pressure
  "Pa": 1, "psi": 6894.76, "atm": 101325, "torr": 133.322, "kPa": 1000, "bar": 100000, "mmHg": 133.322,
  //Power
  "W": 1, "hp": 745.7, "BTU/h": 0.293071, "erg/s": 1e-7, "cal/s": 4.184, 
  //MagneticField
  "tesla": 1, "gauss": 1e-4, "A/m": 79.5775,
  //IonizingRadiationExposure
  "R": 2.58e-4, "C/kg": 1, "Sv": 1,
  //FuelEfficiency
  "mpg": 1, "L/100km": 235.215, "km/L": 0.425144,
  //Data
  "bit": 1, "byte": 8, "KB": 8192, "MB": 8388608, "GB": 8589934592, "TB": 8796093022208, "PB": 9007199254740992, "EB": 9.22337203685478e18, "ZB": 9.44473296573929e21, "YB": 9.67140655691703e24, "nibble": 4,
  //PaperSize
  "A3": 1, "A4": 0.5, "A5": 0.25, "B4": 0.9, "B5": 0.45, "letter": 0.514444, "legal": 0.646222, "tabloid": 1.02889,
  //BloodSugar
  "mg/dL": 1, "mmol/L": 0.0555,
  //Density
  "kg/m3": 1, "g/cm3": 1000, "lb/ft3": 16.0185, "lb/in3": 27679.9, "oz/in3": 1728,
  // RadioActivity
  "Bq": 1, "Ci": 3.7e10, "Rd": 1, "Gy": 100,
};


