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
  const visited = new Set();
  const toVisit = graph[source] ? graph[source].slice() : [];
  while (toVisit.length) {
    const current = toVisit.shift();
    visited.add(current);
    if (current === target) return true;
    const edges = graph[current];
    edges && edges.forEach(edge =>
          !visited.has(edge) &&
          !toVisit.includes(edge) &&
          toVisit.push(edge));
  }
  return false;
};

const dfs = function(graph, source, target, visited) {
  const edges = graph[source] || [];
  visited.add(source);
  if(edges.includes(target)) return true;
  const nonVisitedEdges = edges.filter(edge => !visited.has(edge));
  return nonVisitedEdges.some(edge => dfs(graph, edge, target, visited));
};

const findPath = function(graph, source, target, visited) {
  const edges = graph[source] || [];
  visited.add(source);
  if(edges.includes(target)) {
    return [source, target];
  }
  const nonVisitedEdges = edges.filter(edge => !visited.has(edge));
  return nonVisitedEdges.reduce((path, edge) => {
    const subPath = findPath(graph, edge, target, visited);
    if(subPath.length) {
      return [source].concat(subPath);
    }
    return path;
  }, []);
};

module.exports = {bfs, dfs, findPath};
