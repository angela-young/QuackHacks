import React, { Component } from "react";
import ListItems from "./ListItems.js";
import "./List.css";
 
const foodList = [
    { 
      name: "apples",
      timeDays: 28
    },
    {
      name: "eggs",
      timeDays: 21
    },
    {
      name: "breads",
      timeDays: 4
    },
    {
      name: "tomatoes",
      timeDays: 14
    },
    {
      name: "bananas",
      timeDays: 3
    },
    {
      name: "whole milk",
      timeDays: 5
    },
    {
      name: "avocados",
      timeDays: 3
    }
  ]

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    items: [],
    recipes: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
  } addItem(e) {
    if (this._inputElement.value !== "") {
      const t = this._inputElement.value.toLowerCase();
      const day = new Date();
      day.setTime(Date.now());
      let monthNum = day.getMonth() + 1;
      let dayNum = day.getDate();
      const enteredFood = foodList.find(foodItem => {return foodItem.name.includes(t)})
      let badMonth = monthNum;
      let badDay = dayNum + enteredFood.timeDays
      if (dayNum + enteredFood.timeDays > 30) {
        badMonth++;
        badDay %= 30;
      }
      var newItem = {
        text: t,
        key: Date.now(),
        dateAdd: "Day Added: " + String(monthNum) + "/" + String(dayNum),
        dateBad: "Eat by: " + String(badMonth)+ "/" + String(badDay),
        button: ""
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
  } searchRecipes() {
    console.log("search");
    const recipObjArray = this.state.items;
    const recipArray = recipObjArray.map((foodie, index) => foodie.text)
    const foodStr = recipArray.join(',');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${foodStr}&number=5&apiKey=4809f0fb104343309fee1c9f5b6b08b7`).then(response => response.json())
    .then(data => {
    console.log(data)
    this.setState({recipes: data})
    })
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
          <button onClick={this.searchRecipes}>search recipes</button>
        </div>
        <ListItems entries={this.state.items} delete = {this.deleteItem}/>
        <div id="recipes">
          <h2>Possible Recipes</h2>
          <ul className="theList">
          {this.state.recipes.map((recipe) => 
          <li>{recipe.title}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

 
export default TodoList;