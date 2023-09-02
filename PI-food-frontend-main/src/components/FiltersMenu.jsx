import React from "react";
import { useSelector } from "react-redux"; 
import "../components/css/FiltersMenu.css"

export default function FiltersMenu(props) {
  const {
    handleFilterByType,
    handleOrderByName,
    handleOrderByScore,
    handleResetFilters,
    filterOptions,
    selectedAlphabeticalOrder,
    selectedHealthLevel,
  } = props;

  const selectedDietType = useSelector((state) => state.selectedDietType);

  const handleResetSelect = () => {
    handleFilterByType({ target: { value: "" } }); // Restablecer la selección a vacío
  };

  return (
    <div className="filterBar">
      {selectedDietType ? (
        <div className="filterDiet">
          <p>{selectedDietType}</p>
          
          <button onClick={handleResetSelect} className="resetButton">X</button>
        </div>
      ) : (
        <div className="filterDiet">
          <select
            id="dietSelect"
            onChange={handleFilterByType}
            value={selectedDietType}
          >
            <option value="">Select your DietType</option>
            {filterOptions
              .filter((option) => option !== "Not defined")
              .map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="filterSelect1">
        <label>Health Score order</label>
        <select onChange={handleOrderByScore} defaultValue={selectedHealthLevel}>
          <option value="">Select an option</option>
          <option value="less">Less Healthy</option>
          <option value="more">More Healthy</option>
        </select>
      </div>

      <div className="filterSelect2">
        <label>Alphabetical order</label>
        <select onChange={handleOrderByName} defaultValue={selectedAlphabeticalOrder}>
          <option value="">Select an option</option>
          <option value="asc">Ascending A-Z</option>
          <option value="desc">Descending Z-A</option>
        </select>
      </div>

      <div className="filterReset">
        <button onClick={handleResetFilters}>Refresh recipes</button>
      </div>
    </div>
  );
}
