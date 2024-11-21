import React from "react";

const TruncateText = ({ text, customStyle, maxLength }) => {
  return (
    <div className={`${customStyle}`}>
      {text?.length > maxLength ? (
        <span>{text.slice(0, maxLength)}...</span>
      ) : (
        text
      )}
    </div>
  );
};

export default TruncateText;
