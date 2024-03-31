import { useEffect } from 'react';

const Even = () => {
  // 두 번째 매개변수로 빈 배열([])이 전달되었기 때문에, 이 useEffect는 컴포넌트가 처음으로 렌더링될 때 한 번만 실행
  useEffect(() => {
    // 컴포넌트가 화면에서 사라지거나 해당 컴포넌트를 사용하는 부모 컴포넌트가 다시 렌더링되어 해당 컴포넌트가 사라질 때 실행
    // useEffect가 콜백 함수로 반환하는 경우를 클린업, 정리함수 라고 말한다.
    return () => {
      console.log('unmount');
    };
  }, []);
  return <div>짝수입니다.</div>;
};

export default Even;
