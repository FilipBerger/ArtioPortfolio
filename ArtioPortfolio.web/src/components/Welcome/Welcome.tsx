import "./Welcome.css";
import { WelcomeProps } from "../../interfaces";

const Welcome: React.FC<WelcomeProps> = ({
  profilePicture,
  name,
  description,
  linkedin,
  instagram,
  facebook,
  cv,
  onClose,
}) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="modal-description">
        <img src={profilePicture} alt="Profile picture" />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="profile-information-social-links">
        {linkedin ? (
          <a href={linkedin}>
            <img
              className="linked-in-icon"
              src="/linked-in-48.svg"
              alt="LinkedIn"
            />
          </a>
        ) : null}
        {instagram ? (
          <a href={instagram}>
            <img
              className="instagram-icon"
              src="/instagram-48.svg"
              alt="Instagram"
            />
          </a>
        ) : null}
        {facebook ? (
          <a href={facebook}>
            <img
              className="facebook-icon"
              src="/facebook-48.svg"
              alt="Facebook"
            />
          </a>
        ) : null}
        <a href={cv}>
          <img className="cv-icon" src="/cv.png" alt="CV" />
        </a>
      </div>
    </div>
  );
};

export default Welcome;
