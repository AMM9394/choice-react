import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {rootTypes, sub1Types,treeData} from './mock/data';
import {arrayHas,arrayDeleteItem} from './methods';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      className:'',
      current:{type:'',id:-1},
      selectedIds:[],
      openIds:[],
      sub1tps:[],
      rootTypes:rootTypes,
    }
  }

  onBoxClick(type,datas){
    let sub1tps=[];
    /*for(let open of openIds){
      if (open.type==='root'){
        for (let sub1 of sub1Types){
          if(sub1.parentId === open.id) {sub1tps.push(sub1);}
        }
      }
    }*/
    this.setState({[type]:datas});
  }
/*
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
  `${arrayHas(selectedIds,item.id)?'selected ':''}${arrayHas(openIds,item)?'open ':''}`
*/
  renderClassName (status){
    let className = '';
    if(status.length>0) {
      for (let item of status) {
        className += item + ' ';
      }
    }
    return className;
  }

  render() {
    const {selectedIds,openIds,sub1tps,rootTypes} = this.state;
    return (
      <div className="App">
        <div className="left">
          <span className="red">*</span><span>选择机型</span>
        </div>
        <div className="right">
          <div className="root types">
            {rootTypes.map((item,key)=><Box selectedIds={selectedIds} openIds = {openIds} datas={rootTypes}
                                            className={this.renderClassName(item.status)}
                                            onClick={this.onBoxClick.bind(this,'rootTypes')} item={item} key={key}>{item.name}</Box>)}
          </div>
          {sub1tps.length? <div className="sub1 types">
              {sub1tps.map((sub1,key)=><Box selectedIds={selectedIds} openIds = {openIds}
                                             className={this.renderClassName(sub1.status)}
                                            onClick={this.onBoxClick.bind(this,sub1)} item={sub1} key={key}>{sub1.name}</Box>)}

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
      lastItem:{id:-1,type:''},
      // selectedIds:[],
      // openIds:[],
    }
  }
  onClick (){
    let {item,datas} = this.props;
    let {lastItem} = this.state;
    let id = item.id;
    let status= item.status;
    let ss = ['selected','open','sub'];//状态分别是['选中','选中并展开','展开且有子元素选中']
    if(lastItem.type===item.type && lastItem.id !== id){
      //同一级别只能展开一个选项
      for(let dddd of datas){
        if(dddd.id === lastItem.id){
          //删掉上一个节点展开相关状态
          dddd.status = arrayDeleteItem(dddd,ss[1]);
          dddd.status = arrayDeleteItem(dddd,ss[2]);
        }
      }
    }
    if(status.length===1){
      status.push(ss[0],ss[1]);
    }else{
      for (let sitem of ss){
        if (arrayHas(status,sitem)){
          status = arrayDeleteItem(status,sitem);
        }else {status.push(sitem)}
      }
      for(let dddd of datas){
        if(dddd.id === id){
          dddd.status = status;
        }
      }
    }

    this.setState({lastItem:item});
    this.props.onClick(datas);
/*    if (arrayHas(status,'selected')){
      arrayReset(status,'')
    }
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
    }*/

  }
  render(){
    let {className,children} = this.props;
    return(
      <div className={`${className?className:''}`} onClick={this.onClick.bind(this)}>{children}</div>
    )
  }
}

