import './App.css';
import TaskForm from '../components/TaskForm';
import TaskColumn from '../components/TaskColumn';
import todoIcon from '../components/assets/direct-hit.png';
import doingIcon from '../components/assets/glowing-star.png';
import doneIcon from '../components/assets/check-mark-button.png';
import { useState, useEffect } from 'react';

// 로컬 스토리지에서 'tasks' 키에 해당하는 값을 가져옴
const saveTasks = localStorage.getItem('tasks');

export default function App() {
  // saveTasks에 저장된 값을 JSON 형식으로 파싱하고, 그 결과를 tasks 상태의 초기 값으로 사용
  // JSON.parse는 JSON 형식의 문자열을 JavaScript 객체로 변환하는 함수
  const [tasks, setTasks] = useState(JSON.parse(saveTasks) || []);

  // tasks 상태를 JSON.stringify를 사용하여 JSON 형식의 문자열로 변환한 뒤, 'tasks'라는 키로 로컬 스토리지에 저장
  // tasks 상태가 변경될 때마다 해당 상태를 로컬 스토리지에 업데이트
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    // tasks 배열을 순회하면서 주어진 작업의 인덱스와 일치하지 않는 작업만으로 이루어진 새로운 배열을 생성
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    // 위의 작업이 완료되면, setTasks 함수를 사용하여 tasks 배열을 새로운 배열(newTasks)로 업데이트
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="할 일"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="진행중"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="완 료"
          icon={doneIcon}
          tasks={tasks}
          status="done "
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}
