import React from "react";

const Option = ({ toggle, option, select }) => {
  return (
    <div
    className="option"
      onClick={(e) => {
        toggle();
        select(option.name)
      }}
    >
      {option.name}
    </div>
  );
};

export default function UniversitySelection({
  options,
  selectedOption,
  showOptions,
  toggleShowOptions,
  selectOption,
}) {
  console.log(options, showOptions)
  return (
    <div className="university-selection-container" onClick={toggleShowOptions}>
      {showOptions &&
        options.map((option) => (
          <Option toggle={toggleShowOptions} option={option} select={selectOption} />
        ))}
        {selectedOption.name}
    </div>
  );
}
