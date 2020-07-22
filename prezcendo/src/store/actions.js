import types from "./types";
import { getObjectFromArray, getInstrumentsToAdd } from "../helpers/midiHelper";
import { IdMaker } from "../helpers/unitHelper";

export default {
  testAction: (msg) => ({
    type: types.TEST_ACTION,
    payload: msg,
  }),
  delayedTestAction: (msg, timeout) => async (dispatch) =>
    setTimeout(
      () => dispatch({ type: types.TEST_ACTION, payload: msg }),
      timeout * 1000
    ),
  createRevision: (
    bridgeID,
    parameters = null
  ) => ({
    type: types.CREATE_REVISION,
    payload: {
      bridgeID,
      parameters,
    },
  }),
  setCurrentBridge: (revisionID) => ({
    type: types.SET_CURRENT_BRIDGE,
    payload: {
      revisionID,
    },
  }),
  setSelectedRevision: (revisionID) => ({
    type: types.SELECT_REVISION,
    payload: {
      revisionID,
    },
  }),
  setTransModalOpen: ( isOpen = false ) => ({
    type: types.SET_TRANSITION_MODAL_OPEN,
    payload: {
      isOpen
    }
  }),
  setNewTransModalOpen: ( isOpen = false ) => ({
    type: types.SET_NEW_TRANSITION_MODAL_OPEN,
    payload: {
      isOpen
    }
  }),
  addBlock: (name) => ({
    type: types.ADD_BLOCK,
    payload: {
      tracks: [],
      name,
      id: IdMaker(),
    },
  }),
  addTrack: (blockId, trackInfo) => ({
    type: types.ADD_TRACK,
    payload: {
      blockId,
      track: trackInfo,
    },
  }),
  handleMIDI: (bridgeID, revisionID, promiseToArrayBuffer) => async (
    dispatch,
    getState
  ) => {
    const arrayBuffer = await promiseToArrayBuffer;

    dispatch({
      type: types.LOAD_ARRAY_BUFFER,
      payload: {
        bridgeID,
        revisionID,
        arrayBuffer,
      },
    });

    dispatch({
      type: types.LOAD_INSTRUMENTS,
      payload: {
        instruments: getInstrumentsToAdd(
          getState().instruments,
          getObjectFromArray(arrayBuffer)
        ),
      },
    });
  },
  updateTrack: (blockId, trackIndex, notes) => ({
    type: types.UPDATE_TRACK,
    payload: {
      blockId,
      trackIndex,
      notes
    }
  })
};
