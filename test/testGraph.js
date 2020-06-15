const {assert} = require('chai');
const {bfs, dfs, findPath} = require('../src/graph');

describe('bfs', () => {
  const pairs = [
    [ 'mm', 'cc' ], [ 'mm', 'kk' ], [ 'mm', 'hh' ],
    [ 'mm', 'll' ], [ 'aa', 'aa' ], [ 'aa', 'll' ],
    [ 'aa', 'ee' ], [ 'dd', 'aa' ], [ 'dd', 'dd' ],
    [ 'dd', 'ff' ], [ 'dd', 'gg' ], [ 'dd', 'kk' ],
    [ 'dd', 'hh' ], [ 'dd', 'll' ], [ 'ii', 'ff' ],
    [ 'ii', 'bb' ], [ 'ii', 'kk' ], [ 'ff', 'mm' ],
    [ 'ff', 'ii' ], [ 'ff', 'ff' ], [ 'ff', 'cc' ],
    [ 'ff', 'kk' ], [ 'ff', 'll' ], [ 'bb', 'aa' ],
    [ 'bb', 'bb' ], [ 'gg', 'cc' ], [ 'gg', 'hh' ],
    [ 'gg', 'ee' ], [ 'cc', 'ff' ], [ 'cc', 'bb' ],
    [ 'cc', 'gg' ], [ 'cc', 'cc' ], [ 'cc', 'll' ],
    [ 'cc', 'ee' ], [ 'kk', 'mm' ], [ 'kk', 'aa' ],
    [ 'kk', 'dd' ], [ 'kk', 'bb' ], [ 'kk', 'ee' ],
    [ 'hh', 'dd' ], [ 'hh', 'gg' ], [ 'hh', 'hh' ],
    [ 'hh', 'ee' ], [ 'jj', 'mm' ], [ 'jj', 'dd' ],
    [ 'jj', 'gg' ], [ 'jj', 'kk' ], [ 'jj', 'hh' ],
    [ 'jj', 'jj' ], [ 'jj', 'll' ], [ 'll', 'ff' ],
    [ 'll', 'bb' ], [ 'ee', 'aa' ], [ 'ee', 'ii' ],
    [ 'ee', 'gg' ], [ 'ee', 'cc' ], [ 'ee', 'kk' ],
    [ 'ee', 'hh' ], [ 'ee', 'ee' ]
  ];

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

  it('should give false for two nodes not connected', () => {
    assert.isFalse(bfs([[5, 5], [6, 6]], 5, 6));
  });

  it('should give true for the path found with in two pairs', () => {
    assert.isTrue(bfs([[5, 6], [6, 7]], 5, 7));
  });

  it('should give true for the path found with in three pairs', () => {
    assert.isTrue(bfs([[5, 6], [6, 7], [6, 8]], 5, 8));
  });

  it('should give false for source doesn\'t have outgoing edges', () => {
    assert.isFalse(bfs([[5, 6], [6, 7], [6, 8]], 7, 8));
  });

  it('should give false for target doesn\'t have source\'s outgoing edge', () => {
    assert.isFalse(bfs([[5, 6], [6, 7], [8, 8]], 5, 8));
  });

  it('should give false for path not found for 13 nodes', () => {
    assert.isFalse(bfs(pairs, 'bb', 'jj'));
  });

  it('should give true for path found for 13 nodes', () => {
    assert.isTrue(bfs(pairs, 'jj', 'aa'));
  });

  it('should give false for source or target not present', () => {
    assert.isFalse(bfs([[5, 6]], 5, 8));
    assert.isFalse(bfs([[5, 6]], 8, 6));
  });
});

describe('dfs', () => {
  it('should give false for node is not connected to itself', () => {
    assert.isFalse(dfs({'5': [6]}, 5, 5, new Set));
  });

  it('should give true for node is connected to itself', () => {
    assert.isTrue(dfs({'5': [5]}, 5, 5, new Set));
  });

  it('should give true for node is connected to another is same pair', () => {
    assert.isTrue(dfs({'5': [6]}, 5, 6, new Set));
  });

  it('should give false for two nodes not connect in two pairs', () => {
    assert.isFalse(dfs({'5': [6], '7': [8]}, 5, 7, new Set));
  });

  it('should give true for path found  in three pairs', () => {
    assert.isTrue(dfs({'5': [6], '6': [7], '7': [8]}, 5, 8, new Set));
  });

  it('should give false for target doesn\'t have source outgoing edge', () => {
    assert.isFalse(dfs({'5': [6], '6': [7], '8': [9]}, 5, 9, new Set));
  });

  it('should give true for all the nodes having circular dependency', () => {
    assert.isTrue(dfs({'1': [2], '2': [3], '3': [4], '4': [1]}, 4, 3, new Set));
  });
});

describe('findPath', () => {
  it('should give empty array for the node not connected to itself', () => {
    assert.deepStrictEqual(findPath({'5': [6]}, 5, 5, new Set()), []);
  });

  it('should give array with source and target for the node connected to itself', () => {
    assert.deepStrictEqual(findPath({'5': [5]}, 5, 5, new Set()), [5, 5]);
  });

  it('should give array with source and target for the node connected to target in same pair', () => {
    assert.deepStrictEqual(findPath({'5': [6]}, 5, 6, new Set()), [5, 6]);
  });

  it('should give empty array for source and target are not connected in two pairs', () => {
    assert.deepStrictEqual(findPath({'5': [6], '7': [8]}, 5, 8, new Set()), []);
  });

  it('should give path for source and target are not connected in three pairs', () => {
    assert.deepStrictEqual(findPath({'5': [6], '6': [7], '7': [8]}, 5, 8, new Set()), [5, 6, 7, 8]);
  });

  it('should give path for source and target are in circular dependency', () => {
    assert.deepStrictEqual(findPath({'5': [6], '6': [7], '7': [5]}, 7, 6, new Set()), [7, 5, 6]);
  });

  it('should give empty array for the target or source not in graph', () => {
    assert.deepStrictEqual(findPath({'5': [6]}, 5, 7, new Set()), []);
    assert.deepStrictEqual(findPath({'5': [6]}, 4, 6, new Set()), []);
  });
});
