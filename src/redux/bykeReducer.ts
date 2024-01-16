import { Byke, Status } from "../utils/types";

const ADD_BYKE = 'ADD_BYKE';
const REMOVE_BYKE = 'REMOVE_BYKE';
const SET_STATUS = 'SET_STATUS';
const SET_BYKES = 'SET_BYKES';

const initialState: InitialState = {
  items: [],
};

type InitialState = {
  items: Byke[],
};

const bykeReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case ADD_BYKE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case REMOVE_BYKE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }

    case SET_STATUS: 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.bykeId) {
            return {
              ...item,
              status: action.status,
            };
          }

          return item;
        })
      }

    case SET_BYKES:
      return {
        ...state,
        items: action.payload
      }
  
    default:
      break;
  }
  return state;
}

//action creators
export const addBykeAC = (byke: Byke): AddByke => {
  return {
    type: ADD_BYKE,
    payload: byke,
  }
}

export const removeBykeAC = (bykeId: string): RemoveByke => {
  return {
    type: REMOVE_BYKE,
    payload: bykeId,
  }
}

export const setStatus = (bykeId: string, status: Status): SetStatus => {
  return {
    type: SET_STATUS,
    bykeId,
    status
  }
}

export const setBykes = (bykes: Byke[]): SetBykes => {
  return {
    type: SET_BYKES,
    payload: bykes
  }
}

type AddByke = {
  type: typeof ADD_BYKE,
  payload: Byke,
}

type RemoveByke = {
  type: typeof REMOVE_BYKE,
  payload: string,
}

type SetStatus = {
  type: typeof SET_STATUS,
  bykeId: string,
  status: Status
}

type SetBykes = {
  type: typeof SET_BYKES,
  payload: Byke[],
}

type ActionTypes = AddByke | RemoveByke | SetStatus | SetBykes;

export default bykeReducer;
