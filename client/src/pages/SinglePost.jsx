import React from "react";
import { Link } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";

const SinglePost = () => {
  return (
    <div className="single">
      <div className="post-content">
        <div className="post-img">
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
        <div className="user">
          <div className="info">
            <p>
              Written by:&nbsp;<span>Yazmin</span>
            </p>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?id=2`}>
              <FcEditImage />
            </Link>
            <Link>
              <FcEmptyTrash />
            </Link>
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        <p className="body">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde sequi
          possimus nostrum voluptas excepturi. Repellendus at possimus
          cupiditate voluptatem quidem, facere libero quis accusamus dolores non
          est, tempora fugiat molestias excepturi numquam maiores odio! <br />
          <br />
          Hic porro magnam facilis nobis? Neque nemo rem fuga alias culpa at
          laborum. Voluptate quibusdam accusantium est quae obcaecati autem
          magni sit ullam tempore nemo beatae ipsum nobis unde iste fugit,
          doloremque reprehenderit illo quos quia repellat exercitationem.{" "}
          <br />
          <br />
          Temporibus asperiores voluptatem nesciunt facere soluta aut dolore
          eius at, aperiam magni quos qui? Et voluptatem eius nulla officiis?
          Facere consequuntur delectus, voluptatem nam atque quaerat
          reprehenderit placeat voluptas magni consequatur maxime ipsam neque
          commodi itaque quam ducimus cum praesentium sit? Excepturi quam
          impedit sit aspernatur saepe dignissimos eveniet ab doloribus et,
          dolorem minus nam magni sapiente possimus in vitae eum eos eaque earum
          nulla, praesentium cumque cupiditate autem. Ducimus aspernatur
          accusamus unde voluptatum error architecto. <br />
          <br />
          Blanditiis ratione mollitia laudantium reiciendis impedit ullam!
          Eligendi voluptatibus maxime, quam dolorum totam quis deserunt
          excepturi aspernatur aut exercitationem architecto consectetur quaerat
          est, praesentium ad, molestias animi neque laudantium! Asperiores
          fugit ex animi est soluta eum impedit vel et aperiam quibusdam, minus
          odio aliquid nostrum doloribus eos quod praesentium eveniet excepturi
          maiores sapiente voluptatum explicabo maxime saepe. <br />
          <br />
          Distinctio repudiandae neque, qui reiciendis consequuntur quas quam
          excepturi ratione sit iusto, iure et molestiae iste facere explicabo
          aspernatur libero! Repellendus, ab, rerum iure ut assumenda inventore
          adipisci autem provident in nesciunt, facilis et molestiae tempora
          officiis distinctio voluptate dolorum dolor? Error totam ex vel.
        </p>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default SinglePost;
