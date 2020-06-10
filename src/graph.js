//Example 
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to 
// Should return true.

const bfs = function (pairs, source, target) {
  const visited = [];
  const toVisit = [source];
  let isFound = false;
  while (toVisit.length != 0) {
    const current = toVisit.shift();
    visited.push(current);
    if (current === target) {
      isFound = true;
      break;
    }
    const sourcePair = pairs.find((pair) => pair[0] === current);
    if (sourcePair) {
      !visited.includes(sourcePair[1]) &&
        !toVisit.includes(sourcePair[1]) &&
        toVisit.push(sourcePair[1]);
    }
  }
  return isFound;
};

module.exports = {bfs};
