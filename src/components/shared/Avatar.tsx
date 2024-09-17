import React from "react";

interface AvatarProps {
  src: string; // Image source
  alt?: string; // Alternate text for image
  size?: number; // Optional size of the avatar (default 100px)
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = 100 }) => {
  return (
    <div className="avatar-container" style={{ width: size, height: size }}>
      <img src={src} alt={alt} className="avatar" />
    </div>
  );
};

export default Avatar;
