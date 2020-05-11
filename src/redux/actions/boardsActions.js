import {
  GET_BOARDS,
  CREATE_BOARD,
  SET_CURRENT_BOARD_ID,
  GET_BOARD,
  ADD_CARD,
  ADD_COLUMN,
  UPDATE_CARD,
  UPDATE_LIST,
  UPDATE_CARD_STATUS
} from "./types";

export const getBoards = payload => {
  return { type: GET_BOARDS, payload };
};

export const setCurrentBoardId = payload => {
  return { type: SET_CURRENT_BOARD_ID, payload };
};

export const createBoard = payload => {
  return { type: CREATE_BOARD, payload };
};

export const getBoard = payload => {
  return { type: GET_BOARD, payload };
};

export const addColumn = payload => {
  return { type: ADD_COLUMN, payload };
};

export const addCard = payload => {
  return { type: ADD_CARD, payload };
};

export const updateCard = payload => {
  return { type: UPDATE_CARD, payload };
};

export const updateList = payload => {
  return { type: UPDATE_LIST, payload };
};

export const updateCardStatus = payload => {
  return { type: UPDATE_CARD_STATUS, payload };
};
