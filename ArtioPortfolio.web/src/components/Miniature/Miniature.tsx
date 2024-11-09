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

  const handleClick = () => {
    setFocusIndex(index);
  };

  const handleKeyEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className={className} tabIndex={5} onKeyDown={handleKeyEnter}>
      <img className="miniature" src={src} alt={alt} onClick={handleClick} />
    </div>
  );
};

export default Miniature;
