import './App.css';
import { useState, useRef } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

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

function App() {
  const [todos, setTodos] = useState(mockData);
  // idRef.current 값을 통해 현재의 id 값을 유지하고, 필요한 경우에 이 값을 업데이트할 수 있음
  const idRef = useRef(3);

  // onCreate 함수는 content(할 일 내용)을 입력으로 받아와서, 이를 바탕으로 새로운 할 일(newTodo) 객체를 생성
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    // setTodos를 사용하여 새로운 할 일(newTodo)을 기존의 할 일 목록(todos) 앞에 추가하여 상태를 업데이트함
    // newTodo 는 배열의 첫번째값으로 추가됨 ...todos(newTodo, 1, 2, 3)
    setTodos([newTodo, ...todos]);
  };

  // todos.map 메소드는 todos 배열을 순회하면서 각 요소에 대해 주어진 함수를 호출
  // 각 todo 객체를 받아서, 해당 todo의 id가 targetId와 일치하는지를 확인
  // 일치하는 경우에는 해당 todo 객체의 isDone 값을 반전시킨 새로운 객체를 반환하고, 일치하지 않는 경우에는 그대로 반환
  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onDelete = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    // todo.id !== targetId 조건이 참인 요소만 새로운 배열로 나타남
    // todo.id !== targetId 조건이 거짓인 요소만 제외됨
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      {/* Editor 컴포넌트를 렌더링하고, onCreate 함수를 props로 전달 */}
      <Editor onCreate={onCreate} />
      {/* todos 배열을 props로 전달받고, onUpdate 함수를 props로 전달받음 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
