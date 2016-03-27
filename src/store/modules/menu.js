
export const TOGGLE_LEFT = 'rss/menu/TOGGLE_LEFT';

const initialState = { showLeft: false };

export function toggleLeft () {
  return { type: TOGGLE_LEFT };
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_LEFT:
      return { ...state, showLeft: state.showLeft !== true };
    default:
      return state;
  }
}
