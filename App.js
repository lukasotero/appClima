import axios from "axios";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

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

  //Saber si esta soleado, lloviendo, etc
  function getEstado() {
    const estado = clima.weathercode;

    if (estado == 0) {
      return "Despejado";
    } else if (estado == 1) {
      return "Parcialmente despejado";
    } else if (estado == 2) {
      return "Parcialmente Nublado";
    } else if (estado == 3) {
      return "Nublado";
    } else if (estado == 45) {
      return "Niebla";
    } else if (estado == 48) {
      return "Niebla espesa";
    } else if (estado == 51) {
      return "Llovizna ligera";
    } else if (estado == 53) {
      return "Llovizna moderada";
    } else if (estado == 55) {
      return "Llovizna intensa";
    } else if (estado == 56) {
      return "Llovizca con nieve ligera";
    } else if (estado == 57) {
      return "Llovizca con nieve densa";
    } else if (estado == 61) {
      return "Lluvia leve";
    } else if (estado == 63) {
      return "Lluvia moderada";
    } else if (estado == 65) {
      return "Lluvia intensa";
    } else if (estado == 66) {
      return "Lluvia helada ligera";
    } else if (estado == 67) {
      return "Lluvia healda intensa";
    } else if (estado == 71) {
      return "Nevada leve";
    } else if (estado == 73) {
      return "Nevada moderada";
    } else if (estado == 75) {
      return "Nevada intensa";
    } else if (estado == 77) {
      return "Copos de nieve";
    } else if (estado == 80) {
      return "Chubascos leve";
    } else if (estado == 81) {
      return "Chubascos moderado";
    } else if (estado == 82) {
      return "Chubascos violentos";
    } else if (estado == 85) {
      return "Granizo leve";
    } else if (estado == 86) {
      return "Granizo intenso";
    } else if (estado == 95) {
      return "Tormenta leve o moderada";
    } else if (estado == 96) {
      return "Tormenta con granizo leve";
    } else if (estado == 99) {
      return "Tormenta con granizo denso";
    }

    return estado;
  }

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.textHora}>
        {getHora()}
      </Text>
      <Text variant="headlineSmall" style={styles.textPais}>
        {getPais()}
      </Text>
      <Text variant="displayMedium" style={styles.textCiudad}>
        {getCiudad()}
      </Text>
      <Text variant="titleLarge" style={styles.textEstado}>
        {getEstado()}
      </Text>
      <Text variant="displaySmall" style={styles.textTemperatura}>
        {clima.temperature}°
      </Text>
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
  },
  textHora: {
    marginBottom: 15,
    fontFamily: "montserrat",
    color: "#fff",
    fontWeight: "bold",
  },
  textPais: {
    fontFamily: "montserrat",
    color: "#fff",
  },
  textCiudad: {
    fontFamily: "montserrat",
    color: "#fff",
  },
  textTemperatura: {
    marginTop: 10,
    fontFamily: "montserrat",
    color: "#fff",
  },
  textEstado: {
    fontFamily: "montserrat",
    color: "#fff",
  },
});
