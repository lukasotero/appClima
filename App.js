import axios from "axios";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text, Card, Paragraph, Divider } from "react-native-paper";
import {
  WiDaySunny,
  WiCloudy,
  WiDaySunnyOvercast,
  WiDayCloudyHigh,
  WiDayFog,
  WiFog,
  WiSprinkle,
  WiRaindrops,
  WiSleet,
  WiRainMix,
  WiRain,
  WiSnow,
  WiShowers,
  WiHail,
  WiThunderstorm,
  WiStormShowers,
  WiNa,
} from "react-icons/wi";

export default function App() {
  const [clima, setClima] = useState({});
  const [timeZone, setTimezone] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&current_weather=true&timezone=America/Argentina/Buenos_Aires"
      )
      .then((response) => {
        setTimezone(response.data.timezone);
        setClima(response.data.current_weather);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Obtener la ciudad formateada
  function getCiudad() {
    const arrayCiudad = timeZone.split("/");
    const ciudad = arrayCiudad[2]?.replace("_", " ");
    return ciudad;
  }

  //Obtener el pais
  function getPais() {
    const arrayPais = timeZone.split("/");
    return arrayPais[1];
  }

  //Obtener la hora formateada
  function getHora() {
    const hora = clima.time;
    const date = new Date(hora).toLocaleString("es-ES");
    return date;
  }

  //Obtener el estado del clima
  function getEstado(x) {
    const estado = {
      0: "Despejado",
      1: "Parcialmente despejado",
      2: "Parcialmente Nublado",
      3: "Nublado",
      45: "Niebla",
      48: "Niebla espesa",
      51: "Llovizna ligera",
      53: "Llovizna moderada",
      55: "Llovizna intensa",
      56: "Aguanieve ligera",
      57: "Aguanieve densa",
      61: "Lluvia leve",
      63: "Lluvia moderada",
      65: "Lluvia intensa",
      66: "Lluvia helada ligera",
      67: "Lluvia healda intensa",
      71: "Nevada leve",
      73: "Nevada moderada",
      75: "Nevada intensa",
      77: "Granizo",
      80: "Chaparrones leves",
      81: "Chaparrones moderados",
      82: "Chaparrones violentos",
      85: "Nevadas aisladas leve",
      86: "Nevadas aisladas intenso",
      95: "Tormenta leve o moderada",
      96: "Tormenta con granizo leve",
      99: "Tormenta con granizo denso",
    };

    return estado[x] ?? "no encontrado";
  }

  //Obtener el icono
  function getIcons(x) {
    const icons = {
      0: <WiDaySunny style={{ color: "yellow" }} />,
      1: <WiDaySunnyOvercast style={{ color: "white" }} />,
      2: <WiDayCloudyHigh style={{ color: "white" }} />,
      3: <WiCloudy style={{ color: "white" }} />,
      45: <WiDayFog style={{ color: "white" }} />,
      48: <WiFog style={{ color: "white" }} />,
      51: <WiSprinkle style={{ color: "white" }} />,
      53: <WiRaindrops style={{ color: "white" }} />,
      55: <WiRaindrops style={{ color: "white" }} />,
      56: <WiSleet style={{ color: "white" }} />,
      57: <WiSleet style={{ color: "white" }} />,
      61: <WiRain style={{ color: "white" }} />,
      63: <WiRain style={{ color: "white" }} />,
      65: <WiRain style={{ color: "white" }} />,
      66: <WiRainMix style={{ color: "white" }} />,
      67: <WiRainMix style={{ color: "white" }} />,
      71: <WiSnow style={{ color: "white" }} />,
      73: <WiSnow style={{ color: "white" }} />,
      75: <WiSnow style={{ color: "white" }} />,
      77: <WiHail style={{ color: "white" }} />,
      80: <WiShowers style={{ color: "white" }} />,
      81: <WiShowers style={{ color: "white" }} />,
      82: <WiShowers style={{ color: "white" }} />,
      85: <WiSnow style={{ color: "white" }} />,
      86: <WiSnow style={{ color: "white" }} />,
      95: <WiThunderstorm style={{ color: "white" }} />,
      96: <WiStormShowers style={{ color: "white" }} />,
      99: <WiStormShowers style={{ color: "white" }} />,
    };

    return icons[x] ?? "no encontrado";
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ color: "white" }}>
        {getCiudad()}
      </Text>
      <Text variant="displayMedium" style={{ color: "white" }}>
        {clima.temperature}°
      </Text>
      <Text variant="titleMedium" style={{ color: "white" }}>
        {getEstado()}
      </Text>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={styles.cardParagraph}>
            {getEstado()}, condiciones esperadas para las {getHora()}
          </Paragraph>
          <Divider />
          <View style={styles.viewList}>
            <View style={styles.itemList}>
              <Text variant="bodySmall" style={{ color: "white" }}>
                Ahora
              </Text>
              <Text style={styles.icon}>{getIcons(clima.weathercode)}</Text>
              <Text style={{ color: "white" }}>{clima.temperature}°</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: "linear-gradient(180deg, #2ab5fa 10%, #4C83FF 90%)",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
    color: "#ffffff",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginTop: 20,
    width: "90%",
    height: "auto",
    borderRadius: 20,
  },
  cardParagraph: {
    marginBottom: 10,
    color: "white",
  },
  viewList: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
});
