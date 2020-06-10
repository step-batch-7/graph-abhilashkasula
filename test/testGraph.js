const {assert} = require('chai');
const {bfs} = require('../src/graph');

describe('bfs', () => {
  it('should give false for the same source and target when the node doesn\'t have the same node edge ', () => {
    const pairs = [[5, 6]];
    assert.isFalse(bfs(pairs, 5, 5));
  });

  it('should give true for the same source and target when the node has the same node edge ', () => {
    const pairs = [[5, 5]];
    assert.isTrue(bfs(pairs, 5, 5));
  });

  it('should give true for the source and the target present in same pair', () => {
    assert.isTrue(bfs([[5, 6]], 5, 6));
  });

  it('should give true for the path found with in two pairs', () => {
    assert.isTrue(bfs([[5, 6], [6, 7]], 5, 7));
  });

  it('should give true for the path found with in three pairs', () => {
    assert.isTrue(bfs([[5, 6], [6, 7], [6, 8]], 5, 8));
  });

  it('should give false for the path not found between two nodes', () => {
    assert.isFalse(bfs([[5, 6], [6, 7], [6, 8]], 7, 8));
  });
});
