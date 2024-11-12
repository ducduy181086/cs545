/**
 * @param { { className?: string, children: any, onClick?: Function } } props
 */
function Button({ className, children, onClick }) {
  return <button className={className} onClick={onClick}>{children}</button>;
}

export default Button;
