/**
 * @param {{ comment: string }} props
 */
function Comment({ comment }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <p className="text-sm text-gray-700">{comment}</p>
    </div>
  );
}

export default Comment;
