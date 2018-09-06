const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  gameContainer: {
    backgroundColor:"#2C3658"
  },
  stakeButton:{
    backgroundColor: "#5F74AA"
  },
  textLight: {
    color: "#fff",
    bottom: 6, textAlign:'center', alignSelf:'center',

    marginTop: 5
  },
  textDark: {
    color: "#515151",
    bottom: 6, textAlign:'center', alignSelf:'center',
    marginTop: 5
  }

};