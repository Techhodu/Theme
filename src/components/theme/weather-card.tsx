import { Cloud } from 'lucide-react';

interface WeatherData {
  weather: Array<{
    main: string;
    description: string;
  }>;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

export const revalidate = 60 * 5;

async function getWeatherData(): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      console.error("OPENWEATHER_API_KEY is not set");
      return null;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=28.644800&lon=77.216721&appid=${apiKey}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export default async function WeatherCard() {
  const weather = await getWeatherData();

  if (!weather) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">Unable to fetch weather data. Please try again later.</p>
      </div>
    );
  }

  // Convert Kelvin to Celsius and round to nearest integer
  const temp = Math.round(weather.main.temp - 273.15);
  const maxTemp = Math.round(weather.main.temp_max - 273.15);
  const minTemp = Math.round(weather.main.temp_min - 273.15);

  // Convert wind speed from m/s to km/h
  const windSpeed = Math.round(weather.wind.speed * 3.6);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-600">आज का तापमान</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-6xl font-medium">{temp}°C</span>
            <Cloud className="h-8 w-8 text-gray-400" />
          </div>
          <div className="text-right">
            <div className="text-lg font-medium">{weather.name}</div>
            <div className="text-sm text-gray-600">
              H {maxTemp} / L {minTemp}
            </div>
            <div className="text-sm text-gray-500">
              {weather.weather[0].main}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 text-sm text-gray-600 border-t">
          <div>Humidity: {weather.main.humidity}%</div>
          <div>Wind: {windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
}

