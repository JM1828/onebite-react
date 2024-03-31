import React, { useState, useRef } from 'react';
// 간단한 회원가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

const Register = () => {
  // input이라는 상태와 setInput이라는 상태를 변경하는 함수를 정의
  // input은 name, birth, country, bio라는 키를 가진 객체로 초기화
  const [input, setInput] = useState({
    name: '',
    birth: '',
    country: '',
    bio: '',
  });

  const countRef = useRef(0);
  const inputRef = useRef();

  // 입력 필드의 변화에 따라 input 상태를 업데이트하는 함수
  // Spread 연산자(...)를 사용하여 기존의 input을 복사하고, 변경된 필드만을 업데이트
  const onChange = (e) => {
    countRef.current++;
    console.log(countRef.current);
    setInput({
      ...input,
      // 입력 요소의 name 속성을 키(key)로, 입력된 값(value)을 값(value)으로 하는 객체를 생성
      // e는 이벤트 객체를 나타내며, e.target은 이벤트가 발생한 요소를 가리킴
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (input.name === '') {
      // 이름을 입력하는 DOM 요소에 포커스
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={'이름'}
        />
      </div>

      <div>
        <input
          name="birth"
          value={input.birth}
          onChange={onChange}
          type="date"
        />
      </div>

      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
      </div>

      <div>
        <textarea name="bio" value={input.bio} onChange={onChange} />
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Register;
