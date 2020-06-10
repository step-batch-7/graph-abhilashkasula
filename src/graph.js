//Example 
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to 
// Should return true.

const bfs = function (pairs, source, target) {
  const visited = [];
  const toVisit = [source];
  while (toVisit.length != 0) {
    const current = toVisit.shift();
    visited.push(current);
    if (current === target) return true;
    const sourcePairs = pairs.filter(pair => pair[0] === current);
    sourcePairs.forEach(pair => {
      !visited.includes(pair[1]) &&
        !toVisit.includes(pair[1]) &&
        toVisit.push(pair[1]);
    });
  }
  return false;
};

module.exports = {bfs};
