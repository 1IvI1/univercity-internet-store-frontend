import React from "react";

const Option = ({ toggle, option, select }) => {
  return (
    <div
      className="option"
      onClick={(e) => {
        toggle();
        select(option)
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
  return (
    <div className="options-selection" onClick={toggleShowOptions}>
      {showOptions &&
        <div className="options-container">
          {
            options.map((option) => {
              return <Option key={option.name} toggle={toggleShowOptions} option={option} select={selectOption} />
            })}
        </div>
      }
      {!showOptions && selectedOption && selectedOption.name}
    </div>
  );
}
