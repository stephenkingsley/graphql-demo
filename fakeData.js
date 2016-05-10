const stephen = {
  id: '1000',
  name: 'Stephen Kingsley',
  hobby: ['2001', '2002', '2003'],
};

const tom = {
  id: '1001',
  name: 'Tom Curse',
  hobby: ['2001'],
};

const emma = {
  id: '1002',
  name: 'Emma Watson',
  hobby: ['2001', '2002'],
};

const cherry = {
  id: '1003',
  name: 'Cherry Swizland',
  hobby: ['2001', '2002'],
};

const xvideos = {
  id: '2001',
  name: 'xvideos',
  score: '21'
}

const upAndDown = {
  id: '2002',
  name: '千撸百撸',
  score: '21'
}

const sport = {
  id: '2003',
  name: 'sport',
  score: '21'
}

const humanData = {
  1000: stephen,
  1001: tom,
  1002: emma,
  1003: cherry,
};

const hobby = {
  2001: xvideos,
  2002: upAndDown,
  2003: sport
};

/**
 * Helper function to get hobby by id
*/
function getTheHumanHobby(id) {
  // Returning a promise just to illustrate GraphQL.js's support.
  return Promise.resolve(hobby[id]);
}

/**
 * Allows us to query for a human's hobby
*/
function getHobby(human) {
  return human.hobby.map(id => getTheHumanHobby(id));
}

/**
 * Helper us to get human by id
*/
function getHuman(id) {
  return humanData[id]
}

module.exports = {
  getHobby,
  getHuman
}
