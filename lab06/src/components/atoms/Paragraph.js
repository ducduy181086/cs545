/**
 * @param { { className?: string, children: any } } props
 */
function Paragraph({ className, children }) {
  return <p className={className}>{children}</p>;
}

export default Paragraph;
