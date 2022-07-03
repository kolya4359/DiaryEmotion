import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // 문서객체에서 TagName이 title인 엘리멘트 중에서 0번째를 가져온다.
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
