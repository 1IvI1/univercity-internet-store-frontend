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
  console.log("showOptions", showOptions)
  return (
    <div className="options-selection" onClick={toggleShowOptions}>
      
      {showOptions &&
      <div className="options-container">
        {
        options.map((option) => (
          <Option toggle={toggleShowOptions} option={option} select={selectOption} />
        ))}
        </div>}
        {!showOptions && selectedOption}
       
    </div>
  );
}
