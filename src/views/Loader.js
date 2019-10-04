import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
class Loader extends Component {
  render() {
    const style={
      zIndex: 2000,
      width: "100%",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      height: "100%",
      display: "flex",
      position: "fixed",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
      opacity: "0.2"
    }
    return (
      <div>
      {
        this.props.loader ? <div style={style}>
          <FadeLoader
             sizeUnit={"px"}
             size={151}
             color={'#fff'}
             loading={true}
           />
         </div>
         : false
      }
      </div>
    );
  }
}

export default Loader;
