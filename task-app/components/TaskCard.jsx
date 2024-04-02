import Tag from './Tag';
import deleteIcon from '../components/assets/delete.png';
import './TaskCard.css';

export default function TaskCard({ title, tags, handleDelete, index }) {
  return (
    <article className="task_card">
      <p className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {/* "tagName" 속성으로는 태그의 이름을, "key" 속성으로는 인덱스를, "selected" 속성으로는 true 값을, "index" 속성으로는 인덱스를 전달 */}
          {tags.map((tag, index) => (
            <Tag tagName={tag} key={index} selected={true} index={index} />
          ))}
        </div>
        <div className="task_delete">
          <img
            className="delete_icon"
            // "src" 속성은 "deleteIcon" 변수에서 가져온 이미지의 경로
            src={deleteIcon}
            alt=""
            // "onClick" 속성은 이미지를 클릭했을 때 handleDelete 함수를 호출하며, 해당 작업의 인덱스(index)를 전달
            onClick={() => handleDelete(index)}
          />
        </div>
      </div>
    </article>
  );
}
