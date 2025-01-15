import React from 'react'
import RHS_1 from '../RHS_1'
import RHS_2 from '../RHS_2'
import WeatherCard from "@/components/theme/weather-card";
import MGIDWidget from "@/components/ads/mgid";

export default function RHS_wrapper() {
  return (
    <div className="col-span-3 flex flex-col gap-3 md:flex-row lg:col-span-1 lg:flex-col">
        
        <WeatherCard/>
            <MGIDWidget widgetId="1725137" />
          <RHS_1   key={1}
                    limit={12}
                    category={"1"}
                    slug={"political-news"}
                    category_title={"राजनीतिक समाचार"} />
          <RHS_2 limit={6} />
        </div>
  )
}
