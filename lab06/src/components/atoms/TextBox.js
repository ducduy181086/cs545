/**
 * @param { { className?: string, placeholder?: string, onChange?: Function } } props
 */
function TextBox({ className, placeholder, onChange }) {
  return <input className={className} type="text" placeholder={placeholder} onChange={onChange} />;
}

export default TextBox;
