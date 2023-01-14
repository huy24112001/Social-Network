import {useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import noAvatar from "../../img/person/noAvatar.png"
import service from "../../service";

export default function Share() {

  const [state , dispatch] = useContext(Context)
  const infoUser = state.infoUser
  const initialPost = {
    userId: infoUser._id,
    desc: ""
  }

  const [post, setPost] = useState(initialPost)
  const [file, setFile] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleShare = async (e) => {
    e.preventDefault();
    // console.log(post)
    
    await service.postService.createPost({data: post, token: infoUser.token})
    setFile(null)
    setPost(initialPost)
  }

  const handleFile = async (e) => {
    e.preventDefault();
    let filename = ''
    const encodedString = await convertToBase64(e.target.files[0])
    // console.log(encodedString)
    setFile(e.target.files[0])
    setPost({...post, img: encodedString})
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={infoUser.profilePicture} alt="avatar" />
          <input
            placeholder={`What's in your mind ${infoUser?.username}?`}
            className="shareInput"
            value={post.desc}
            onChange={(e) => setPost({...post, desc: e.target.value})}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom"  onSubmit={handleShare}>
            <div className="shareOptions">
                <label className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => handleFile(e)}
                    />
                </label>
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
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
