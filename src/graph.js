//Example 
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to 
// Should return true.

const getEdges = (pairs, node) => pairs.filter(pair => pair[0] === node);

const bfs = function (pairs, source, target) {
  const visited = [source];
  const toVisit = getEdges(pairs, source).map(pair => pair[1]);
  while (toVisit.length != 0) {
    const current = toVisit.shift();
    visited.push(current);
    if (current === target) return true;
    const sourcePairs = getEdges(pairs, current);
    sourcePairs.forEach((pair) => {
      !visited.includes(pair[1]) &&
        !toVisit.includes(pair[1]) &&
        toVisit.push(pair[1]);
    });
  }
  return false;
};

module.exports = {bfs};
