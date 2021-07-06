import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

// Icons
import { Foundation } from "@expo/vector-icons";

// console.log(Dimensions.get("window").height);

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

    // Count how many cards are found
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].isFound) {
        counter++;
      }
    }

    counter /= 2;
    return counter;
  };

  const resetGame = () => {
    setCards(tab.sort((a, b) => 0.5 - Math.random()));
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

      <View style={[styles.align, styles.btnView]}>
        <Text style={styles.score}>{countPeers()}</Text>
        <TouchableOpacity>
          <Text style={styles.resetBtnText} onPress={resetGame}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Design is inspired of "Dinosaur memory game" of Guilherme Zühlke O'Connor on Dribbble (https://dribbble.com/guioconnor)

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
  score: {
    fontSize:
      Dimensions.get("window").height > 600
        ? 50
        : Dimensions.get("window").height > 500
        ? 40
        : 30,
    fontWeight: "bold",
    color: "#FEFEFE",
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
    marginBottom: 20,
  },
});
