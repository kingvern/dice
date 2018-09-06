import React, { Component } from "react";
import { Image, View, Slider } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  IconNB,
  Icon,
  Input,
  Text,
  Left,
  Body, Right, Item
} from "native-base";
import styles from "./styles";

const cardOne = require("../../../assets/swiper-1.png");
const cardTwo = require("../../../assets/swiper-2.png");
const cardThree = require("../../../assets/swiper-3.png");
const cardFour = require("../../../assets/swiper-4.png");
const coinPosLignt = require("../../../assets/swiper-1.png");
const coinPosDark = require("../../../assets/swiper-2.png");
const coinNegLignt = require("../../../assets/swiper-3.png");
const coinNegDark = require("../../../assets/swiper-4.png");


export default class GameFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.50,
      rewardTime: "98.50",
      stake: "0.10",
      reward: "0"
    };
  }

  componentDidMount() {
  }

  _changeAnswer(i) {
    var answers = this.state.answers;
    var answerCount = this.state.answerCount;
    if ((answerCount == 1 && answers[i]) || (answerCount == 5 && !answers[i])) {
    } else {
      answers[i] = !answers[i];
      answers[i] ? answerCount++ : answerCount--;
      this.setState({
        answers: answers,
        answerCount: answerCount
      });
    }
  }

  _addUnit() {
    var stake = (parseFloat(this.state.stake) + 0.01).toFixed(2);
    this.calculateRewardByStake(stake)
  }

  _rmUnit() {
    var stake = parseFloat(this.state.stake);
    if (stake >= 0.01) {
      stake = (stake - 0.01).toFixed(2);
      this.calculateRewardByStake(stake)
    }

  }

  calculateRewardByValue(valueRaw){
    var value = parseFloat(valueRaw.toFixed(2))
    // console.log(typeof(valueRaw.toFixed(2)))
    var rewardTime = 0.9850 / value
    var reward = rewardTime * parseFloat(this.state.stake)
    this.setState({ value: value, rewardTime: rewardTime.toFixed(2),reward: reward.toFixed(3)})
  }

  calculateRewardByStake(stake){
    var rewardTime = parseFloat(this.state.rewardTime)
    var reward = rewardTime * stake
    this.setState({ stake: stake.toString(),reward: reward.toFixed(3)})
  }

  render() {
    return (
      <Container style={styles.gameContainer}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>Etheroll</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={{
          flex: 1, flexDirection: "column",
          justifyContent: "center", padding: 12
        }}>
          <Slider minimumValue={0.01} maximumValue={0.97} value={this.state.value} step={0.01}
                  onValueChange={
                    (valueRaw) => {
                      this.calculateRewardByValue(valueRaw)
                    }
                    // var value = parseFloat(valueRaw.toFixed(2))
                    // // console.log(typeof(valueRaw.toFixed(2)))
                    // var rewardTime = 0.9850 / value
                    // var reward = rewardTime * parseFloat(this.state.stake)
                    // this.setState({ value: value, rewardTime: rewardTime.toFixed(2),reward: reward.toFixed(3)});}
                    }/>
          <Text>Value: {this.state.value}</Text>
        </View>
        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12
        }}>
          <Text>以太幣过山车</Text>
        </View>
        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12
        }}>
          <Button  style={styles.stakeButton} onPress={() => this.calculateRewardByStake(0.05)}>
            <Text>0.05</Text>
          </Button>
          <Button  style={styles.stakeButton} onPress={() => this.calculateRewardByStake(0.10)}>
            <Text>0.10</Text>
          </Button>
          <Button  style={styles.stakeButton} onPress={() => this.calculateRewardByStake(0.15)}>
            <Text>0.15</Text>
          </Button>
          <Button  style={styles.stakeButton} onPress={() => this.calculateRewardByStake(2.04)}>
            <Text>最大</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            padding: 15
          }}

        >
          <Button transparent onPress={() => this._rmUnit()}>
            <Icon name="arrow-back"/>
          </Button>
          <Input bordered value={this.state.stake}
                 onChangeText={(val) => this.setState({ stake: val })}/>
          <Button transparent onPress={() => this._addUnit()}>
            <Icon name="arrow-forward"/>
          </Button>
        </View>
        <View>
          <Text>赢得投注 {this.state.rewardTime} X️ 您将赢得{this.state.reward}以太坊</Text>
        </View>
      </Container>
    );
  }
}


