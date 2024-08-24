"use client";
import {
  Coffee,
  Sun,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface weatherData {
  weather: { icon: string; description: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt: number;
  name: string;
}

interface WeatherDesciptionProps {
  weather: weatherData | undefined;
}

export default function WeatherDesciption({ weather }: WeatherDesciptionProps) {
  const getDescriptionColor = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear":
        return "yellow-500";
      case "cloudy":
        return "gray-500";
      case "rainy":
        return "blue-500";
      default:
        return "slate-500";
    }
  };
  const [isCelsius, setIsCelsius] = useState(true);

  function convertToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  function convertToCelsius(kelvin: number) {
    return kelvin - 273.15;
  }

  return (
    <section>
      {weather ? (
        <div className="flex flex-col justify-center items-stretch h-full border mt-2 p-2  rounded-lg bg-slate-200/25 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-2xl text-white font-bold">{weather.name}</h1>
            <div className="flex flex-col items-center justify-center gap-6 w-[50%] border rounded-lg p-2">
              <h1 className="text-xl font-bold text-white">
                {new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(weather.dt * 1000))}
              </h1>
              <div className="flex gap-10 items-center justify-center">
                <h1 className="text-[40px] font-bold text-white ">
                  {isCelsius
                    ? convertToCelsius(weather.main.temp).toFixed(1)
                    : convertToFahrenheit(
                        convertToCelsius(weather.main.temp)
                      ).toFixed(1)}
                  °{isCelsius ? "C" : "F"}
                </h1>
                <Button
                  size={"icon"}
                  onClick={() => setIsCelsius(!isCelsius)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isCelsius ? "°F" : "°C"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
                width={150}
                height={150}
              />
              <p
                className={`text-${getDescriptionColor(
                  weather.weather[0].description
                )} font-medium text-xl`}
              >
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4 p-2 overflow-hidden">
            <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-2">
              <p className="font-bold text-black text-lg text-nowrap">
                Humidity
              </p>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <Coffee
                  size={30}
                  fill="rgba(0, 0, 255, 0.2)"
                  className="text-amber-900"
                />
                <p className="font-semibold text-black">
                  {weather.main.humidity}%
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-2">
              <p className="font-bold text-black text-lg text-nowrap">Min: </p>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <ThermometerSnowflake
                  size={30}
                  fill="rgba(0, 0, 255, 0.2)"
                  className="text-white"
                />
                <p className="font-semibold text-black">
                  {isCelsius
                    ? convertToCelsius(weather.main.temp_min).toFixed(1)
                    : convertToFahrenheit(
                        convertToCelsius(weather.main.temp_min)
                      ).toFixed(1)}
                  °{isCelsius ? "C" : "F"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-2">
              <p className="font-bold text-black text-lg text-nowrap">Max: </p>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <ThermometerSun
                  size={30}
                  fill="red"
                  className="text-yellow-200"
                />
                <p className="font-semibold text-black">
                  {isCelsius
                    ? convertToCelsius(weather.main.temp_max).toFixed(1)
                    : convertToFahrenheit(
                        convertToCelsius(weather.main.temp_max)
                      ).toFixed(1)}
                  °{isCelsius ? "C" : "F"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-2">
              <p className="font-bold text-black text-lg text-nowrap">
                Wind Speed:{" "}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <Wind size={30} className="text-sky-700" />
                <p className="font-semibold text-black">
                  {weather.wind.speed}m/sec
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-full md:h-[65vh] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Sun fill="yellow" className="text-yellow-200" size={100} />
            <p className="text-3xl font-bold text-center text-white">
              Welcome to the weather app
            </p>
            <p className="text-lg font-medium text-slate-500 text-center ">
              Get the latest weather update for your city. Just enter the name
              of the city and get started
            </p>
          </div>
          <div className=" mt-10 space-y-4">
            <p className="text-3xl font-bold text-center text-black underline">
              Features
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              <div className="flex flex-col items-center justify-center border rounded-lg p-2 gap-4">
                <span className="font-semibold font-serif">Humidity</span>
                <p className="text-sm font-medium text-center text-white">
                  Humidity levels are displayed in percentage.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center border rounded-lg p-2 gap-4">
                <span className="font-semibold font-serif text-nowrap ">
                  Min. and Max. Temp.
                </span>
                <p className="text-sm font-medium text-center text-white">
                  Min. and Max. temperatures are displayed.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center border rounded-lg p-2 gap-4">
                <span className="font-semibold font-serif">5 Day Forecast</span>
                <p className="text-sm font-medium text-center text-white">
                  Get 5 days Forecast for your city.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
