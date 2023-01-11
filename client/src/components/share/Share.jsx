import {useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import noAvatar from "../../img/person/noAvatar.png"
import service from "../../service";

export default function Share() {

  const [state , dispatch] = useContext(Context)
  const infoUser = state.infoUser

  const [post, setPost] = useState({
    userId: infoUser._id,
    desc: ""
  })

  const handleShare = async () => {
    await service.postService.createPost({data: post, token: infoUser.token})
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={!(infoUser.profilePicture === "") ? infoUser.profilePicture : noAvatar} alt="" />
          <input
            placeholder="What's in your mind Safak?"
            className="shareInput"
            onChange={(e) => setPost({...post, desc: e.target.value})}
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
}
