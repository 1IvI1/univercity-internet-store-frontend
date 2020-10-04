import React from "react";

const Option = ({ toggle, option }) => {
  return (
    <div
      onClick={() => {
        toggle();
      }}
    >
      {option}
    </div>
  );
};

export default function UniversitySelection(props) {
  const {
    options,
    selectedOption,
    showOptions,
    toggleShowOptions,
    selectOption,
  } = props;
  return (
    <div className="university-selection-container" onClick={toggleShowOptions}>
      {showOptions &&
        options.map((option) => (
          <Option toggle={toggleShowOptions} option={option} />
        ))}
    </div>
  );
}
