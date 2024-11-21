import { useEffect, useState } from "react";

import { postService } from "services/postService";
import { PostContext } from "context/PostContext";

import Posts from "containers/Posts/Posts";
import PostDetail from "components/PostDetail/PostDetail";
import NewPost from "components/NewPost/NewPost";
import Header from "containers/Header/Header";
import PageRoutes from "routes/PageRoutes";

function Dashboard() {
  const [postContextState, setPostContextState] = useState({ postId: 0 });
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    (async () => {
      const data = await postService.getAllPosts();
      setPosts(data);
    })();
  }, [refresh]);

  const handleChangeDetail = (item) => {
    setPostContextState(old => ({...old, postId: item.id }));
  }

  const handleCreate = (post) => {
    (async () => {
      await postService.create(post);
      setRefresh({});
    })();
  }

  const handleEdit = (e) => {
    console.log("Edit button clicked!");
  }

  const handleDelete = (e) => {
    (async () => {
      await postService.del(postContextState.postId);
      setRefresh({});
    })();
  }

  return (
    <PostContext.Provider value={postContextState}>
      <div className="bg-blue-50 text-gray-800 p-8 min-h-screen">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Dashboard</h1>
          <PageRoutes />
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Dashboard</h1>

          <Posts posts={posts} onSelected={handleChangeDetail} />
          <NewPost onCreated={handleCreate}></NewPost>
          <PostDetail handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      </div>
    </PostContext.Provider>
  );
}

export default Dashboard;
