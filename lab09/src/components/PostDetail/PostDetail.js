import { useContext, useEffect, useState } from "react";

import { postService } from "services/postService";
import { PostContext } from "context/PostContext";

import Comments from "containers/Comments/Comments";

/**
 * @param {{ handleEdit?: Function, handleDelete?: Function }} props
 */
function PostDetail({ handleEdit, handleDelete }) {
  const postContext = useContext(PostContext);
  const [postDetail, setPostDetail] = useState({ id: 0, title: "", author: "", comments: [] });

  useEffect(() => {
    (async () => {
      if (postContext.postId) {
        const data = await postService.getById(postContext.postId);
        setPostDetail(data);
      }
    })();
  }, [postContext.postId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Post Detail</h2>
      <p className="text-lg"><strong>Id:</strong> <span className="text-gray-600">{postDetail.id}</span></p>
      <p className="text-lg"><strong>Title:</strong> <span className="text-blue-700">{postDetail.title}</span></p>
      <p className="text-lg"><strong>Author:</strong> <span className="text-gray-600">{postDetail.author}</span></p>
      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600" onClick={handleEdit}>Edit</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600" onClick={handleDelete}>Delete</button>
      </div>
      <Comments comments={postDetail.comments} />
    </div>
  );
}

export default PostDetail;
