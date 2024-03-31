import './List.css';
import TodoItem from './Todoitem';
import { useState, useMemo } from 'react';

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

  // getFilteredData 함수를 호출하여 반환된 값을 filteredTodos 변수에 저장
  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // totalCount는 todos 배열의 길이로 모든 할일의 개수를 나타냄
    const totalCount = todos.length;
    // doneCount는 filter 메서드를 사용하여 isDone이 true인 할일들의 개수를 센 것
    const doneCount = todos.filter((todo) => todo.isDone).length;
    // notDoneCount는 전체 할일 수에서 완료된 할일 수를 뺀 값으로, 아직 완료되지 않은 할일의 개수를 나타냄
    const notDoneCount = totalCount - doneCount;

    // 총 할일 수, 완료된 할일 수, 미완료된 할일 수를 포함하는 객체를 반환
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  // 의존성배열 : deps

  // getAnalyzedData의 반환값으로부터 totalCount, doneCount, notDoneCount를 추출하여 각각의 변수에 할당하는 구조 분해 할당
  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className="List">
      <h4>Todo List ✔</h4>
      {/* getAnalyzedData 함수에서 반환된 값을 화면에 출력 */}
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      {/* map 함수를 사용하여 filteredTodos 배열을 순회하면서 각 할 일 항목에 대해 TodoItem 컴포넌트를 생성 */}
      {/* 각 할 일 항목은 todo라는 변수에 할당되고, 해당 할 일 항목의 id와 내용 등의 속성을 TodoItem 컴포넌트의 props로 전달 */}
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
