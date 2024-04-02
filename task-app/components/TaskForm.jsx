import { useState } from 'react';
import './TaskForm.css';
import Tag from './Tag';

export default function TaskForm({ setTasks }) {
  // 초기 값으로는 task, status, tags 속성을 갖는 객체를 설정
  const [taskData, setTaskData] = useState({
    task: '',
    status: 'todo',
    tags: [],
  });

  const selectTag = (tag) => {
    // taskData의 tags 배열을 순회하면서 주어진 태그와 일치하는 항목이 있는지를 확인
    if (taskData.tags.some((item) => item === tag)) {
      // taskData의 tags 배열에서 주어진 태그를 제외한 새로운 배열을 생성
      const filterTags = taskData.tags.filter((item) => item !== tag);
      // 조건문에서 주어진 태그가 이미 존재하면, filterTags로 업데이트된 새로운 tags 배열을 taskData에 설정하여 해당 태그를 제거
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
      // 만약 주어진 태그가 존재하지 않는다면, 기존의 tags 배열에 주어진 태그를 추가한 새로운 배열을 taskData에 설정하여 해당 태그를 추가
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const checkTag = (tag) => {
    // taskData의 tags 배열을 순회하면서 주어진 태그와 일치하는 항목이 있는지를 확인
    // some 함수는 배열 내 요소 중 하나라도 주어진 조건을 만족하면 true를 반환
    return taskData.tags.some((item) => item === tag);
  };

  const handleChange = (e) => {
    // 이벤트가 발생한 HTML 요소의 이름(name)과 값(value)을 추출
    const { name, value } = e.target;
    // 이전의 taskData 상태를 복사한 뒤, 새로운 name과 value를 포함한 업데이트된 객체를 반환
    setTaskData((prev) => {
      // [name]: value는 { task: value }와 같은 결과를 만들어냄
      // 객체의 속성을 동적으로 정의하여, name 변수의 값에 따라 동적으로 객체를 업데이트할 수 있게 해줌
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    // 폼 제출(submit) 이벤트의 새로고침을 막음
    e.preventDefault();
    // 이전의 tasks 상태를 복사한 뒤, 새로운 taskData를 추가하여 업데이트
    setTasks((prev) => {
      return [...prev, taskData];
    });
    // taskData 상태를 초기화하여 빈 작업으로 설정
    setTaskData({
      task: '',
      status: 'todo',
      tags: [],
    });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          // 입력값이 변경될 때 handleChange 함수가 호출되도록 설정
          onChange={handleChange}
          // 입력란의 초기값을 taskData 객체의 task 속성으로 설정
          value={taskData.task}
          // 입력란의 이름을 "task"로 지정
          name="task"
          className="task_input"
          placeholder="Enter your task"
        />

        <div className="task_form_bottom_line">
          <div>
            <Tag
              // Tag 컴포넌트에게 표시할 태그의 이름으로 "HTML"을 전달
              tagName="HTML"
			  // selectTag라는 함수를 전달, 태그를 선택했을 때 호출되는 콜백 함수
              selectTag={selectTag}
			  // checkTag 함수에 "HTML"을 전달한 결과가 selected props로 전달되고 있음
              selected={checkTag('HTML')}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag('CSS')}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkTag('JavaScript')}
            />
            <Tag
              tagName="REACT"
              selectTag={selectTag}
              selected={checkTag('REACT')}
            />
          </div>
          <div>
            <select
              className="task_status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="todo">할일</option>
              <option value="doing">진행중</option>
              <option value="done">완료</option>
            </select>
            <button type="submit" className="task_submit">
              + 추가
            </button>
          </div>
        </div>
      </form>
    </header>
  );
}
