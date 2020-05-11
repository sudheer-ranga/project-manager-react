import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SingleColumn from "./../SingleColumn";
import {
  addColumn,
  setCurrentBoardId
} from "../../redux/actions/boardsActions";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import { Link } from "react-router-dom";

import addIcon from "./../../assets/icons/plus.png";
import "./Columns.scss";

const ConnectedColumns = ({ board, boardId, ...props }) => {
  // console.log("board: ", board);
  const [columnName, setColumnName] = useState("");
  const [createNewColumn, setCreateNewColumn] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    props.setCurrentBoardId({
      boardId
    });
  }, []);

  const handleColumnNameChange = e => {
    if (emptyError) {
      setEmptyError(false);
    }
    setColumnName(e.target.value);
  };

  const addNewColumn = () => {
    setCreateNewColumn(true);
  };

  const resetAddNewColumn = () => {
    setCreateNewColumn(false);
    setEmptyError(false);
    setColumnName("");
  };

  const createColumn = () => {
    if (!columnName) {
      setEmptyError(true);
      return;
    }

    props.addColumn({
      id: uuid(),
      name: columnName
    });
    resetAddNewColumn();
  };

  const handleKeyDown = e => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      createColumn(e);
    } else if (key === "Escape") {
      resetAddNewColumn(e);
    }
  };

  return (
    <div className="single-board-wrapper">
      <div className="board-name-wrapper">
        <Link className="back-link" to="/">
          Back
        </Link>
        <h3 className="main-heading">{board && board.name}</h3>
      </div>

      <div className="columns-wrapper">
        {board &&
          board.data &&
          board.data.map(column => (
            <SingleColumn
              key={column.id}
              columnId={column.id}
              columnData={column}
            />
          ))}

        <div className="column column-placeholder">
          {createNewColumn ? (
            <div className="new-column-wrapper">
              <input
                placeholder="Add list title"
                className="column-text"
                value={columnName}
                onChange={handleColumnNameChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {emptyError && <span className="error">Enter title</span>}
              <div className="btn-group">
                <button onClick={createColumn} className="btn btn-save">
                  Create
                </button>
                <button onClick={resetAddNewColumn} className="btn btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className="add-column-btn" onClick={addNewColumn}>
              <span className="icon add-card-img">
                <img src={addIcon} alt="Add card" />
              </span>
              <span className="text">Add another list</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  if (!state.boards.boards) return;

  const currentBoard = _.find(state.boards.boards, {
    id: state.boards.currentBoardId
  });

  return {
    board: currentBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBoardId: payload => {
      dispatch(setCurrentBoardId(payload));
    },
    addColumn: payload => {
      dispatch(addColumn(payload));
    }
  };
};

const Columns = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedColumns);

export default Columns;
