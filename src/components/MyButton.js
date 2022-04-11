const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  // 버튼의 type 이 positive나 negative 가 아니면 defalut가 되도록 한다.
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      // className은 문자열로 전달해야 하기 때문에 join 메서드를 사용해서
      // 띄어쓰기를 사용해서 나눠준다.
      // ex) MyButton MyButton_${type} 두 개를 받게 된다.
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
