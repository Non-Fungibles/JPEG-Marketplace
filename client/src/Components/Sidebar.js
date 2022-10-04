import React from "react";
import "../styles/sidebar.css";
import eth from "../assets/ethereum.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <fieldset>
        <legend>Filters</legend>
        <div className="filter-input">
          <label>On Sale</label>
          <input type="checkbox" />
        </div>
        <div className="filter-input">
          <label>
            0 <img src={eth} /> ~ 10<img src={eth} />
          </label>
          <input type="checkbox" />
        </div>
        <div className="filter-input">
          <label>10<img src={eth} /> ~ 20<img src={eth} /></label>
          <input type="checkbox" />
        </div>
        <div className="filter-input">
          <label>20<img src={eth} /> ~ 30<img src={eth} /></label>
          <input type="checkbox" />
        </div>
        <div className="filter-input">
          <label>30<img src={eth} /> ~ 40<img src={eth} /></label>
          <input type="checkbox" />
        </div>
        <div className="filter-input">
          <label>40<img src={eth} /> ~ 50<img src={eth} /></label>
          <input type="checkbox" />
        </div>
        <div className="filter-input">
          <label>50<img src={eth} />+</label>
          <input type="checkbox" />
        </div>
      </fieldset>
    </div>
  );
}

export default Sidebar;
