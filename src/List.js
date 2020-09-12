import React, { Component } from "react";
import ListItems from "./ListItems.js";
import "./List.css";
 
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  } addItem(e) {
    if (this._inputElement.value !== "") {
      const day = new Date();
      day.setTime(Date.now());
      var newItem = {
        text: (this._inputElement.value).toLowerCase(),
        key: Date.now(),
        dateAdd: "Day Added: " + String(day.getMonth()) + "/" + String(day.getDay() + 1),
        dateBad: "Eat by: "
      };
  
      this.setState((prevState) => {
        return { 
          items: prevState.items.concat(newItem) 
        };
      });
    
      this._inputElement.value = "";
    }
    
    console.log(this.state.items);
      
    e.preventDefault();
  } deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
  
    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={ (a) => this._inputElement = a} type = "text"
            placeholder="enter food item">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <ListItems entries={this.state.items} delete = {this.deleteItem}/>
      </div>
    );
  }
}
 
export default TodoList;