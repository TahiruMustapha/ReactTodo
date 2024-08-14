import React, { useState } from "react";
import "../style/Main.css";
import Header from "./Header";
import Hidelist from "./Hidelist";
import TodoContent from "./TodoContent";
import Todo from "./Todo";

const Main = () => {
  const [hideList, setHideList] = useState(true);
  return (
    <div className="main">  
      <Header />
      <div className=" hidelist">
        {hideList ? (
          <button onClick={() => setHideList(false)} className=" hidelistBtn">
            {" "}
            Hide List{" "}
          </button>
        ) : (
          <button onClick={() => setHideList(true)} className=" hidelistBtn">
            {" "}
            Show List{" "}
          </button>
        )}
      </div>
      {hideList && (
        <div className="myTodoList">
          <Todo />
        </div>
      )}
    </div>
  );
};

export default Main;
