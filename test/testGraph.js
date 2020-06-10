const {assert} = require('chai');
const {bfs} = require('../src/graph');

describe('bfs', () => {
  it('should give true for the same source and target present in pairs', () => {
    const pairs = [[5, 6]];
    assert.isTrue(bfs(pairs, 5, 5));
  });
});
