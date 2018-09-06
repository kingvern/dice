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

const diceOneLight = require("../../../assets/dice-one-light.png");
const diceOneDark = require("../../../assets/dice-one-dark.png");
const diceTwoLight = require("../../../assets/dice-two-light.png");
const diceTwoDark = require("../../../assets/dice-two-dark.png");
const diceThreeLight = require("../../../assets/dice-three-light.png");
const diceThreeDark = require("../../../assets/dice-three-dark.png");
const diceFourLight = require("../../../assets/dice-four-light.png");
const diceFourDark = require("../../../assets/dice-four-dark.png");
const diceFiveLight = require("../../../assets/dice-five-light.png");
const diceFiveDark = require("../../../assets/dice-five-dark.png");
const diceSixLight = require("../../../assets/dice-six-light.png");
const diceSixDark = require("../../../assets/dice-six-dark.png");
const reward = [0,5.88,2.94,1.96,1.47,1.18,0]

const diceImage = [
  {
    pos: diceOneLight,
    neg: diceOneDark
  },
  {
    pos: diceTwoLight,
    neg: diceTwoDark
  },
  {
    pos: diceThreeLight,
    neg: diceThreeDark
  },
  {
    pos: diceFourLight,
    neg: diceFourDark
  },
  {
    pos: diceFiveLight,
    neg: diceFiveDark
  },
  {
    pos: diceSixLight,
    neg: diceSixDark
  }
];

export default class GameTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers:[true,true,true,true,true,true],
      answerCount: 0,
      stake: "0.10"
    };
  }

  componentDidMount() {
      var answers = this.state.answers;
    var answerCount = 0;
      for(var i = 0; i < 6; i++){
        answers[i] = Math.random()>0.5
        if(answers[i]) answerCount++
      }
      if(answerCount == 0) {
        answers[0]=true
        answerCount = 1
      }
    this.setState({
      answers:answers,
      answerCount: answerCount
    })
  }

  _changeAnswer(i){
    var answers = this.state.answers;
    var answerCount = this.state.answerCount;
    if((answerCount==1 && answers[i] ) || (answerCount==5 && !answers[i])) {
    }else {
      answers[i] = !answers[i];
      answers[i] ? answerCount++ : answerCount--
      this.setState({
        answers:answers,
        answerCount: answerCount
      })
      this.refreshReward()
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

  refreshReward() {
    var value = this.state.answerCount;
    var rewardTime = 5.88 / value;
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

  renderItem(value, idx) {
    return (
      <Button transparent  onPress={() => this._changeAnswer(value) }>
        <Image style={{ width: 50, height: 50 }}
               source={this.state.answers[value]  ? diceImage[value].pos : diceImage[value].neg}/>
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
          <Title>掷骰子</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12,
          backgroundColor:"#2C3658"
        }}>
          {[0,1,2,3,4,5].map((value, idx) => this.renderItem(value, idx))}

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
          <Button style={styles.stakeButton}  onPress={() => this.calculateRewardByStake(0.15)}>
            <Text>0.15</Text>
          </Button>
          <Button style={styles.stakeButton}  onPress={() => this.calculateRewardByStake(2.04)}>
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
          <Text>赢得投注{reward[this.state.answerCount]}X，胜率{(this.state.answerCount/6).toFixed(2)}，您将赢得{this.state.reward}以太坊</Text>
        </View>
      </Container>
    );
  }
}


