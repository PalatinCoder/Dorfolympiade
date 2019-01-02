export const ADD_SCORE = 'ADD_SCORE';

export const addScore = ({ id, score }) => {
    const player = getPlayer(id);
    return {
        type: ADD_SCORE,
        score: [ player.name, player.group, score ]
    }
};

const getPlayer = (id) => {
    if (id == '1234-abcd') {
        return { name: 'Hugo', group: 'Wurscht' };
    }
    return { name: id, group: '-' }
}

