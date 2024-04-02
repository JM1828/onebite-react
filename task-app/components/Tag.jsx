import './Tag.css';

export default function Tag({ tagName, selectTag, selected }) {
  const tagStyle = {
    HTML: { backgroundColor: '#fda821' },
    CSS: { backgroundColor: '#15d4c8' },
    JavaScript: { backgroundColor: '#ffd12c' },
    REACT: { backgroundColor: '#4cdafc' },
    default: { backgroundColor: '#f9f9f9' },
  };

  return (
    <button
      type="button"
      className="tag"
      // 버튼을 클릭했을 때 selectTag 함수를 호출
      onClick={() => selectTag(tagName)}
      // selected 값에 따라 style을 지정
      style={selected ? tagStyle[tagName] : tagStyle.default}
    >
      {/* 해당 버튼에는 태그의 이름이 표시됨 */}
      {tagName}
    </button>
  );
}
