import './App.css';
import { useState, useRef, useReducer, useCallback } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

// mockData는 초기 ToDo 목록을 나타내는 배열
// 각 항목은 id, isDone(완료 여부), content(할 일 내용), date(작성 일자)를 가지고 있음
const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
];

// 현재 상태 state와 액션 action을 받아들여 새로운 상태를 반환하는 함수
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      // 새로운 할일인 action.date를 상태 배열의 맨 앞에 추가하여 새로운 상태를 반환
      return [action.date, ...state];
    case 'UPDATE':
      // state 배열을 map 메서드를 사용하여 순회하고, 각 항목의 id가 action.targetId와 일치하는지를 확인
      // 만약 일치한다면 해당 항목의 isDone 값을 토글하여 새로운 상태를 반환, 일치하지 않는 경우에는 기존 항목을 그대로 유지
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case 'DELETE':
      // state 배열을 filter 메서드를 사용하여 순회하고, 각 항목의 id가 action.targetId와 일치하지 않는 항목들로 새로운 배열을 반환
      return state.filter((item) => item.id !== action.targetId);
    default:
      // 처리할 수 없는 액션이 들어왔을 때 기본적으로 현재 상태를 그대로 반환
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  // idRef.current 값을 통해 현재의 id 값을 유지하고, 필요한 경우에 이 값을 업데이트할 수 있음
  const idRef = useRef(3);

  // onCreate 함수는 content를 매개변수로 받아들이고, 해당 content를 이용하여 dispatch를 호출하여 'CREATE' 타입의 액션을 전달
  // useCallback 훅은 종속성 배열이 빈 배열인 경우에만 함수를 생성하고, 이 함수는 메모이제이션되어서 불필요한 렌더링을 방지함
  const onCreate = useCallback((content) => {
    dispatch({
      type: 'CREATE',
      date: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  // onUpdate 함수는 targetId를 매개변수로 받아들이고, 해당 targetId를 이용하여 dispatch를 호출하여 'UPDATE' 타입의 액션을 전달
  // useCallback 훅은 종속성 배열이 빈 배열인 경우에만 함수를 생성하고, 이 함수는 메모이제이션되어서 불필요한 렌더링을 방지함
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  // onDelete 함수는 targetId를 매개변수로 받아들이고, 해당 targetId를 이용하여 dispatch를 호출하여 'DELETE' 타입의 액션을 전달
  // useCallback 훅은 종속성 배열이 빈 배열인 경우에만 함수를 생성하고, 이 함수는 메모이제이션되어서 불필요한 렌더링을 방지함
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      {/* Editor 컴포넌트를 렌더링하고, onCreate 함수를 props로 전달 */}
      <Editor onCreate={onCreate} />
      {/* todos 배열을 props로 전달받고, onUpdate 함수를 props로 전달받음 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
