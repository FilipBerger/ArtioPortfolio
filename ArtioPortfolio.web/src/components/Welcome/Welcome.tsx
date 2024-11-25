import React, { useEffect, useRef } from "react";
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
  // Refs for managing focus and elements
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLImageElement>(null);
  const closeButtonRef = useRef<HTMLImageElement>(null);

  // Handle tab key navigation
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );

    const handleTabKey = (e: KeyboardEvent) => {
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement; // First focusable element
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement; // Last focusable element

        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener("keydown", handleTabKey); // Add event listener for Tab key
    return () => document.removeEventListener("keydown", handleTabKey); // Cleanup the event listener
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Focus on the close button when the modal opens
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Handle enter for closing the modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="modal" tabIndex={-1} ref={modalRef}>
      <header className="modal-header">
        <img
          className="close-button"
          src="/close-icon.svg"
          alt="Close"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={closeButtonRef}
        />
      </header>
      <div className="modal-description">
        <img src={profilePicture} alt="Profile picture" />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <div className="profile-information-social-links">
        {linkedin && (
          <a href={linkedin}>
            <img
              className="linked-in-icon"
              src="/linked-in-48.svg"
              alt="LinkedIn"
              ref={!instagram && !facebook ? firstFocusableRef : undefined}
            />
          </a>
        )}
        {instagram && (
          <a href={instagram}>
            <img
              className="instagram-icon"
              src="/instagram-48.svg"
              alt="Instagram"
              ref={!facebook ? firstFocusableRef : undefined}
            />
          </a>
        )}
        {facebook && (
          <a href={facebook}>
            <img
              className="facebook-icon"
              src="/facebook-48.svg"
              alt="Facebook"
            />
          </a>
        )}
        <a href={cv}>
          <img
            className="cv-icon"
            src="/cv.png"
            alt="CV"
            ref={firstFocusableRef}
          />
        </a>
      </div>
    </div>
  );
};

export default Welcome;
