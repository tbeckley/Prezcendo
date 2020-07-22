import types from "./types";
import defaultState from "./defaultState";
import { DEFAULT_REVISION, DEFAULT_PARAMETERS } from "./defaultState";
import * as R from "ramda";

export default function rootReducer(state = defaultState, action) {
  // TODO - Actually write these functions correctly
  // so I don't have to do this abomination
  // This is really hard. Multiple reducers is the right way but yikes.
  // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
  // FFS I literally made common mistake #2

  const payload = action.payload;

  switch (action.type) {
    case types.CREATE_REVISION: {
      const parameters =
        payload.parameters == null
          ? { ...DEFAULT_PARAMETERS }
          : payload.parameters;
      const revision = { ...DEFAULT_REVISION, parameters: parameters };
      return {
        ...state,
        bridges: {
          ...state.bridges,
          [payload.bridgeID]: {
            ...state.bridges[payload.bridgeID],
            revisions: R.append(
              revision,
              state.bridges[payload.bridgeID].revisions
            ),
          },
        },
        interfaceSettings: {
          ...state.interfaceSettings,
          modal: {
            ...state.interfaceSettings.modal,
            selectedRevision: state.bridges[payload.bridgeID].revisions.length,
          },
        },
      };
    }

    case types.LOAD_ARRAY_BUFFER: {
      let q = {
        ...state,
        bridges: {
          ...state.bridges,
          [payload.bridgeID]: {
            ...state.bridges[payload.bridgeID],
            revisions: R.adjust(
              payload.revisionID,
              R.assoc("MIDI", payload.arrayBuffer),
              state.bridges[payload.bridgeID].revisions
            ),
          },
        },
      };
      return q;
    }

    case types.ADD_BLOCK: {
      return {
        ...state,
        blocks: [...state.blocks, action.payload],
      };
    }

    case types.ADD_TRACK: {
      const index = R.findIndex(R.propEq("id", payload.blockId), state.blocks);

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          {
            ...state.blocks[index],
            tracks: [...state.blocks[index].tracks, payload.track],
          },
          ...state.blocks.slice(index + 1),
        ],
      };
    }

    case types.SET_CURRENT_BRIDGE:
      return {
        ...state,
        bridges: {
          ...state.bridges,
          [state.interfaceSettings.modal.selectedBridge]: {
            ...state.bridges[state.interfaceSettings.modal.selectedBridge],
            currentRevision: payload.revisionID,
          },
        },
      };

    case types.SELECT_REVISION:
      return {
        ...state,
        interfaceSettings: {
          ...state.interfaceSettings,
          modal: {
            ...state.interfaceSettings.modal,
            selectedRevision: payload.revisionID,
          },
        },
      };

      case types.SET_TRANSITION_MODAL_OPEN:
        return {
          ...state,
          interfaceSettings: {
            ...state.interfaceSettings,
            modal: {
              ...state.interfaceSettings.modal,
              transModalOpen: payload.isOpen,
            },
          }
        };

    case types.SET_NEW_TRANSITION_MODAL_OPEN:
      return {
        ...state,
        interfaceSettings: {
          ...state.interfaceSettings,
          modal: {
            ...state.interfaceSettings.modal,
            newTransModalOpen: payload.isOpen,
          },
        }
      };

    case types.UPDATE_TRACK: {
      const index = R.findIndex(R.propEq("id", payload.blockId), state.blocks);

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          {
            ...state.blocks[index],
            tracks: [
              ...state.blocks[index].tracks.slice(0, payload.trackIndex),
              {
                ...state.blocks[index].tracks[payload.trackIndex],
                notes: payload.notes
              },
              ...state.blocks[index].tracks.slice(payload.trackIndex + 1)
            ]
          },
          ...state.blocks.slice(index + 1)
        ],
      };
    }

    case types.LOAD_INSTRUMENTS:
      return {
        ...state,
        instruments: {
          ...state.instruments,
          ...payload.instruments,
        },
      };
    case types.TEST_ACTION:
      console.log("HELLO WORLD!", payload, JSON.stringify(state)); // eslint disable no-fallthrough
    default:
      return state;
  }
}
