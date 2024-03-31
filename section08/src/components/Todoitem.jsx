import './TodoItem.css';

// TodoItem 컴포넌트는 id, isDone, content, date, onUpdate, onDelete라는 props를 입력으로 받음
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  // 체크박스의 변경 이벤트가 발생했을 때 호출되는 onChangeCheckbox 함수
  const onChangeCheckbox = () => {
    // onUpdate 함수를 호출하고 인자로 id를 전달
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      {/* new Date(date).toLocaleDateString()를 통해 날짜를 현지 시간대의 문자열로 변환하여 표시 */}
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
