import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

 export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async()=>{
    const response = await axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.5&appid=eb9d2d46fb0583432e55abadc1753061"
      )
      
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const desc = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        // setTemp({
        //   number: responseTemp,
        //   min: min,
        //   max: max,
        //   desc: desc,
        //   icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        // });
        return {number:responseTemp,min,max,desc,icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`}
      }
    )
const weatherApiSlice = createSlice({
    name:"weatherApi",
    initialState:{
        result:"empty",
        weather:{},
        isLoading :false
    },
    reducers:{
        changeState:(state,action)=>{
            state.result = "change"
        }
    },
    extraReducers(builder){
        builder.addCase(fetchWeather.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(fetchWeather.fulfilled,(state,action)=>{
            state.isLoading = false
            state.weather = action.payload
        }).addCase(fetchWeather.rejected,(state,action)=>{
            state.isLoading = false
        })
    }
})

export const { changeState } = weatherApiSlice.actions
export default weatherApiSlice.reducer