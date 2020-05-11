import React, { useState } from "react";
import Card from "./../Card";
import { connect } from "react-redux";
import { addCard, updateList } from "../../redux/actions/boardsActions";
import { v4 as uuid } from "uuid";
import { ReactSortable } from "react-sortablejs";

import addIcon from "./../../assets/icons/plus.png";
import "./SingleColumn.scss";

const ConnectedSingleColumn = ({ columnId, columnData, ...props }) => {
  const [newCard, setNewCard] = useState(null);
  const [emptyError, setEmptyError] = useState(false);

  const updateCardText = e => {
    if (emptyError) {
      setEmptyError(false);
    }
    setNewCard({ ...newCard, text: e.target.value });
  };

  const addNewCard = e => {
    setNewCard({
      id: uuid(),
      text: ""
    });
  };

  const createCard = e => {
    if (!newCard.text) {
      setEmptyError(true);
      return;
    }

    props.addCard({
      columnId,
      card: newCard
    });

    setNewCard(null);
  };

  const setUpdatedList = cards => {
    props.setUpdatedList({
      columnId,
      cards
    });
  };

  const cancelCreateCard = e => {
    setEmptyError(false);
    setNewCard(null);
  };

  const handleKeyDown = e => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      createCard(e);
    } else if (key === "Escape") {
      cancelCreateCard(e);
    }
  };

  return (
    <div className="column single-column-wrapper" id={columnData.id}>
      <h4 className="column-name">{columnData.name}</h4>

      <ReactSortable
        className="sortable-list"
        list={columnData.cards}
        setList={setUpdatedList}
        group="groupName"
        dragClass="sortable-drag"
        forceFallback="true"
        fallbackClass="sortable-fallback"
        animation={200}
      >
        {columnData.cards.map(card => (
          <Card id={card.id} key={card.id} columnId={columnId} card={card} />
        ))}
      </ReactSortable>

      {newCard ? (
        <div className="new-card-wrapper">
          <textarea
            placeholder="Add description..."
            className="card-text"
            value={newCard.text}
            onChange={updateCardText}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {emptyError && <span className="error">Enter description</span>}
          <div className="btn-group">
            <button onClick={createCard} className="btn btn-save">
              Create
            </button>
            <button onClick={cancelCreateCard} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="add-card-btn-wrapper">
          <button className="add-card-btn" onClick={addNewCard}>
            <span className="icon add-card-img">
              <img src={addIcon} alt="Add card" />
            </span>
            <span className="text">
              Add{" "}
              {columnData.cards && columnData.cards.length > 0
                ? "another"
                : "a"}{" "}
              card
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addCard: payload => {
      dispatch(addCard(payload));
    },
    setUpdatedList: payload => {
      dispatch(updateList(payload));
    }
  };
};

const SingleColumn = connect(
  null,
  mapDispatchToProps
)(ConnectedSingleColumn);

export default SingleColumn;
