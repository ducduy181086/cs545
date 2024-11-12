/**
 * @param { { className?: string, children: any } } props
 */
function Header1({ className, children }) {
  return <h1 className={className}>{children}</h1>;
}

export default Header1;
