import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  // 배열을 저장할 때도 stringify로 직렬화를 시켜줘야 한다.
  return newState;
};

export const DiaryStateContext = React.createContext();
// data를 관리하는 Context
export const DiaryDispatchContext = React.createContext();
// Dispatch 함수를 관리하는 Context

function App() {
  // localStorage에 저장하는 법
  // useEffect(() => {
  //   localStorage.setItem("item1", 10);
  // setItem("key", value) 로 저장한다.
  //   localStorage.setItem("item2", "20");
  //   localStorage.setItem("item3", JSON.stringify({ value: 30 }));
  //   // localStorage는 문자열만 저장되기 때문에 객체를 저장할 때는 JSON.stringify 를 사용해서
  //   // 직렬화를 시켜줘야 한다.
  // }, []);

  //localStorage에서 값 불러오는 법
  // useEffect(() => {
  //   const item1 = localStorage.getItem("item1");
  //   // getItem("key")으로 localStorage에서 value를 가져올 수 있다.
  //   const item2 = localStorage.getItem("item2");
  //   const item3 = JSON.parse(localStorage.getItem("item3"));
  //   // localStorage에서 값을 가져오면 문자열로 나온다.
  //   // 그래서 객체값은 JSON.parse 로 객체로 변환해서 불러와야 한다.
  //   console.log({ item1, item2, item3 });
  //   // 출력할 때 , 로 출력하면 붙어서 나와서 보기 불편한데
  //   // 객체로 묶어 주면 나누어져 출력되어서 보기 편하다.
  // }, []);

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  // console.log(new Date().getTime());
  // data의 date를 밀리세컨즈로 만들 때 사용한다.
  // 1649667156786 이런식으로 콘솔에 시간이 밀리세컨즈로 나타난다.

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
