import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {rootTypes} from './mock/data';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      className:''
    }
  }

  onBoxClick(item,className){
    debugger
    this.setState({className:className})
  }
  render() {
    const {className} = this.state;
    return (
      <div className="App">
        <div className="root-types">
          {rootTypes.map((item,key)=><Box className={className?className:''} onClick={this.onBoxClick.bind(this,item)} content={item.name} key={key}/>)}
        </div>
      </div>
    );
  }
}

export default App;

class Box extends React.Component {
  onClick (){
    let className = '';
    className= className + ' selected';
    this.props.onClick(className);
  }
  render(){
    let {className,content} = this.props;
    return(
      <div className={`default ${className?className:''}`} onClick={this.onClick.bind(this)}>
        {content}
      </div>
    )
  }
}