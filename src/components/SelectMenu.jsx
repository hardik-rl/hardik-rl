import React from "react";

const SelectMenu = ({ textureGroups, selectedTexture, setSelectedTexture }) => {
  const handleTextureChange = (newTexture) => {
    setSelectedTexture(newTexture);
  };
  return (
    <>
      {textureGroups.map((group) => (
        <div key={group.groupName} className="select-container">
          <h3>{group.groupName}</h3>
          <select
            value={selectedTexture}
            onChange={(e) => handleTextureChange(e.target.value)}
          >
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
    // <select
    //   value={selectedTexture}
    //   onChange={(e) => handleTextureChange(e.target.value)}
    // >
    //   {textureOptions.map((option) => (
    //     <option key={option.value} value={option.value}>
    //       {option.label}
    //     </option>
    //   ))}
    // </select>
  );
};

export default SelectMenu;
