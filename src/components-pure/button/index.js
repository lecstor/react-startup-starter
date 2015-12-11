
export default React => ({ className, onClick, label }) => (
  <button className={className} onClick={onClick}> {label} </button>
);
