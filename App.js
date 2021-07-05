import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function App() {
  const tab = [
    {
      name: "heart",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="heart" size={80} color="#D52941" />,
      opacityIcon: <FontAwesome name="heart" size={80} color="orange" />,
    },

    {
      name: "heart",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="heart" size={80} color="#D52941" />,
      opacityIcon: <FontAwesome name="heart" size={80} color="orange" />,
    },
    {
      name: "star",
      isDisplayed: false,
      isFound: false,
      icon: <AntDesign name="star" size={80} color="#FFBF0A" />,
      opacityIcon: <FontAwesome name="star" size={80} color="orange" />,
    },
    {
      name: "star",
      isDisplayed: false,
      isFound: false,
      icon: <AntDesign name="star" size={80} color="#FFBF0A" />,
      opacityIcon: <FontAwesome name="star" size={80} color="orange" />,
    },
    {
      name: "tree",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="tree" size={80} color="#86CB33" />,
      opacityIcon: <FontAwesome5 name="tree" size={80} color="orange" />,
    },
    {
      name: "tree",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="tree" size={80} color="#86CB33" />,
      opacityIcon: <FontAwesome5 name="tree" size={80} color="orange" />,
    },
    {
      name: "plane",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="plane" size={80} color="#7C7C7C" />,
      opacityIcon: <FontAwesome5 name="plane" size={80} color="orange" />,
    },
    {
      name: "plane",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="plane" size={80} color="#7C7C7C" />,
      opacityIcon: <FontAwesome5 name="plane" size={80} color="orange" />,
    },
    {
      name: "leaf",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="leaf" size={80} color="#664236" />,
      opacityIcon: <FontAwesome5 name="leaf" size={80} color="orange" />,
    },
    {
      name: "leaf",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="leaf" size={80} color="#664236" />,
      opacityIcon: <FontAwesome5 name="leaf" size={80} color="orange" />,
    },
    {
      name: "fish",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome5 name="fish" size={80} color="#1C2DC0" />,
      opacityIcon: <FontAwesome5 name="fish" size={80} color="orange" />,
    },
    {
      name: "fish",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome5 name="fish" size={80} color="#1C2DC0" />,
      opacityIcon: <FontAwesome5 name="fish" size={80} color="orange" />,
    },
  ];

  const [cards, setCards] = useState(tab.sort((a, b) => 0.5 - Math.random()));
  const [peerFound, setPeerFound] = useState(0);

  const handleCards = (index) => {
    const copy = [...cards];

    // Count how many cards are displayed
    let counter = 0;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].isDisplayed && !copy[i].isFound) {
        counter++;
      }
    }

    // Hide cards if 2 are displayed
    if (counter === 2) {
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].isDisplayed && !copy[i].isFound) {
          copy[i].isDisplayed = false;
        }
      }
    }

    // Display card
    copy[index].isDisplayed = true;

    // Store cards names
    let revealed = [];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].isDisplayed && !copy[i].isFound) {
        revealed.push(copy[i].name);
      }
    }

    // console.log(revealed);

    if (revealed.length === 2) {
      console.log("LA");
      if (revealed[0] === revealed[1]) {
        console.log("ICI");
        for (let i = 0; i < copy.length; i++) {
          if (copy[i].name === revealed[0]) {
            copy[i].isFound = true;
            console.log(copy[i].name);
          }
        }
      }
    }

    setCards(copy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => {
                handleCards(index);
              }}
            >
              {card.isDisplayed && !card.isFound ? (
                card.icon
              ) : card.isDisplayed && card.isFound ? (
                card.opacityIcon
              ) : (
                <FontAwesome5 name="question" size={80} color="black" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.align, styles.btnView]}>
        <Text style={styles.score}>{peerFound}</Text>
        <TouchableOpacity>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
  align: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    height: "18%",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  resetBtnText: {
    color: "#1894F9",
    fontWeight: "bold",
    fontSize: 20,
    color: "#050927",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#050927",
  },
  score: {
    fontSize: 60,
    fontWeight: "bold",
  },
  btnView: {
    marginBottom: 20,
  },
});
