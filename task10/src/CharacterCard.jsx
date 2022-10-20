import React from "react";

function CharacterCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
      <div className="img-content">
        <ul>
          <li>
            <strong>Name: </strong>
            {props.name}
          </li>
          <li>
            <strong>Description: </strong>
            {props.description}.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CharacterCard;
