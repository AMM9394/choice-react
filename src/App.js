import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {rootTypes, sub1Types,sub2Types} from './mock/data';
import {arrayHas,arrayDeleteItem} from './methods';
const addImg = require('./imgs/add.jpg');
const reduce = require('./imgs/reduce.jpg');
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      className:'',
      current:{type:'',id:-1},
      selectedIds:{root:[], sub1:[], sub2:[]},
      openIds:{root:-1, sub1:-1, sub2:-1},
      hasChoosedSubIds:{root:[], sub1:[]},
      sub1tps:[],
      sub2tps:[],
      // mychoose:[],
    }
  }

  onBoxClick(item,selectedIds,openIds,hasChoosedSubIds){
    let sub1tps=[];
    let sub2tps=[];
    if(openIds.root){
      sub1tps = this.getSub(openIds.root,sub1Types);
    }
    if (openIds.sub1){
      sub2tps = this.getSub(openIds.sub1,sub2Types);
    }
    if(sub1tps.length===0){openIds.root=-1;}
    if(sub2tps.length===0){openIds.sub1=-1;}
    this.setState({selectedIds,openIds,hasChoosedSubIds,sub1tps,sub2tps});
  }
  getSub(id,data){
    let sub1tps = [];
    for(let item of data){
      if (item.parentId === id) {
        sub1tps.push(item);
      }
    }
    return sub1tps;
  }
  renderClassName(item,type){
    let className='';
    let {selectedIds,openIds,hasChoosedSubIds} = this.state;
    console.log(hasChoosedSubIds);
    className += arrayHas(selectedIds[type],item.id)?'selected ':'';
    className += item.id===openIds[type]?'open ':'';
    className += arrayHas(hasChoosedSubIds[type],item.id)?'sub ':'';
    return className;
  }
  render() {
    const {selectedIds,openIds,hasChoosedSubIds,sub1tps,sub2tps} = this.state;
    return (
      <div className="App">
        <div className="left block">
          <span className="red">*</span><span>推送机型</span>
        </div>
        <div className="right block">
          <div className="root types">
            <img className="option" src={addImg}/>
            {rootTypes.map((root,key)=><Box  selectedIds={selectedIds} openIds = {openIds} hasChoosedSubIds={hasChoosedSubIds}
                                             className={this.renderClassName(root,'root')}
                                             onClick={this.onBoxClick.bind(this,root)} item={root} key={key}>{root.name}</Box>)}
          </div>
          {sub1tps.length? <div className="sub1 types">
            <img className="option" src={addImg}/>
            {sub1tps.map((sub1,key)=><Box  selectedIds={selectedIds} openIds = {openIds} hasChoosedSubIds={hasChoosedSubIds}
                                           className={this.renderClassName(sub1,'sub1')}
                                           onClick={this.onBoxClick.bind(this,sub1)} item={sub1} key={key}>{sub1.name}</Box>)}

          </div>:null}
          {sub2tps.length? <div className="sub2 types">
            <img className="option" src={addImg}/>
            {sub2tps.map((sub2,key)=><Box  selectedIds={selectedIds} openIds = {openIds} hasChoosedSubIds={hasChoosedSubIds}
                                           className={this.renderClassName(sub2,'sub2')}
                                           onClick={this.onBoxClick.bind(this,sub2)} item={sub2} key={key}>{sub2.name}</Box>)}

          </div>:null}
          <div>
            已选择:
          </div>
        </div>
      </div>
    );
  }
}

export default App;

class Box extends React.Component {
  /*constructor(props){
    super(props);
  }*/
  onClick (){
    let {item,selectedIds,openIds,hasChoosedSubIds} = this.props;
    let id = item.id;
    let type= item.type;
    if(openIds[type]===id){
      //展开过再点击取消展开
      openIds[type]=-1;
      if(arrayHas(hasChoosedSubIds[type],id)){
        arrayDeleteItem(hasChoosedSubIds[type],id);
        switch(type){
          case 'root': {
            selectedIds.sub1=[];
            selectedIds.sub2=[];
            openIds.root=-1;
            openIds.sub1=-1;
            break;
          }
          case 'sub1': {
            selectedIds.sub2=[];
            openIds.sub2=-1;
            break;}
          default:break;
        }
      }
    }
    if(arrayHas(selectedIds[type],id)){
      //选中过再点击
      if (arrayHas(hasChoosedSubIds[type],id)){
        //有子节点选中且展开时，展开
        openIds[type]=id;
      }else{
        selectedIds[type]= arrayDeleteItem(selectedIds[type],item.id);
        openIds[type]=-1;//并且不展开
      }
    }else{
      selectedIds[type].push(id);
      openIds[type] = type==='sub2' ? -1 :id;//叶子节点默认不展开
      openIds.sub1  = type==='root' ? -1 :openIds.sub1;
      // if(type==='root'){openIds.sub1=-1;}
    }
    switch(type){
      case 'sub1': {
        if(!arrayHas(hasChoosedSubIds.root,item.parentId)){
          hasChoosedSubIds.root.push(item.parentId);
        }
       break;
      }
      case 'sub2':{
        if(!arrayHas(hasChoosedSubIds.sub1,item.parentId)){
          hasChoosedSubIds.sub1.push(item.parentId);
        }
        break;
      }
      default:break;
    }
    this.props.onClick(selectedIds,openIds,hasChoosedSubIds);
  }
  render(){
    let {className,children} = this.props;
    return(
      <div className={`default ${className?className:''}`} onClick={this.onClick.bind(this)}>
        {children}
      </div>
    )
  }
}

