import React from "react";
import { useSelector } from "react-redux";
import "../components/css/FiltersMenu.css";

export default function FiltersMenu(props) {
  const {
    handleFilterByType,
    handleOrderByName,
    handleOrderByScore,
    handleResetFilters,
    filterOptions,
  } = props;

  const selectedDietType = useSelector((state) => state.selectedDietType);
  const selectedHealthLevel = useSelector((state) => state.selectedHealthLevel);
  const selectedAlphabeticalOrder = useSelector((state) => state.selectedAlphabeticalOrder);

  const handleResetSelect = () => {
    handleFilterByType({ target: { value: "" } }); // Restablecer la selección a vacío
  };

  const handleResetHealthLevel = () => {
    handleOrderByScore({ target: { value: "" } }); // Restablecer la selección de salud a vacío
  };

  const handleResetAlphabeticalOrder = () => {
    handleOrderByName({ target: { value: "" } }); // Restablecer la selección de orden alfabético a vacío
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

      {selectedHealthLevel ? (
        <div className="filterSelect1">
          <label>Health Score order</label>
          <div className="choose">
          <p>{selectedHealthLevel}</p>
          <button onClick={handleResetHealthLevel} className="resetButton">X</button>
          </div>
        </div>
      ) : (
        <div className="filterSelect1">
          <label>Health Score order</label>
          <select onChange={handleOrderByScore} defaultValue={selectedHealthLevel}>
            <option value="">Select an option</option>
            <option value="Less Healthy">Less Healthy</option>
            <option value="More Healthy">More Healthy</option>
          </select>
        </div>
      )}

      {selectedAlphabeticalOrder ? (
        <div className="filterSelect2">
          <label>Alphabetical order</label>
          <div className="choose">
          <p>{selectedAlphabeticalOrder}</p>
          <button onClick={handleResetAlphabeticalOrder} className="resetButton">X</button>
          </div>
        </div>
      ) : (
        <div className="filterSelect2">
          <label>Alphabetical order</label>
          <select onChange={handleOrderByName} defaultValue={selectedAlphabeticalOrder}>
            <option value="">Select an option</option>
            <option value="Ascending A-Z">Ascending A-Z</option>
            <option value="Descending Z-A">Descending Z-A</option>
          </select>
        </div>
      )}

      <div className="filterReset">
        <button onClick={handleResetFilters} >Refresh recipes</button>
      </div>
    </div>
  );
}
