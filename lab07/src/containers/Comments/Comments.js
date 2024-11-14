import Comment from "components/Comment/Comment";

/**
 * @param {{ comments: []string }} props
 */
function Comments({ comments }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-blue-500 mb-4">Comments</h3>
      <div id="commentsList" className="space-y-4">
        {comments.map((c, i) => <Comment key={i} comment={c} />)}
      </div>
    </div>
  );
}

export default Comments;
