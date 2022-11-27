import axios from "axios";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { Text, Card, Paragraph, Divider } from "react-native-paper";

function HomeScreen() {
  const [data, setData] = useState({});
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Argentina/today?lang=es&unitGroup=metric&include=hours%2Cfcst&key=M8R3Z37QTS2TJCTFZF85XJNPJ&options=nonulls&contentType=json"
      )
      .then((response) => {
        setData(response.data);
        setDays(response.data.days);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Obtener la ciudad formateada
  function getCiudad() {
    let region = data.timezone;
    let string = region || "";
    let arrayCiudad = string.split("/");
    let ciudad = arrayCiudad[2]?.replace("_", " ");
    return ciudad;
  }

  //Obtener la hora
  function getHoraActual() {
    let date = new Date();
    let horaActual = date.getHours();

    return horaActual;
  }

  //Hora formateada
  function getHoraFormateada(x) {
    let hora = x;
    let horaFormateada = hora.substr(0, 2);
    return horaFormateada;
  }

  //Obtener la temperatura
  function getTemperatura() {
    const temperatura = days.map((item) => {
      return item.temp;
    });

    return temperatura;
  }

  //Temperatura formateada
  function getTemperaturaFormateada(x) {
    let temp = x;
    let tempFormateada = temp.toFixed(0);
    return tempFormateada;
  }

  //Obtener el estado
  function getWeatherEstado() {
    const estado = days.map((item) => {
      return item.conditions;
    });
    return estado;
  }

  //Obtener el icono
  function getNombreIcono() {
    const icono = days.map((item) => {
      return item.icon;
    });
    return icono;
  }

  function getWeatherIcons(x) {
    const icon = days.map((item, index) => {
      const equivalencias = {
        "clear-day": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/clear-day.svg")}
            key={index}
          />
        ),
        "clear-night": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/clear-night.svg")}
            key={index}
          />
        ),
        "cloudy": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/cloudy.svg")}
            key={index}
          />
        ),
        "fog": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/fog.svg")}
            key={index}
          />
        ),
        "hail": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/hail.svg")}
            key={index}
          />
        ),
        "partly-cloudy-day": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/partly-cloudy-day.svg")}
            key={index}
          />
        ),
        "partly-cloudy-night": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/partly-cloudy-night.svg")}
            key={index}
          />
        ),
        "rain-snow-showers-day": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/rain-snow-showers-day.svg")}
            key={index}
          />
        ),
        "rain-snow-showers-night": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/rain-snow-showers-night.svg")}
            key={index}
          />
        ),
        "rain-snow": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/rain-snow.svg")}
            key={index}
          />
        ),
        "rain": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/rain.svg")}
            key={index}
          />
        ),
        "showers-day": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/showers-day.svg")}
            key={index}
          />
        ),
        "showers-night": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/showers-night.svg")}
            key={index}
          />
        ),
        "sleet": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/sleet.svg")}
            key={index}
          />
        ),
        "snow-showers-day": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/snow-showers-day.svg")}
            key={index}
          />
        ),
        "snow-showers-night": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/snow-showers-night.svg")}
            key={index}
          />
        ),
        "snow": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/snow.svg")}
            key={index}
          />
        ),
        "thunder-rain": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/thunder-rain.svg")}
            key={index}
          />
        ),
        "thunder-showers-day": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/thunder-showers-day.svg")}
            key={index}
          />
        ),
        "thunder-showers-night": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/thunder-showers-night.svg")}
            key={index}
          />
        ),
        "thunder": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/thunder.svg")}
            key={index}
          />
        ),
        "wind": (
          <Image
            style={styles.icon}
            source={require("./../assets/icons/wind.svg")}
            key={index}
          />
        ),
      };

      return equivalencias[x] || "No encontrado";
    });
    return icon;
  }

  function getForecast() {
    const forecast = days.map((item) => {
      return item.hours.map((e, i) => {
        if (e.conditions != "") {
          return (
            <View style={styles.itemList} key={i}>
              {getHoraFormateada(e.datetime) == getHoraActual() ? (
                <Text variant="bodySmall" style={{ color: "white" }}>
                  Ahora
                </Text>
              ) : (
                <Text variant="bodySmall" style={{ color: "white" }}>
                  {getHoraFormateada(e.datetime)}
                </Text>
              )}

              <View
                style={{
                  width: 20,
                  height: 20,
                  marginVertical: 5,
                }}
              >
                {getWeatherIcons(e.icon)}
              </View>
              <Text style={{ color: "white" }}>
                {getTemperaturaFormateada(e.temp)}º
              </Text>
            </View>
          );
        }
      });
    });
    return forecast;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ color: "white" }}>
        {getCiudad()}
      </Text>
      <Text variant="displayMedium" style={{ color: "white" }}>
        {getTemperatura()}°
      </Text>
      <View style={{ width: 40, height: 40, marginVertical: 5 }}>
        {getWeatherIcons(getNombreIcono())}
      </View>
      <Text variant="titleMedium" style={{ color: "white" }}>
        {getWeatherEstado()}
      </Text>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={styles.cardParagraph}>
            {getWeatherEstado()}, condiciones esperadas para las{" "}
            {getHoraActual()}.
          </Paragraph>
          <Divider />
          <View style={styles.viewList}>{getForecast()}</View>
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
    justifyContent: "flex-start",
    flexWrap: "no-wrap",
    overflow: "scroll",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 5,
  },
  icon: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

module.exports = HomeScreen;
