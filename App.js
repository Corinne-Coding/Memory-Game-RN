import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Vibration,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

// Icons
import {
  Foundation,
  FontAwesome,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function App() {
  const tab = [
    {
      name: "key",
      isDisplayed: false,
      isFound: false,
      icon: <Foundation name="key" size={60} color="black" />,
    },
    {
      name: "key",
      isDisplayed: false,
      isFound: false,
      icon: <Foundation name="key" size={60} color="black" />,
    },

    {
      name: "camera",
      isDisplayed: false,
      isFound: false,
      icon: <Foundation name="camera" size={60} color="black" />,
    },
    {
      name: "camera",
      isDisplayed: false,
      isFound: false,
      icon: <Foundation name="camera" size={60} color="black" />,
    },

    {
      name: "megaphone",
      isDisplayed: false,
      isFound: false,
      icon: <Entypo name="megaphone" size={60} color="black" />,
    },
    {
      name: "megaphone",
      isDisplayed: false,
      isFound: false,
      icon: <Entypo name="megaphone" size={60} color="black" />,
    },

    {
      name: "headphone",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="headphones" size={60} color="black" />,
    },
    {
      name: "headphone",
      isDisplayed: false,
      isFound: false,
      icon: <FontAwesome name="headphones" size={60} color="black" />,
    },

    {
      name: "pinetree",
      isDisplayed: false,
      isFound: false,
      icon: <MaterialCommunityIcons name="pine-tree" size={60} color="black" />,
    },
    {
      name: "pinetree",
      isDisplayed: false,
      isFound: false,
      icon: <MaterialCommunityIcons name="pine-tree" size={60} color="black" />,
    },

    {
      name: "tool",
      isDisplayed: false,
      isFound: false,
      icon: <AntDesign name="tool" size={60} color="black" />,
    },
    {
      name: "tool",
      isDisplayed: false,
      isFound: false,
      icon: <AntDesign name="tool" size={60} color="black" />,
    },
  ];

  const [cards, setCards] = useState(tab.sort((a, b) => 0.5 - Math.random()));
  const [strokes, setStrokes] = useState(0);

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

    // If 2 cards names are the same, set isFound property
    if (revealed.length === 2) {
      setStrokes(strokes + 1);
      if (revealed[0] === revealed[1]) {
        for (let i = 0; i < copy.length; i++) {
          if (copy[i].name === revealed[0]) {
            copy[i].isFound = true;
          }
        }
      }
    }

    setCards(copy);
  };

  const countPeers = () => {
    let counter = 0;

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].isFound) {
        counter++;
      }
    }

    counter /= 2;
    if (counter === 6) {
      Vibration.vibrate();
    }
    return counter;
  };

  const resetGame = () => {
    setCards(tab.sort((a, b) => 0.5 - Math.random()));
    setStrokes(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Memory Game</Text>

      <View style={styles.test}>
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  card.isDisplayed && !card.isFound
                    ? [styles.card, styles.cardVisible]
                    : card.isDisplayed && card.isFound
                    ? [styles.card, styles.cardFound]
                    : [styles.card, styles.cardNotVisible]
                }
                onPress={() => {
                  handleCards(index);
                }}
              >
                {card.isDisplayed ? card.icon : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.align, styles.btnViewContainer]}>
        <View style={[styles.align, styles.paddingBottom, styles.btnView]}>
          <View style={styles.line}>
            <Text style={styles.dynamicScore}>{countPeers()}</Text>
            <Text style={styles.score}>/ 6</Text>
          </View>
          <Text style={styles.text}>
            {countPeers() === 1 || countPeers() === 0 ? "peer" : "peers"} found
          </Text>
        </View>

        <TouchableOpacity style={[styles.btnView, styles.resetBtn]}>
          <Text style={styles.resetBtnText} onPress={resetGame}>
            Reset
          </Text>
        </TouchableOpacity>

        <View style={[styles.align, styles.btnView]}>
          <Text style={styles.dynamicStroke}>{strokes}</Text>
          <Text style={styles.text}>
            {strokes === 0 || strokes === 1 ? "stroke" : "strokes"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223333",
    paddingTop: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
  align: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  paddingBottom: {
    paddingBottom: 10,
  },

  // Title
  title: {
    fontSize:
      Dimensions.get("window").height > 600
        ? 30
        : Dimensions.get("window").height > 500
        ? 25
        : 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FEFEFE",
    paddingVertical: 10,
  },

  // Cards
  cardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: {
    height:
      Dimensions.get("window").height > 700
        ? 120
        : Dimensions.get("window").height > 600
        ? 100
        : Dimensions.get("window").height > 500
        ? 80
        : 60,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  cardVisible: {
    backgroundColor: "white",
  },
  cardNotVisible: {
    backgroundColor: "white",
  },
  cardFound: {
    backgroundColor: "#4F5D5D",
  },

  // Bottom view
  btnViewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnView: {
    flex: 1,
  },
  resetBtn: {
    alignItems: "center",
  },
  dynamicScore: {
    fontSize:
      Dimensions.get("window").height > 600
        ? 50
        : Dimensions.get("window").height > 500
        ? 40
        : 30,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
  score: {
    fontSize:
      Dimensions.get("window").height > 600
        ? 20
        : Dimensions.get("window").height > 500
        ? 15
        : 10,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
  text: {
    color: "#4F5D5D",
    fontSize:
      Dimensions.get("window").height > 600
        ? 20
        : Dimensions.get("window").height > 500
        ? 15
        : 10,
  },
  resetBtnText: {
    fontWeight: "bold",
    fontSize:
      Dimensions.get("window").height > 600
        ? 30
        : Dimensions.get("window").height > 500
        ? 25
        : 20,
    color: "#FEFEFE",
  },
  dynamicStroke: {
    fontSize:
      Dimensions.get("window").height > 600
        ? 30
        : Dimensions.get("window").height > 500
        ? 25
        : 20,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
});
