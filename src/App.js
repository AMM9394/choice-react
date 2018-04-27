import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {rootTypes, sub1Types,treeData} from './mock/data';
import {arrayHas,arrayReset} from './methods';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      className:'',
      current:{type:'',id:-1},
      selectedIds:[],
      openIds:[],
      sub1tps:[],
    }
  }

  onBoxClick(item,selectedIds,openIds){
    let sub1tps=[];
    for(let open of openIds){
      if (open.type==='root'){
        for (let sub1 of sub1Types){
          if(sub1.parentId === open.id);{
            sub1tps.push(sub1);
          }
        }
      }
    }
    this.setState({selectedIds,openIds,sub1tps})
  }
  renderTree(data){
    data.map((item,key)=><Box key={key} item={item}/>);
    if(data.collapse && data.children){
      this.renderTree(data.children)
    }
    if(data.collapse && data.children){
      return (data.length?<div>
        data.map((item,key)=><Box key={key} item={item}/>)
      </div>:null)
    }


  }
  render() {
    const {selectedIds,openIds,sub1tps} = this.state;
    return (
      <div className="App">
        <div className="left">
          <span className="red">*</span><span>选择机型</span>
        </div>
        <div className="right">
          {
            this.renderTree(treeData)
          }
          <div className="root types">
            {rootTypes.map((item,key)=><Box  selectedIds={selectedIds} openIds = {openIds}
                                            className={`${arrayHas(selectedIds,item.id)?'selected ':''}${arrayHas(openIds,item)?'open ':''}`}
                                            onClick={this.onBoxClick.bind(this,item)} item={item} key={key}/>)}
          </div>
          {sub1tps.length? <div className="sub1 types">
              {sub1tps.map((sub1,key)=><Box  selectedIds={selectedIds} openIds = {openIds}
                                            className={`${arrayHas(selectedIds,sub1.id)?'selected ':''}${arrayHas(openIds,sub1)?'open ':''}`}
                                            onClick={this.onBoxClick.bind(this,sub1)} item={sub1} key={key}/>)}

          </div>:null}
        </div>
      </div>
    );
  }
}

export default App;

class Box extends React.Component {
  constructor(props){
    super(props);
    this.state={
      current:props.current,
      // selectedIds:[],
      // openIds:[],
    }
  }
  onClick (){
    let {item,selectedIds,openIds} = this.props;
    let id = item.id;
    if(arrayHas(selectedIds,id)&&arrayHas(openIds,item)){
      //选中且展开状态下再次点击时取消选中且展开
      selectedIds= arrayReset(selectedIds,item.id);
      openIds= arrayReset(openIds,item);
    }else{
      if(arrayHas(selectedIds,id)){
        //只有选中的状态时再次点击取消选中
        selectedIds= arrayReset(selectedIds,item.id);
        for(let openItem of openIds){
          if(openItem.type === item.type){
            openIds= arrayReset(openIds,openItem);
          }
        }
      }else{
        if(arrayHas(openIds,item)){
          openIds= arrayReset(openIds,item);
        }else{
          for(let openItem of openIds){
            if(openItem.type === item.type){
              openIds= arrayReset(openIds,openItem);
            }
          }
          openIds.push(item);
        }
        selectedIds.push(item.id);
      }
    }
    this.props.onClick(selectedIds,openIds);
  }
  render(){
    let {className,item} = this.props;
    return(
      <div className={`default ${className?className:''}`} onClick={this.onClick.bind(this)}>
        {item.name}
      </div>
    )
  }
}

