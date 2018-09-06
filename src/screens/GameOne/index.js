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
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Item
} from "native-base";



import styles from "./styles";

const cardOne = require("../../../assets/swiper-1.png");
const cardTwo = require("../../../assets/swiper-2.png");
const cardThree = require("../../../assets/swiper-3.png");
const cardFour = require("../../../assets/swiper-4.png");
const coinPosLignt = require("../../../assets/coin-digit-light.png");
const coinPosDark = require("../../../assets/coin-digit-dark.png");
const coinNegLignt = require("../../../assets/coin-dollar-light.png");
const coinNegDark = require("../../../assets/coin-dollar-dark.png");


export default class GameOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: true,
      stake: "0.10",
      reward: 0.197
    };
  }

  _addUnit() {
    var stake = (parseFloat(this.state.stake) + 0.01).toFixed(2);
    this.setState({ stake: stake.toString() });
  }

  _rmUnit() {
    var stake = parseFloat(this.state.stake);
    if (stake >= 0.01) {
      stake = (stake - 0.01).toFixed(2);
      this.setState({ stake: stake.toString() });
    }

  }

  // handleInputChange(e){
//    const action = {
//        type: CHANGE_INPUT_VALUE,
//        value: e.target.value
//    }
//     const action = getInputChangeAction(e.target.value)
//     store.dispatch(action)
//   }

  render() {
    return (
      <Container style={styles.gameContainer}>
        <Header >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>抛硬币</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12,
          backgroundColor:"#2C3658"
        }}>
          <Button transparent onPress={() => this.setState({answer:!this.state.answer})}>
            <Image style={{ width: 50, height: 50 }}
                   source={this.state.answer  ? coinPosLignt : coinPosDark}/>
          </Button>
          <Button transparent onPress={() => this.setState({answer:!this.state.answer})}>
            <Image style={{ width: 50, height: 50 }}
                   source={this.state.answer  ? coinNegDark : coinNegLignt}/>
          </Button>
        </View>
        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12
        }}>
          <Text>选择硬币的一面来进行投注</Text>
        </View>
        <View style={{
          flex: 1, flexDirection: "row",
          justifyContent: "space-between", padding: 12
        }}>
          <Button style={styles.stakeButton} onPress={() => this.setState({stake:'0.05',reward:0.05*1.97})}>
            <Text>0.05</Text>
          </Button>
          <Button style={styles.stakeButton}  onPress={() => this.setState({stake:'0.10',reward:0.10*1.97})}>
            <Text>0.10</Text>
          </Button>
          <Button style={styles.stakeButton}  onPress={() => this.setState({stake:'0.15',reward:0.15*1.97})}>
            <Text>0.15</Text>
          </Button>
          <Button style={styles.stakeButton}  onPress={() => this.setState({stake:'2.04',reward:2.04*1.97})}>
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
          <Text>赢得投注1.97X️，胜率0.50，您将赢得{this.state.reward}以太坊</Text>
        </View>
      </Container>
    );
  }
}


