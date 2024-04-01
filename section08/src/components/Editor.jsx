import './Editor.css';
import { useState, useRef } from 'react';

// Editor는 onCreate이라는 prop을 받는 함수형 컴포넌트
// 이 prop은 나중에 추가 버튼이 클릭되었을 때 호출될 함수를 나타냄
const Editor = ({ onCreate }) => {
  // useState 훅을 사용하여 content라는 상태 값과 이를 업데이트하는 함수 setContent를 정의
  const [content, setContent] = useState('');
  const contentRef = useRef();

  // onChangeContent 함수는 입력 필드의 변화에 따라 content 상태를 업데이트하는 역할
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // onKeydown 함수는 사용자가 키를 눌렀을 때 (Enter 키인 경우) onSubmit 함수를 호출하는 역할
  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    // 입력된 내용(content)이 비어있는지를 확인하고, 비어있을 경우 입력 필드에 포커스를 맞춤
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    // onCreate(content)를 호출하여 입력된 내용을 처리
    // setContent('')를 통해 입력 필드의 내용을 초기화하여 사용자가 새로운 내용을 입력할 수 있도록 함
    onCreate(content);
    setContent('');
  };

  return (
    <div className="Editor">
      {/* input 요소는 content 값을 보여주고, 사용자 입력에 따라 onChangeContent 함수가 호출됨 */}
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      {/* 추가 버튼은 클릭 시 onSubmit 함수가 호출됨 */}
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
