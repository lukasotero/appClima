import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Paragraph, Card, Text } from "react-native-paper";
import { WiStrongWind, WiHumidity, WiCloudy, WiRain } from "react-icons/wi";

function DetailsScreen() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Argentina/today?lang=es&unitGroup=metric&include=hours%2Cfcst&key=M8R3Z37QTS2TJCTFZF85XJNPJ&options=nonulls&contentType=json"
      )
      .then((response) => {
        setDays(response.data.days);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Obtener la humedad
  function getHumedad() {
    const humedad = days.map((item) => {
      return item.humidity;
    });
    return humedad;
  }

  //Obtener la velocidad del viento
  function getViento() {
    const viento = days.map((item) => {
      return item.windspeed;
    });
    return viento;
  }

  //Obtener el porcentaje del Cielo Cubierto
  function getCieloCubierto() {
    const cieloCubierto = days.map((item) => {
      return item.cloudcover;
    });
    return cieloCubierto;
  }

  //Obtener el porcentaje de probabilidad de lluvias
  function getLluvia() {
    const lluvia = days.map((item) => {
      return item.precipprob;
    });
    return lluvia;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        {/* CARD 1 */}
        <View style={styles.box}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <WiHumidity />
                <Text style={styles.cardTitle}>Humedad</Text>
              </View>
              <Paragraph style={styles.cardParagraph}>
                {getHumedad()} %
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* CARD 2 */}
        <View style={styles.box}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <WiStrongWind />
                <Text style={styles.cardTitle}>Viento</Text>
              </View>
              <Paragraph style={styles.cardParagraph}>
                {getViento()} km/h
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* CARD 3 */}
        <View style={styles.box}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <WiCloudy style={styles.icon} />
                <Text style={styles.cardTitle}>Cielo cubierto</Text>
              </View>
              <Paragraph style={styles.cardParagraph}>
                {getCieloCubierto()} %
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* CARD 4 */}
        <View style={styles.box}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <WiRain style={styles.icon} />
                <Text style={styles.cardTitle}>Prob. de Lluvia</Text>
              </View>
              <Paragraph style={styles.cardParagraph}>
                {getLluvia()} %
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>
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
  flex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 10,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    width: "120px",
    height: "100px",
    borderRadius: 20,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardParagraph: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  icon: {
    width: "20px",
    height: "auto",
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

module.exports = DetailsScreen;
