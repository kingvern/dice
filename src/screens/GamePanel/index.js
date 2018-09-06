import React, { Component } from "react";
import { Image, View } from "react-native";

import {
  Container,
  List,
  ListItem,
  Header,
  Title,
  Button,
  IconNB,
  DeckSwiper,
  Card,
  CardItem,
  Icon,
  Thumbnail,
  Text,
  Left,
  Body,
  Right
} from "native-base";
import styles from "./styles";

const cardOne = require("../../../assets/coin-dollar-light.png");
const cardTwo = require("../../../assets/dice-six-light.png");
const cardThree = require("../../../assets/dice-light.png");
const cardFour = require("../../../assets/game-4.png");
const cards = [
  {
    text: "正面或背面？一半对一半。获胜就能赢得1.98倍的投注",
    name: "抛硬币",
    image: cardOne,
    url: "GameOne"
  },
  {
    text: "在数字1至6之间下注。获胜就能赢得高达5.94倍的投注",
    name: "掷骰子",
    image: cardTwo,
    url: "GameTwo"
  },
  {
    text: "对总和进行投注，从数字2至12中选择。获胜就能赢得高达35.64倍的投注",
    name: "两个骰子",
    image: cardThree,
    url: "GameThree"
  },
  {
    text: "任何胜率，1％到97％。获胜就能赢得高达99倍的投注",
    name: "Etheroll，以太幣过山车",
    image: cardFour,
    url: "GameFour"
  }
];

export default class GamePanel extends Component {
  renderIten(item,idx){
    return(
    <ListItem thumbnail style={{backgroundColor: "#2C3658" }}>
      <Left>
        <Thumbnail square source={item.image} />
      </Left>
        <Body>
        <Text style={{color: "#fff" }}>
          {item.name}
        </Text>
        <Text numberOfLines={2} style={{color: "#fff",fontSize: 12 }}>{item.text}</Text>
        </Body>
      <Right>
        <Button dark onPress={()=>this.props.navigation.navigate(item.url)}>
          <Text>
            开始游戏
          </Text>
        </Button>
      </Right>
    </ListItem>)
  }
  render() {
    return (
      <Container style={styles.gameContainer}>

        <View style={{ flex: 1, padding: 12,
          backgroundColor: "#2C3658"}}>
          <List style={{ elevation: 2,backgroundColor: "#2C3658" }}>
          {cards.map((item,idx) => this.renderIten(item,idx))}
          </List>
        </View>

      </Container>
    );
  }
}


