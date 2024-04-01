import './List.css';
import TodoItem from './Todoitem';
import { useState } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
  // search라는 상태 값과 setSearch라는 해당 상태를 업데이트하는 함수를 정의
  const [search, setSearch] = useState('');

  // 이벤트 객체(e)를 받아와서 해당 이벤트 객체의 target.value 값을 사용하여 search 상태를 업데이트
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 현재 입력된 검색어(search)에 따라 필터링된 할 일 목록을 반환
  const getFilteredData = () => {
    // 만약 검색어가 비어있다면, 모든 할 일 목록을 반환
    if (search === '') {
      return todos;
    }

    // todos 배열에서 조건을 만족하는 할 일들만을 필터링하여 새로운 배열을 반환
    // includes 메서드는 배열이 특정 요소를 포함하고 있는지 여부를 판별하는 메서드
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="List">
      <h4>Todo List ✔</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      {/* map 함수를 사용하여 filteredTodos 배열을 순회하면서 각 할 일 항목에 대해 TodoItem 컴포넌트를 생성 */}
      {/* 각 할 일 항목은 todo라는 변수에 할당되고, 해당 할 일 항목의 id와 내용 등의 속성을 TodoItem 컴포넌트의 props로 전달 */}
      <div className="todos_wrapper">
        {getFilteredData().map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />;
        })}
      </div>
    </div>
  );
};

export default List;
