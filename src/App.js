import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./App.css";
import style from "./recepe.module.css";

const App = () => {
  const [term, setTerm] = useState("");
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("fries");

  const reqRecipe = async (query) => {
    const resp = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=d7354e92&app_key=a598b9318afee373fe4a5a86eecc4909`
    );
    console.log(resp.data);
    setList(resp.data.hits);
  };

  useEffect(() => {
    reqRecipe(query);
  }, [query]);

  const submitHandler = (e) => {
    e.preventDefault();

    setQuery(term);
  };

  const renderList = list.map((li, i) => {
    return (
      <div className={style.recipe} key={i}>
        <h1>{li.recipe.label}</h1>
        <h2>Recipe</h2>
        <div className="list">
          {li.recipe.ingredients.map((ing, j) => {
            return (
              <div className="items" key={j}>
                {ing.text}
                {ing.quantity}
                {ing.measure}
                {ing.food}
              </div>
            );
          })}
        </div>
        <img
          className="image"
          src={li.recipe.images.REGULAR.url}
          alt="recipe"
        />
      </div>
    );
  });

  return (
    <Fragment>
      <div className="App">
        <form onSubmit={submitHandler} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button className="search-btn" type="submit">
            search
          </button>
        </form>
        <div className="recepies">{renderList}</div>
      </div>
    </Fragment>
  );
};

export default App;
