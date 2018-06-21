/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board ({n: n});
  var rooksLeft = n;
  
  var addPiece = function (row, col) {
    solution.togglePiece(row, col);
    rooksLeft--;
    if (solution.hasAnyRooksConflicts()) {
      solution.togglePiece(row,col);
      rooksLeft++;
    }
  };

  var backTrack = function (row, col) {
    for (var i = row; i < solution.rows().length; i++) {
      var column = solution.rows()[i];
      for (var j = col; j < column.length; j++) {
        if (rooksLeft > 0) {
          addPiece(i, j);
        }
      }
    }
  }

  backTrack(0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0; //fixme
  // var currentRow = 0;

  // var placeARook = function(freeColBits) {
  //   if(currentRow === n) {
  //     solutionCount++;
  //     currentRow--;
  //     return;
  //     //solved!
  //   }
  //   var remainingColBits = freeColBits;
  //   while(remainingColBits !== 0) {
  //     var freeSpotBit = remainingColBits & -remainingColBits;
  //     remainingColBits -= freeSpotBit;
  //     currentRow++;
  //     placeARook(freeColBits-freeSpotBit);
  //   }
  //   currentRow--;
  // }
  // placeARook(Math.pow(2, n)-1);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;

  var solutionCount = 0;
  var board = new Board ({n: n});

  var recurse = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if(!board.hasAnyRooksConflicts()) {
        recurse(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  recurse(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let board = new Board ({n: n});
  let solution = board.rows()

  var recurse = function (board, startRow, rows, callback) {
    if (startRow === rows) {
      return callback(board);
    }

    for (var i = 0; i < rows; i++) {
      board.togglePiece(startRow, i);
      if (!board.hasAnyQueensConflicts()) {
        var result = recurse(board, startRow + 1, rows, callback);
        if (result) return result
      }
      board.togglePiece(startRow, i);
    }
  }

  recurse(board, 0, n, function(board) {
    return solution = board.rows();
  })

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0;
  let board = new Board ({n: n});

  if (n === 2 || n === 3) return solutionCount;

  let recurse = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if(!board.hasAnyQueensConflicts()) {
        recurse(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
