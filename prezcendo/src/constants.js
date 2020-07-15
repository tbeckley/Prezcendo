export const GENRES = {
    JAZZ: 'jazz',
    ROCK: 'rock',
    BLUES: 'blues',
    POP: 'pop'
};

export const SCALE_NOTES = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
};

export const SCALE_TYPES = {
    FLAT: 0,
    NATRUAL: 1,
    SHARP: 2
};

export const DEFAULT_TRANSITION = {
    id: 0,
    prevBlockID: 0,
    nextBlockID: 0,
    currentParameters: {
        happySad:  0.5,
        simpleComplex: 0.5,
        duration: 5 // seconds
    },
    scale: [SCALE_NOTES.C, SCALE_TYPES.NATRUAL],
    previousBars: [], // TBD
    nextBars: [], // TBD
    revisions: [], // family tree / generations / children
    currentTransition: null,
};

export const DEFAULT_REVISION = {
    id: 0,
    param: {
        happySad:  0.5,
        simpleComplex: 0.5,
        duration: 5 // seconds
    },
    offspring: [], // midi files of offspring
    successfulChild: -1
};
