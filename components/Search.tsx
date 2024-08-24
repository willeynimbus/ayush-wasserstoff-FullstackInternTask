"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import WeatherDesciption from "./WeatherDesciption";
import Forecast from "./Forecast";

interface weatherData {
  weather: { icon: string; description: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  dt: number;
  name: string;
}

interface forecastData {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { icon: string; description: string }[];
  }[];
}

export default function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<weatherData>();
  const [forecast, setForecast] = useState<forecastData>();
  const [error, setError] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0203e50ff8df1967b35ece9c3ad701e8`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0203e50ff8df1967b35ece9c3ad701e8&units=metric`;
  function handelOnChange(e: any) {
    setCity(e.target.value);
  }

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      let forecastResponse = await fetch(forecastUrl);
      let forecastOutput = await forecastResponse.json();
      if (response.ok && forecastResponse.ok) {
        setWeather(output);
        setForecast(forecastOutput);
        setError("");
      } else {
        setError("City not found");
      }
    } catch (error) {}
  }
  return (
    <div className="">
      <div className="flex justify-center w-full">
        <Input placeholder="Search" value={city} onChange={handelOnChange} />
        <Button
          size={"icon"}
          className="ml-2 bg-black/25"
          variant={"ghost"}
          onClick={() => fetchData()}
        >
          <SearchIcon />
        </Button>
      </div>

      {error && (
        <p className="text-red-500 flex items-center justify-center mt-2 font-semibold">
          {error}
        </p>
      )}
      <WeatherDesciption weather={weather} />
      <Forecast forecast={forecast} />
    </div>
  );
}
