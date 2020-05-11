import React, { useState } from "react";
import { connect } from "react-redux";
import { updateCard } from "../../redux/actions/boardsActions";

import EditIcon from "./../../assets/icons/edit.png";
import "./Card.scss";

const ConnectedCard = ({ card, columnId, ...props }) => {
  const [currentCard, setCurrentCard] = useState(null);
  const [emptyError, setEmptyError] = useState(false);

  const updateCardText = e => {
    if (emptyError) {
      setEmptyError(false);
    }
    setCurrentCard({ ...currentCard, text: e.target.value });
  };

  const saveCard = e => {
    if (!currentCard.text) {
      setEmptyError(true);
      return;
    }

    props.updateCard({ columnId, cardId: card.id, text: currentCard.text });
    setCurrentCard(null);
  };

  const handleCancelEdit = e => {
    setEmptyError(false);
    setCurrentCard(null);
  };

  // small hack to focus at the end of the input.
  // Not a proper way, but should be good enough for now
  const moveCaretToEnd = e => {
    var val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  };

  const handleKeyDown = e => {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();
      saveCard(e);
    } else if (key === "Escape") {
      handleCancelEdit(e);
    }
  };

  return (
    <div className="card-wrapper">
      {card.id === (currentCard && currentCard.id) ? (
        <>
          <div className="card-overlay" />
          <div className="card card-editable">
            <textarea
              placeholder="Add description..."
              className={"card-text " + (emptyError ? "has-error" : null)}
              value={currentCard.text}
              onChange={updateCardText}
              autoFocus
              onFocus={moveCaretToEnd}
              onKeyDown={handleKeyDown}
            />
            {emptyError && <span className="error">Enter description</span>}
            <div className="btn-group">
              <button onClick={saveCard} className="btn btn-save">
                Save
              </button>
              <button onClick={handleCancelEdit} className="btn btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="card card-noneditable">
          <span
            onClick={() => {
              setCurrentCard(card);
            }}
            className="edit-btn"
          >
            <img className="edit-icon" src={EditIcon} alt="Edit" />
          </span>
          <p>{card.text}</p>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateCard: payload => {
      dispatch(updateCard(payload));
    }
  };
};

const Card = connect(
  null,
  mapDispatchToProps
)(ConnectedCard);

export default Card;
