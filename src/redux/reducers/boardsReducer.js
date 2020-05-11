import {
  GET_BOARDS,
  CREATE_BOARD,
  SET_CURRENT_BOARD_ID,
  ADD_CARD,
  ADD_COLUMN,
  UPDATE_CARD,
  UPDATE_LIST
} from "../actions/types";
import MockData from "./../mock";
import _ from "lodash";

function boardsReducer(state = MockData, action) {
  switch (action.type) {
    case GET_BOARDS:
      return _.cloneDeep(state);

    case CREATE_BOARD:
      state.boards.push({
        ...action.payload,
        data: []
      });
      return _.cloneDeep(state);

    case SET_CURRENT_BOARD_ID:
      const { boardId } = action.payload;
      state.currentBoardId = boardId;
      return _.cloneDeep(state);

    case ADD_CARD:
      const pload = action.payload;
      const actBrd = _.find(state.boards, {
        id: state.currentBoardId
      });
      const colmData = _.find(actBrd.data, { id: pload.columnId });
      colmData.cards.push(pload.card);
      return _.cloneDeep(state);

    case ADD_COLUMN:
      const { id, name } = action.payload;
      const newState = {
        id,
        name,
        cards: []
      };
      const currentBoard = _.find(state.boards, {
        id: state.currentBoardId
      });
      currentBoard.data.push(newState);
      return _.cloneDeep(state);

    case UPDATE_LIST:
      const pld = action.payload;
      const currBoard = _.find(state.boards, {
        id: state.currentBoardId
      });
      const newColumnsIdx = _.findIndex(currBoard.data, { id: pld.columnId });
      currBoard.data[newColumnsIdx].cards = pld.cards;
      return _.cloneDeep(state);

    case UPDATE_CARD:
      const { columnId, cardId, text } = action.payload;
      const activeBoard = _.find(state.boards, {
        id: state.currentBoardId
      });
      const clmIdx = _.findIndex(activeBoard.data, { id: columnId });
      const columnCards = activeBoard.data[clmIdx].cards;
      columnCards.some(card => {
        if (card.id === cardId) {
          card.text = text;
          return true;
        }
        return false;
      });
      return _.cloneDeep(state);

    default:
      return state;
  }
}

export default boardsReducer;
