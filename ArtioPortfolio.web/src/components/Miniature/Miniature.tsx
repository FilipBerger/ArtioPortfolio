import { MiniatureProps } from "../../interfaces.tsx";
import "./Miniature.css";

const Miniature: React.FC<MiniatureProps> = ({
  src,
  alt,
  index,
  focusIndex,
  setFocusIndex,
}) => {
  const className =
    index === focusIndex
      ? "miniature-container focused"
      : "miniature-container";

  // Set the focus when a miniature is clicked
  const handleClick = () => {
    setFocusIndex(index);
  };

  // Set the focus when enter is pressed
  const handleKeyEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setFocusIndex(index);
    }
  };

  return (
    <div className={className} tabIndex={0} onKeyDown={handleKeyEnter}>
      <img className="miniature" src={src} alt={alt} onClick={handleClick} />
    </div>
  );
};

export default Miniature;
