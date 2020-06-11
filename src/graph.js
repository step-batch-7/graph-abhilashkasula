//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.

const parse = (pairs) => {
  return pairs.reduce((graph, [key, val]) => {
    if (key in graph) {
      graph[key].push(val);
      return graph;
    }
    graph[key] = [val];
    return graph;
  }, {});
};

const bfs = function (pairs, source, target) {
  const graph = parse(pairs);
  const visited = [];
  const toVisit = graph[source] ? graph[source].slice() : [];
  while (toVisit.length) {
    const current = toVisit.shift();
    visited.push(current);
    if (current === target) return true;
    const edges = graph[current];
    edges && edges.forEach(edge =>
          !visited.includes(edge) &&
          !toVisit.includes(edge) &&
          toVisit.push(edge));
  }
  return false;
};

module.exports = {bfs};
