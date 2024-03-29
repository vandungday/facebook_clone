import { ArrowRight, Plus } from "../../../svg";
import "./style.scss";
import { stories } from "../../../data/home";
import Story from "./Story";
export default function Stories({ user }) {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img src={user.picture} alt="" className="create_story_img" />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Tạo tin</div>
      </div>
      {stories.map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
