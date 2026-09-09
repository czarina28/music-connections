// The 24-puzzle 1980s batch was initially numbered 101-124.
// Normalize it to follow Puzzle 050 sequentially.
PUZZLES.forEach((puzzle) => {
  if (puzzle.id >= 101 && puzzle.id <= 124) {
    puzzle.id -= 50;
    puzzle.title = `Puzzle ${String(puzzle.id).padStart(3, "0")}`;
  }
});
