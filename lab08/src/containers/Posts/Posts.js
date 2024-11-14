import Post from "components/Post/Post.js";

/**
 * @param {{ posts: { id: any, title: any, author: any }[], onSelected?: ({ id: any, title: any, author: any }) => void }} props
 */
function Posts({ posts, onSelected }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Posts</h2>
      <div className="grid grid-cols-1 gap-4">
        {posts.map(m => (
          <Post key={m.id} post={m} onSelected={onSelected}></Post>
        ))}
      </div>
    </div>
  );
}

export default Posts;
