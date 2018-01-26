import * as React from "react";
import { get, DataUrl } from "../../../data/fetch";
import { $img } from "../../../tools/config";
const Fragment = React.Fragment

type WeatherDetails = { time: string, list: [{ station_Name: string, tem: number }] };
interface IWeatherProps {
}
interface IWeatherState {
    weatherData?: WeatherDetails
}
export default class Weather extends React.Component<IWeatherProps, IWeatherState> {
    constructor(props: IWeatherProps) {
        super(props)
        this.state = {
            weatherData: undefined
        }

        get<WeatherDetails>(DataUrl.weatcherAddress).then(d => {
            this.setState({ weatherData: d });
        })

    }

    render() {
        const { weatherData } = this.state

        if (weatherData == undefined) {
            return <span>LOADING ...</span>
        }
        return (
            <span>
                {weatherData.list[0].station_Name} <img src={`${$img}could.png`}/>： 今日気温 {weatherData.list[0].tem}
            </span>
        )
    }
}