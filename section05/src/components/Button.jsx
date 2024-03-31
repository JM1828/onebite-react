const Button = ({ text, color, children }) => {
  // 호출된 이벤트 헨들러 함수에 매개변수로 이벤트 객체(e)가 제공됨
  const onClickButton = (e) => {
    console.log(e);
    console.log(text);
  };

  // 이벤트 헨들러를 사용할때는 함수의 이름만 적어야됨
  return (
    <button onClick={onClickButton} style={{ color: color }}>
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: 'black',
};

export default Button;
