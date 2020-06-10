const {assert} = require('chai');
const {bfs} = require('../src/graph');

describe('bfs', () => {
  it('should give false for the same source and target present in pairs', () => {
    const pairs = [[5, 6]];
    assert.isFalse(bfs(pairs, 5, 5));
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

  it('should give false for the path not found', () => {
    assert.isFalse(bfs([[5, 6], [6, 7], [6, 8]], 7, 8));
  });
});
