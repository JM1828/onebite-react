import React, { useState } from 'react';

function useInput() {
  const [input, setInput] = useState('');

  // e는 이벤트 객체를 나타내며, e.target은 이벤트가 발생한 요소를 가리킴
  const onChange = (e) => {
    // 입력된 값(e.target.value)을 setInput을 통해 input 상태에 반영
    setInput(e.target.value);
  };

  // [input, onChange] 배열을 반환, 이 배열은 컴포넌트에서 useInput을 호출할 때 사용됨
  // input은 상태 값이고, onChange는 해당 상태를 업데이트하는 함수
  return [input, onChange];
}

export default useInput;
