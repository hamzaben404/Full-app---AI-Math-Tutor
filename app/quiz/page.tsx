"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
// Imports des schémas et types
import { quizSchema, Question } from "@/lib/schemas";
// Imports des composants UI
import { toast } from "sonner";
import { FileUp, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Quiz from "@/components/quiz_components/components/quiz";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChatWithFiles() {
  // --- Section des États ---
  const [files, setFiles] = useState<File[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState<string>();
  const [questionCount, setQuestionCount] = useState(4);
  const [topic, setTopic] = useState("");

  // --- Hook useObject (Appel API principal) ---
  const {
    submit,
    object: partialQuiz,
    isLoading,
  } = useObject({
    api: "/api/generate-quiz",
    schema: quizSchema,
    initialValue: { title: "", questions: [] },
    onError: (error) => {
      toast.error("J'ai pas réussi à générer le Quiz, ré-essayes encore s'il vous plait.");
      setFiles([]);
    },
    onFinish: ({ object }) => {
      // Vérification pour s'assurer que le quiz a été généré
      if (object?.questions && object.questions.length > 0) {
        setQuestions(object.questions);
        setTitle(object.title ?? "Quiz");
      } else {
        toast.error("L'IA n'a pas pu générer de quiz. Essayez un autre fichier ou sujet.");
        setFiles([]);
      }
    },
  });

  // --- Fonctions de gestion des fichiers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isDragging) {
      toast.error(
        "Safari does not support drag & drop. Please use the file picker.",
      );
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024,
    );
    console.log(validFiles);

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Uniquement les fichiers avec une taille inférieur à 5MB sont autorisés.");
    }

    setFiles(validFiles);
  };

  const encodeFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await encodeFileAsBase64(file),
      })),
    );
    // Appel API unique
    submit({ files: encodedFiles, count: questionCount, topic: topic });
  };

  const clearPDF = () => {
    setFiles([]);
    setQuestions([]);
    setTitle(undefined);
  };

  // --- Calcul de la progression ---
  const progress = partialQuiz?.questions ? (partialQuiz.questions.length / questionCount) * 100 : 0;

  // --- Rendu conditionnel : Affiche le Quiz si les questions sont prêtes ---
  if (questions.length > 0) {
    return (
      <Quiz title={title ?? "Quiz"} questions={questions} clearPDF={clearPDF} />
    );
  }

  // --- Rendu principal : Formulaire de téléversement ---
  return (            
    
    <div
      className="min-h-[100dvh] w-full flex flex-col"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragExit={() => setIsDragging(false)}
      onDragEnd={() => setIsDragging(false)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange({
          target: { files: e.dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
    >

      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full relative">
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop tes fichiers ici</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(PDFs only)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="w-full max-w-lg h-fit border-0 sm:border shadow-2xl
                     backdrop-blur-md bg-white/95 dark:bg-zinc-900/90
                     border-white/20 dark:border-zinc-700/50">
        
        <CardHeader className="text-center space-y-4">
          
          <div className="flex justify-center">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-10" 
            />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Générateur de Quiz à partir de vos cours
            </CardTitle>
            <CardDescription className="text-base">
              Test ton niveau dans tes propres cours PDF
              <span className="text-blue-600 block">
                100% fidèle au programme Marocain.
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitWithFiles} className="space-y-4">
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors hover:border-muted-foreground/50`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center">
                {files.length > 0 ? (
                  <span className="font-medium text-foreground">
                    {files[0].name}
                  </span>
                ) : (
                  <span>Met ton cours ici, ou fais du drag and drop.</span>
                )}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-count">Nombre de questions (3-40)</Label>
              <Input
                id="question-count"
                type="number"
                value={questionCount}
                onChange={(e) => {
                  const count = Math.max(3, Math.min(40, Number(e.target.value) || 3));
                  setQuestionCount(count);
                }}
                min="3"
                max="40"
                className="w-full border border-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Sujet du Quiz (optionnel)</Label>
              <Input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: 'Le théorème de croissance continu' ou 'Chapitre 3'"
                className="border border-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient h-11 text-base font-semibold text-white"
              disabled={files.length === 0 || isLoading} 
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generation du Quiz...</span>
                </span>
              ) : (
                "Générer mon Quiz"
              )}
            </Button>
          </form>
        </CardContent>
        {isLoading && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progression</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="w-full space-y-2">
              <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isLoading ? "bg-yellow-500/50 animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                  {partialQuiz?.questions?.length
                    ? `Generating question ${partialQuiz.questions.length} of ${questionCount}`
                    : (partialQuiz?.title ? "Generating questions..." : "Generating title...")}
                </span>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
      </main>
    </div>
  );
}