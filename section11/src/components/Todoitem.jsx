import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../App';

// TodoItem 컴포넌트는 id, isDone, content, date, onUpdate, onDelete라는 props를 입력으로 받음
const TodoItem = ({ id, isDone, content, date}) => {

  // useContext 훅을 사용하여 TodoDispatchContext에서 제공하는 값을 객체 디스트럭처링을 통해 onUpdate와 onDelete 함수로 추출
  const {onUpdate, onDelete} = useContext(TodoDispatchContext);

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

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환갑에 따라, Props가 바뀌었는지 안바뀌었는지 판단
//   // T -> Props 바뀌지 않음 -> 리렌더링 X
//   // F -> Props 바뀜 -> 리렌더링 O

//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   return true;
// });

export default memo(TodoItem);
