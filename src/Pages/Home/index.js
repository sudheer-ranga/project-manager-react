import React, { useState } from "react";
import { connect } from "react-redux";
import { getBoards, createBoard } from "./../../redux/actions/boardsActions";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import "./Home.scss";

const ConnectedHome = props => {
  const [boardName, setBoardName] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  const handleBoardNameChange = e => {
    if (emptyError) {
      setEmptyError(false);
    }
    const value = e.target.value;
    setBoardName(value);
  };

  const createNewBoard = e => {
    if (!boardName) {
      setEmptyError(true);
      return;
    }

    props.createBoard({
      id: uuid(),
      name: boardName
    });

    setBoardName("");
  };

  const handleOnKeyDown = e => {
    if (e.key === "Enter") {
      createNewBoard(e);
    }
  };

  return (
    <div className="container home-container">
      <h3 className="main-heading">All Boards ({props.boards.length})</h3>
      {/* <p>
        {props.boards.length} Board{props.boards.length > 1 ? "s" : null}
      </p> */}

      <div className="add-new-board">
        <div className="board-input-wrapper">
          <input
            className="board-name"
            type="text"
            value={boardName}
            placeholder="Add new board"
            onChange={handleBoardNameChange}
            onKeyDown={handleOnKeyDown}
          />
          {emptyError && <p className="error">Enter board name</p>}
        </div>
        <button
          className="create-board-btn"
          type="button"
          onClick={createNewBoard}
        >
          Create
        </button>
      </div>

      <div className="boards-wrapper">
        {props.boards &&
          props.boards.map(board => {
            return (
              <Link to={`board/${board.id}`} key={board.id}>
                <div className="board-wrapper">
                  <h4 className="board-name">{board.name}</h4>
                  <p>
                    {board.data.length} list{board.data.length > 1 ? "s" : null}
                  </p>
                </div>
              </Link>
            );
          })}

        {/* <div className="board-wrapper add-new-board">
          <p className="icon">+</p>
          <h4 className="board-name">Add New Board</h4>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    boards: state.boards.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoards: payload => {
      dispatch(getBoards(payload));
    },
    createBoard: payload => {
      dispatch(createBoard(payload));
    }
  };
};

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHome);

export default Home;
