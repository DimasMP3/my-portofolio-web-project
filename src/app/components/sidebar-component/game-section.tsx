"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Play, Pause, RotateCcw, Trophy, Zap, Grid3X3, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Gamepad2 } from "lucide-react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }
type GameType = "snake" | "2048"

type Grid2048 = number[][]

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const GAME_SPEED = 150

const GRID_2048_SIZE = 4
const INITIAL_2048_GRID = Array(GRID_2048_SIZE)
  .fill(null)
  .map(() => Array(GRID_2048_SIZE).fill(0))

export function GameSection() {
  const [selectedGame, setSelectedGame] = useState<GameType>("snake")
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const titleText = "Fun Game Zone"

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === titleText) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false)
      } else {
        setDisplayedText(prev => 
          isDeleting 
            ? prev.slice(0, -1) 
            : titleText.slice(0, prev.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting])

  // Snake game states
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const [grid2048, setGrid2048] = useState<Grid2048>(INITIAL_2048_GRID)
  const [score2048, setScore2048] = useState(0)
  const [highScore2048, setHighScore2048] = useState(0)
  const [gameOver2048, setGameOver2048] = useState(false)

  const addRandomTile = useCallback((grid: Grid2048) => {
    const emptyCells: Position[] = []
    for (let i = 0; i < GRID_2048_SIZE; i++) {
      for (let j = 0; j < GRID_2048_SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ x: i, y: j })
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      const newGrid = grid.map((row) => [...row])
      newGrid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4
      return newGrid
    }
    return grid
  }, [])

  const initializeGrid2048 = useCallback(() => {
    let newGrid = INITIAL_2048_GRID.map((row) => [...row])
    newGrid = addRandomTile(newGrid)
    newGrid = addRandomTile(newGrid)
    return newGrid
  }, [addRandomTile])

  const move2048 = useCallback(
    (direction: Direction) => {
      if (gameOver2048) return

      let newGrid = grid2048.map((row) => [...row])
      let moved = false
      let newScore = score2048

      const moveLeft = (grid: Grid2048) => {
        for (let i = 0; i < GRID_2048_SIZE; i++) {
          const row = grid[i].filter((val) => val !== 0)
          for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
              row[j] *= 2
              newScore += row[j]
              row[j + 1] = 0
            }
          }
          const newRow = row.filter((val) => val !== 0)
          while (newRow.length < GRID_2048_SIZE) {
            newRow.push(0)
          }
          if (JSON.stringify(grid[i]) !== JSON.stringify(newRow)) {
            moved = true
          }
          grid[i] = newRow
        }
      }

      const rotateGrid = (grid: Grid2048) => {
        const rotated = Array(GRID_2048_SIZE)
          .fill(null)
          .map(() => Array(GRID_2048_SIZE).fill(0))
        for (let i = 0; i < GRID_2048_SIZE; i++) {
          for (let j = 0; j < GRID_2048_SIZE; j++) {
            rotated[j][GRID_2048_SIZE - 1 - i] = grid[i][j]
          }
        }
        return rotated
      }

      switch (direction) {
        case "LEFT":
          moveLeft(newGrid)
          break
        case "RIGHT":
          newGrid = rotateGrid(rotateGrid(newGrid))
          moveLeft(newGrid)
          newGrid = rotateGrid(rotateGrid(newGrid))
          break
        case "UP":
          newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)))
          moveLeft(newGrid)
          newGrid = rotateGrid(newGrid)
          break
        case "DOWN":
          newGrid = rotateGrid(newGrid)
          moveLeft(newGrid)
          newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)))
          break
      }

      if (moved) {
        newGrid = addRandomTile(newGrid)
        setGrid2048(newGrid)
        setScore2048(newScore)

        // Check for game over
        const hasEmptyCell = newGrid.some((row) => row.some((cell) => cell === 0))
        const canMove = newGrid.some((row, i) =>
          row.some((cell, j) => {
            if (cell === 0) return true
            if (i > 0 && newGrid[i - 1][j] === cell) return true
            if (i < GRID_2048_SIZE - 1 && newGrid[i + 1][j] === cell) return true
            if (j > 0 && newGrid[i][j - 1] === cell) return true
            if (j < GRID_2048_SIZE - 1 && newGrid[i][j + 1] === cell) return true
            return false
          }),
        )

        if (!hasEmptyCell && !canMove) {
          setGameOver2048(true)
        }
      }
    },
    [grid2048, score2048, gameOver2048, addRandomTile],
  )

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    return newFood
  }, [])

  // Move snake
  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, isPlaying, gameOver, food, generateFood])

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver && selectedGame === "snake") {
      const gameInterval = setInterval(moveSnake, GAME_SPEED)
      return () => clearInterval(gameInterval)
    }
  }, [isPlaying, gameOver, moveSnake, selectedGame])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedGame === "snake" && isPlaying) {
        switch (e.key) {
          case "ArrowUp":
            if (direction !== "DOWN") setDirection("UP")
            break
          case "ArrowDown":
            if (direction !== "UP") setDirection("DOWN")
            break
          case "ArrowLeft":
            if (direction !== "RIGHT") setDirection("LEFT")
            break
          case "ArrowRight":
            if (direction !== "LEFT") setDirection("RIGHT")
            break
        }
      } else if (selectedGame === "2048") {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault()
            move2048("UP")
            break
          case "ArrowDown":
            e.preventDefault()
            move2048("DOWN")
            break
          case "ArrowLeft":
            e.preventDefault()
            move2048("LEFT")
            break
          case "ArrowRight":
            e.preventDefault()
            move2048("RIGHT")
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, isPlaying, selectedGame, move2048])

  // Update high scores
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  useEffect(() => {
    if (score2048 > highScore2048) {
      setHighScore2048(score2048)
    }
  }, [score2048, highScore2048])

  useEffect(() => {
    setGrid2048(initializeGrid2048())
  }, [initializeGrid2048])

  const startGame = () => {
    if (selectedGame === "snake") {
      setIsPlaying(true)
      setGameOver(false)
    }
  }

  const pauseGame = () => {
    setIsPlaying(false)
  }

  const resetGame = () => {
    if (selectedGame === "snake") {
      setSnake(INITIAL_SNAKE)
      setFood(INITIAL_FOOD)
      setDirection("RIGHT")
      setIsPlaying(false)
      setScore(0)
      setGameOver(false)
    } else if (selectedGame === "2048") {
      setGrid2048(initializeGrid2048())
      setScore2048(0)
      setGameOver2048(false)
    }
  }

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      0: "bg-slate-700",
      2: "bg-slate-600 text-white",
      4: "bg-slate-500 text-white",
      8: "bg-orange-600 text-white",
      16: "bg-orange-500 text-white",
      32: "bg-red-600 text-white",
      64: "bg-red-500 text-white",
      128: "bg-yellow-600 text-white",
      256: "bg-yellow-500 text-white",
      512: "bg-green-600 text-white",
      1024: "bg-green-500 text-white",
      2048: "bg-blue-600 text-white",
    }
    return colors[value] || "bg-purple-600 text-white"
  }

  return (
    <section id="game" className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-mono">
            <span className="font-mono">
              {displayedText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Take a break and play some classic games! Use arrow keys to control.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setSelectedGame("snake")}
            variant={selectedGame === "snake" ? "default" : "outline"}
            className={
              selectedGame === "snake"
                ? "bg-green-600 hover:bg-green-700"
                : "border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
            }
          >
            <Gamepad2 className="h-4 w-4 mr-2" />
            Snake
          </Button>
          <Button
            onClick={() => setSelectedGame("2048")}
            variant={selectedGame === "2048" ? "default" : "outline"}
            className={
              selectedGame === "2048"
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
            }
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            2048
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Game Board */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-200">
                {selectedGame === "snake" ? (
                  <>
                    <Gamepad2 className="h-5 w-5 text-green-400" />
                    Snake Game
                  </>
                ) : (
                  <>
                    <Grid3X3 className="h-5 w-5 text-blue-400" />
                    2048 Game
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full max-w-[400px] mx-auto aspect-square">
                {selectedGame === "snake" ? (
                  /* Snake Game Grid */
                  <div
                    className="grid bg-slate-800 border-2 border-slate-600 rounded-lg p-1 w-full h-full"
                    style={{
                      gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    }}
                  >
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                      const x = index % GRID_SIZE
                      const y = Math.floor(index / GRID_SIZE)
                      const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
                      const isHead = snake[0]?.x === x && snake[0]?.y === y
                      const isFood = food.x === x && food.y === y

                      return (
                        <div
                          key={index}
                          className={`border border-slate-700/30 ${
                            isSnake
                              ? isHead
                                ? "bg-green-400 shadow-lg shadow-green-400/50"
                                : "bg-green-500"
                              : isFood
                                ? "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"
                                : "bg-slate-800"
                          } transition-all duration-100`}
                        />
                      )
                    })}
                  </div>
                ) : (
                  /* 2048 Game Grid */
                  <div className="grid grid-cols-4 gap-2 bg-slate-800 border-2 border-slate-600 rounded-lg p-2 w-full h-full">
                    {grid2048.flat().map((value, index) => (
                      <div
                        key={index}
                        className={`rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-200 ${getTileColor(
                          value,
                        )}`}
                      >
                        {value !== 0 && value}
                      </div>
                    ))}
                  </div>
                )}

                {/* Game Over Overlay */}
                {((selectedGame === "snake" && gameOver) || (selectedGame === "2048" && gameOver2048)) && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                      <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                      <p className="text-lg mb-4">Final Score: {selectedGame === "snake" ? score : score2048}</p>
                      <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
                        Play Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Game Controls & Stats */}
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-200">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400 font-mono">
                      {selectedGame === "snake" ? score : score2048}
                    </p>
                    <p className="text-sm text-muted-foreground">Current</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400 font-mono">
                      {selectedGame === "snake" ? highScore : highScore2048}
                    </p>
                    <p className="text-sm text-muted-foreground">Best</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-200">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedGame === "snake" ? (
                    <div className="flex gap-2">
                      {!isPlaying ? (
                        <Button onClick={startGame} className="flex-1 bg-green-600 hover:bg-green-700">
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      ) : (
                        <Button onClick={pauseGame} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button
                        onClick={resetGame}
                        variant="outline"
                        className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        New Game
                      </Button>

                      {/* Arrow key controls for 2048 */}
                      <div className="grid grid-cols-3 gap-2 max-w-32 mx-auto">
                        <div></div>
                        <Button
                          onClick={() => move2048("UP")}
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <div></div>
                        <Button
                          onClick={() => move2048("LEFT")}
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => move2048("DOWN")}
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => move2048("RIGHT")}
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground space-y-2">
                    <p className="font-semibold">How to play:</p>
                    {selectedGame === "snake" ? (
                      <ul className="space-y-1 text-xs">
                        <li>• Use arrow keys to control the snake</li>
                        <li>• Eat the red food to grow and score points</li>
                        <li>• Avoid hitting walls or yourself</li>
                        <li>• Try to beat your high score!</li>
                      </ul>
                    ) : (
                      <ul className="space-y-1 text-xs">
                        <li>• Use arrow keys to move tiles</li>
                        <li>• Combine tiles with same numbers</li>
                        <li>• Try to reach the 2048 tile</li>
                        <li>• Game ends when no moves are possible</li>
                      </ul>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
