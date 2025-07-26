"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseQuizPage } from "@/components/pages/course-quiz";
import { Loader } from "@/components/ui/loader";
import { Quiz } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CourseQuizPageRouteProps = {
  slug: string;
  quizId: string;
};

export default function CourseQuizPageRoute() {
  const router = useRouter();
  const store = useAppStore();
  const [quiz, setQuiz] = useState<Quiz>();
  const [loading, setLoading] = useState<boolean>(false);
  const { slug, quizId } = useParams() as CourseQuizPageRouteProps;

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const quiz = await store.getQuiz(quizId);
      setQuiz(quiz);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (loading || !quiz) return <Loader isLoader={false} />;

  return (
    <DashboardLayout>
      <CourseQuizPage
        courseId={slug}
        onNavigate={handleNavigate}
        quiz={quiz}
        handleQuizSubmit={() => {}}
      />
    </DashboardLayout>
  );
}
