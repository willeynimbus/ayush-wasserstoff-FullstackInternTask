import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface forecastData {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { icon: string; description: string }[];
  }[];
}

interface ForecastProps {
  forecast: forecastData | undefined;
}

export default function Forecast({ forecast }: ForecastProps) {
  const [isCelsius, setIsCelsius] = useState(true);

  const convertToFahrenheit = (celsius: number) => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <section>
      <div className="w-full h-full border bg-white/25 mt-2 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">5-Day Forecast</h2>
          <Button
            size={"icon"}
            onClick={() => setIsCelsius(!isCelsius)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isCelsius ? "°F" : "°C"}
          </Button>
        </div>
        {forecast ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.list.slice(0, 5).map((item, index) => {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() + index);
              const temp = isCelsius
                ? item.main.temp
                : convertToFahrenheit(item.main.temp);
              return (
                <div
                  key={index}
                  className="bg-blue-200 w-full p-4 rounded-lg flex flex-col justify-center items-center"
                >
                  <p className="font-semibold">
                    {`${currentDate.getDate()}/${
                      currentDate.getMonth() + 1
                    }/${currentDate.getFullYear().toString().substr(2, 2)}`}
                  </p>
                  <Image
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                    width={50}
                    height={50}
                  />
                  <p>
                    {temp.toFixed(1)}°{isCelsius ? "C" : "F"}
                  </p>
                  <p className="text-sm font-sans font-medium text-nowrap">
                    {item.weather[0].description.charAt(0).toUpperCase() +
                      item.weather[0].description.slice(1)}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center">No forecast data available</p>
        )}
      </div>
    </section>
  );
}
