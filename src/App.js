import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment/moment";
import "moment/min/locales"
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';


// Redux imports
import {useSelector,useDispatch} from 'react-redux'
import { fetchWeather } from "./weatherApiSlice";

moment.locale("ar");




const theme = createTheme({
  typography: {
    fontFamily: ["Ibm"],
  },
});
function App() {
   
   const dispatch = useDispatch()
   const isLoad = useSelector((state)=>{
    return state.weather.isLoading
   })
   const temp = useSelector((state)=>{
     return state.weather.weather
   })
    
  const { t, i18n } = useTranslation();

 
  const [date,setDate] = useState("")
  const [local,setLocal] = useState("ar")

  const direction = local === "ar" ? "rtl" :"ltr"

  useEffect(()=>{
      
      // dispatch(changeState())     
      dispatch(fetchWeather())

     i18n.changeLanguage(local)
  },[dispatch,i18n,local])

  useEffect(() => {
    setDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
    
  }, []);
  
  // Event handlers 
  function handleLanguageClick (){
    if (local === "en"){
      setLocal("ar");
      i18n.changeLanguage("ar")
      moment.locale("ar");
    }else{
      setLocal("en");
      i18n.changeLanguage("en")
      moment.locale("en");
    }
       setDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
  }

  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Content Container */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* Card */}
            <div
              style={{
                background: "rgb(28 52 91 / 36%)",
                color: "#fff",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0 11px 1px rgba(0,0,0,0.05",
                width: "100%",
              }}
              dir={direction}
            >
              {/* Content Card */}
              <div>
                {/* City & Time */}
                <div dir={direction} style={{ display: "flex", alignItems: "end" }}>
                  <Typography
                    variant="h2"
                    style={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    {t("Riyadh")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                   {date}
                  </Typography>
                </div>
                {/* ==City & Time== */}
                <hr />
                {/* Container of Degree & Desc */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* Degree & Description */}
                  <div>
                    {/* Temp */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoad &&<CircularProgress style={{color:"white"}}/> }
                      <Typography variant="h2" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} alt="icon"/>
                    </div>
                    {/* ==Temp== */}

                    <Typography variant="h6" style={{ opacity: ".7" }}>
                      {t(temp.desc)}
                    </Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5> {t("min")}: {temp.min}</h5>
                      <h5 style={{ margin: "0 10px" }}>|</h5>
                      <h5> {t("max")}: {temp.max}</h5>
                    </div>
                    {/* ==MIN & MAX== */}
                  </div>
                  {/* ==Degree & Description== */}
                  <CloudIcon style={{ fontSize: "200px", color: "#fff" }} />
                </div>
                {/* Container of Degree & Desc */}
              </div>
              {/* ==Content Card== */}
            </div>
            {/* ==Card== */}

            {/* Translation Button */}
            <div
              dir={direction}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button style={{ color: "#fff" }} variant="text" onClick={handleLanguageClick}>
                {local !== "en" ? "انجليزي" : "Arabic"}
              </Button>
            </div>
            {/* Translation Button */}
          </div>
          {/* Content Container */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
