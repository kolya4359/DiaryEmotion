// Home 화면에 보이는 list 1개

import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  //   const env = process.env;
  //   env.PUBLIC_URL = env.PUBLIC_URL || "";
  // 이미지가 안 뜰 시 설정해줌.

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  // 그냥 date로 받아오면 밀리세컨즈로 나와서 알아볼 수 없는 숫자들이 나온다.
  // 그래서 date를 받아서 new Date로 날짜형식으로 변환하는데 문자형식이 date로 넘어올 수 있기 때문에
  // parseInt로 숫자형으로 바꿔준다.
  // toLocaleDateString() 은 사용자의 문화권에 맞는 시간표기법으로 객체의 시간을 리턴해준다.

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
