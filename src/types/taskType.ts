export interface Task{
  id: number,
  name: string,
  difficulty: Difficulty
}

export type Difficulty = "easy" | "medium" | "hard"

export const difficultyWeight = {
  hard: 3,
  medium: 2,
  easy: 1
} as const

