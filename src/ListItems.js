import React, { Component } from "react";
 
class TodoItems extends Component {
  constructor(props) {
    super(props);
 
    this.createTasks = this.createTasks.bind(this);
  } 
  delete(key) {
    this.props.delete(key);
  }
  createTasks(item) {

    return <li onClick={() => this.delete(item.key)} 
              key={item.key}>{item.text.charAt(0).toUpperCase() + item.text.slice(1)+ " - " + item.dateBad}</li>
  }
  
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};
 
export default TodoItems;