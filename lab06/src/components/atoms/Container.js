/**
 * @param { { className?: string, children: any, onClick?: Function } } props
 */
function Container({ className, children, onClick }) {
  return <div className={className} onClick={onClick}>{children}</div>;
}

export default Container;
