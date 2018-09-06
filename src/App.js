import React from "react";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import MainPage from "./screens/MainPage";
import ImportWallet from "./screens/ImportWallet";
import NewWallet from "./screens/NewWallet";
import MyWallet from "./screens/MyWallet";
import TestPage from "./screens/TestPage";
import PreBackup from "./screens/PreBackup";
import Backup from "./screens/Backup";
import PinPage from "./screens/PinPage";
import GamePanel from "./screens/GamePanel";
import GameOne from "./screens/GameOne";
import GameTwo from "./screens/GameTwo";
import GameThree from "./screens/GameThree";
import GameFour from "./screens/GameFour";

const AppNavigator = StackNavigator(
  {
    MainPage: { screen: MainPage },
    ImportWallet: { screen: ImportWallet },
    NewWallet: { screen: NewWallet },
    MyWallet: { screen: MyWallet },
    TestPage: { screen: TestPage },
    PreBackup: { screen: PreBackup },
    Backup: { screen: Backup },
    GamePanel: { screen: GamePanel },
    GameOne: { screen: GameOne },
    GameTwo: { screen: GameTwo },
    GameThree: { screen: GameThree },
    GameFour: { screen: GameFour },
    PinPage: { screen: PinPage }
  },
  {
    initialRouteName: "GamePanel",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
