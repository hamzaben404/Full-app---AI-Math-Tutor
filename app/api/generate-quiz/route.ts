import {quizSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files, count, topic} = await req.json();
  const numQuestions = count || 4;
  const firstFile = files[0].data;

  // on construit le prompt selon le nombre de questions et le topic
  let systemprompt = `Vous êtes un enseignant. Votre tâche est de prendre un document et de créer un questionnaire à choix multiples (avec ${numQuestions} questions) basé sur le contenu du document. Chaque proposition de réponse doit être d'une longueur similaire.
 
  Pour CHAQUE question, vous DEVEZ également fournir une "justification" : une brève explication (en français) expliquant pourquoi la réponse correcte est bonne, en se basant sur le document.

  Instructions : 
  1- Ne pose pas de questions sur le nom de l'école, le nom du chapitre, le nom du prof ou de l'éleve, mais focalise toi sur le topic discuté
  2- Utilise la langue française pour toutes les questions et réponses.`

  if (topic){
    systemprompt += `\n\nL'utilisateur s'intéresse particulièrement au sujet suivant : "${topic}". Veuillez orienter les questions du quiz sur ce sujet. Si le sujet n'est pas trouvé dans le document, créez des questions générales.`
            }
  
  // --- End construction du prompt ---

  const result = streamObject({
    model: google("gemini-2.0-flash-lite"),
    messages: [
      {
        role: "system",
        content : systemprompt},
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Créez un quiz à choix multiples basé sur le document fourni.",
          },
          {
            type: "file",
            data: firstFile,
            mediaType: "application/pdf",
          },
        ],
      },
    ],
    schema: quizSchema,
    //output: "array",
    onFinish: ({ object }) => {
      const res = quizSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
