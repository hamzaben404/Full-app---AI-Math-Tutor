import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths.",
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on.",
    ),

  justification: z
    .string()
    .describe(
      "Une brève explication (en français) de pourquoi la réponse est correcte ou fausse, basée sur le document."
    )
});

export type Question = z.infer<typeof questionSchema>;

/*export const questionsSchema = z.array(questionSchema).length(4)*/
export const questionsSchema = z.array(questionSchema).min(1);

// Le schéma complet du Quiz
export const quizSchema = z.object({
  title: z
    .string()
    .describe(
      "Un titre concis et pertinent pour le quiz.",
    ),
  questions: questionsSchema.describe(
    "Une liste de questions à choix multiples.",
  ),
});

export type QuizData = z.infer<typeof quizSchema>;
