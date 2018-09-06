import React, { Component } from "react";
import { Image, View } from "react-native";
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

const diceLight = require("../../../assets/dice-light.png");
const diceDark = require("../../../assets/dice-dark.png");
const reward = 35.64;


const freqs = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

export default class GameThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [true, true, true, true, true, true, true, true, true, true, true],
      answerCount: 0,
      value: 0,
      stake: "0.10",
      reward: 35.64
    };
  }

  componentDidMount() {
    var answers = this.state.answers;
    var answerCount = 0;
    var value = 0;
    for (var i = 0; i < 11; i++) {
      answers[i] = Math.random() > 0.5;
      if (answers[i]) {
        answerCount++;
        value += freqs[i];
      }
    }
    if (answerCount == 0) {
      answers[0] = true;
      answerCount = 1;
      value = 1;
    }
    this.setState({
      answers: answers,
      answerCount: answerCount,
      value: value
    });
  }

  _changeAnswer(i) {
    var answers = this.state.answers;
    var answerCount = this.state.answerCount;
    var value = this.state.value;
    if ((answerCount == 1 && answers[i]) || (answerCount == 10 && !answers[i])) {
    } else {
      answers[i] = !answers[i];
      answers[i] ? answerCount++ : answerCount--;
      answers[i] ? value += freqs[i] : value -= freqs[i];
      this.setState({
        answers: answers,
        answerCount: answerCount,
        value: value
      });
      this.refreshReward()
    }
  }

  _addUnit() {
    var stake = (parseFloat(this.state.stake) + 0.01).toFixed(2);
    this.calculateRewardByStake(stake);
  }

  _rmUnit() {
    var stake = parseFloat(this.state.stake);
    if (stake >= 0.01) {
      stake = (stake - 0.01).toFixed(2);
      this.calculateRewardByStake(stake);
    }

  }


  refreshReward() {
    var value = this.state.value;
    var rewardTime = 35.94 / value;
    var reward = rewardTime * parseFloat(this.state.stake);
    this.setState({
      rewardTime: rewardTime.toFixed(2),
      reward: reward.toFixed(3)
    });
  }

  calculateRewardByStake(stake) {
    var rewardTime = parseFloat(this.state.rewardTime);
    var reward = rewardTime * stake;
    this.setState({ stake: stake.toString(), reward: reward.toFixed(3) });
  }

  renderItem(freq, idx) {
    return (
      <Button
        transparent
        onPress={() => this._changeAnswer(idx)}>
        <Image style={{ width: 50, height: 50 }}
        source={this.state.answers[idx]   ? diceLight : diceDark}/>
        <Text  style={this.state.answers[idx] ? styles.textLight : styles.textDark } > {idx + 2}</Text>
      </Button>
    );

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
          <Title>两个骰子</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={{
          flex: 2, flexDirection: "row", flexWrap: "wrap",
          justifyContent: "space-between", padding: 12,
          backgroundColor:"#2C3658"
        }}>
          {freqs.map((freq, idx) => this.renderItem(freq, idx))}


        </View>
        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12
        }}>
          <Text>选择骰子数来进行投注</Text>
        </View>
        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12
        }}>
          <Button style={styles.stakeButton}  onPress={() => this.calculateRewardByStake(0.05)}>
            <Text>0.05</Text>
          </Button>
          <Button style={styles.stakeButton}  onPress={() => this.calculateRewardByStake(0.10)}>
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
          <Text>赢得投注{this.state.rewardTime} 胜率为{(this.state.value/36).toFixed(2)}️，您将赢得{this.state.reward}以太坊</Text>
        </View>
      </Container>
    );
  }
}


