import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import { useState, useEffect, useRef } from 'react';
import Even from './components/Even';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // isMount라는 변수를 생성하고, 초기값을 false로 설정
  const isMount = useRef(false);

  // 1. 마운트 : 탄생
  useEffect(() => {
    console.log('mount');
  }, []);

  // 2. 업데이트 : 변화, 리렌더링
  // useEffect 내부에서 isMount의 값이 false일 때는 "update"라는 메시지를 출력하지 않고, true로 변경하고 바로 리턴
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('update');
  });

  // 3. 언마운트 : 죽음

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
