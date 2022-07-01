import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

// React.memo()는 함수를 인자로 받는 고차 컴포넌트이다.
// 전달받은 props(value, onChange, optionList) 가 변하지 않으면 렌더링이 일어나지 않는다.
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  // onChange의 값으로 핸들러 함수를 만들어서 넣어주면 React.memo가 제대로 작동하지 않는다.
  // 컴포넌트가 리렌더링될 때마다 핸들러 함수를 새로운 prop으로 간주하기 때문이다.
  // 하지만 useState를 사용해서 setState 를 값으로 넣어주면 React.memo가 정상적으로 작동한다.
  // 그 이유는 useState에서 기본적으로 useCallback처리가 되어서 나오기 때문이다.
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  // 최신순인지 오래된 순인지 if문으로 분기를 달아서 정렬된 리스트를 반환하는 함수.
  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - a.date;
      } else {
        return parseInt(a.date) - b.date;
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 깊은 복사
    // 배열인 diaryList를 JSON.stringify를 이용해 문자열로 바꾸고
    // JSON.parse를 이용해서 다시 배열로 복호화 시켜서 copyList에 값만 넣어준다.

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
