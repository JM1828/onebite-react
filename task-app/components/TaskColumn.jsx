import './TaskColumn.css';
import TaskCard from './TaskCard';

export default function TaskColumn({
  title,
  icon,
  tasks,
  status,
  handleDelete,
}) {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        {/* "src" 속성은 "icon" 변수에서 가져온 이미지의 경로를 가리킴 */}
        <img className="task_column_icon" src={icon} alt="" />
        {title}
      </h2>

      {/* tasks 배열의 길이가 0보다 크면, 삼항 연산자를 사용하여 tasks 배열을 매핑하고 그 결과를 반환 */}
      {tasks.length > 0
        ? // tasks 배열의 각 요소에 대해 map 함수를 사용하여 작업(task)과 인덱스(index)를 순회
          tasks.map(
            (task, index) =>
              // 현재 작업의 상태(task.status)가 주어진 상태(status)와 일치하는지를 확인
              task.status === status && (
                // 일치하는 경우에만 TaskCard 컴포넌트를 렌더링
                // key 속성으로 index를, title 속성으로 작업의 제목을, tags 속성으로 작업의 태그를, handleDelete 속성으로 삭제 핸들러를, index 속성으로 작업의 인덱스를 전달
                <TaskCard
                  key={index}
                  title={task.task}
                  tags={task.tags}
                  handleDelete={handleDelete}
                  // 일반적으로 각 아이템에 대한 인덱스를 전달하는 이유는, 해당 아이템이 목록에서 어디에 위치하는지를 식별할 수 있도록 도와주기 위함
                  index={index}
                />
              )
          )
        : null}
    </section>
  );
}
