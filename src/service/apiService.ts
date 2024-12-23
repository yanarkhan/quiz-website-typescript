import { shuffleArray } from "./utilsService";

/* Struktur data pertanyaan yang kita ambil dari API */
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };
/* answers: string[]: Properti tambahan untuk menyimpan daftar semua jawaban (baik benar maupun salah). */

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API base URL is not defined in .env");
  }

  const endPoint = `${baseUrl}?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid API response format");
    }

    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching questions:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
};
