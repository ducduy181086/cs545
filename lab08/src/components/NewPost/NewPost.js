import { useState, useRef, useEffect } from "react";

/**
 * @param {{ onCreated: (value: {title: string, author: string, content: string}) => void }} props
 */
function NewPost({ onCreated }) {
  const postForm = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = postForm.current;
    const data = { id: 0, title: form['title'].value, author: form['author'].value, content: form['content'].value };
    if (onCreated) onCreated(data);
    setPost(old => ({ ...old, title: "", author: "", content: "" }));
  }

  const onChange = (e) => {
    setPost(old => ({ ...old, [e.target.name]: e.target.value }));
  }

  const [post, setPost] = useState({ title: "", author: "", content: "" });

  useEffect(() => {
    postForm.current['title'].value = "";
    postForm.current['author'].value = "";
    postForm.current['content'].value = "";
  }, []);

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">New Post</h2>
      <form id="newPostForm" onSubmit={onSubmit} ref={postForm}>
        <div className="mb-4">
          <label htmlFor="newPostTitle" className="block text-gray-700 font-medium">Title</label>
          <input type="text" id="newPostTitle" name="title"
            className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required
            value={post.title}
            onChange={onChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="newPostAuthor" className="block text-gray-700 font-medium">Author</label>
          <input type="text" id="newPostAuthor" name="author"
            className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required
            value={post.author}
            onChange={onChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="newPostContent" className="block text-gray-700 font-medium">Content</label>
          <textarea id="newPostContent" name="content"
            className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows="4" required
            value={post.content}
            onChange={onChange}></textarea>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Add Post</button>
      </form>
    </div>
  );
}

export default NewPost;
