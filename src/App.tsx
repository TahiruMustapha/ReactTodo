import "./style/Main.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import { useState } from "react";
import Todo from "./components/Todo";
import HideList from "./components/HideList";
function App() {
  const [hideList, setHideList] = useState<boolean>(true);
  return (
    <div className="app">
      <Header />
        <HideList hideList={hideList} setHideList={setHideList}/>
      {hideList && (
        <div className="myTodoList">
          <Todo />
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
