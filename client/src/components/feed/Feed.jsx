import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { Comments } from "../../dummyData"
import service from "../../service";
import Context from "../../store/context";
import { useContext, useEffect, useState } from "react";


export default function Feed({ userId }) {

  const [posts, setPosts] = useState([]);
  const [state , dispatch] = useContext(Context)
  const infoUser = state.infoUser

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = username
      //   ? await axios.get("/posts/profile/" + username)
      //   : await axios.get("posts/timeline/" + user._id);
      const res = userId ? await service.postService.getProfilePost(userId) : await service.postService.getProfilePost(infoUser._id)
      console.log(res)
      setPosts(
        res?.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [userId, infoUser._id]);


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
}
