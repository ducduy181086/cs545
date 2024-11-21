/**
 * @param {{ post: { id: any, title: any, author: any }, onSelected?: ({ id: any, title: any, author: any }) => void }} props
 */
function Post({ post, onSelected }) {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 hover:bg-blue-100"
      onClick={(e) => { if (onSelected) onSelected(post); }}>
      <p className="text-lg font-semibold text-blue-700">Title: {post.title}</p>
      <p className="text-gray-500">Id: {post.id}</p>
      <p className="text-gray-500">Author: {post.author}</p>
    </div>
  );
}

export default Post;
