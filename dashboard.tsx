"use client";
import { useRouter, usePathname } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";
import { CoursesPage } from "@/components/pages/courses";
import { CourseDetailPage } from "@/components/pages/course-detail";
import { CoursePreviewPage } from "@/components/pages/course-preview";
import { CourseWatchPage } from "@/components/pages/course-watch";
import { CourseQuizzesPage } from "@/components/pages/course-quizzes";
import { CourseQuizPage } from "@/components/pages/course-quiz";
import { CourseExercisesPage } from "@/components/pages/course-exercises";
import { CourseExercisePage } from "@/components/pages/course-exercise";
import { CoursePlaygroundsPage } from "@/components/pages/course-playgrounds";
import { CoursePlaygroundPage } from "@/components/pages/course-playground";
import { CourseProjectsPage } from "@/components/pages/course-projects";
import { CourseProjectPage } from "@/components/pages/course-project";
import { CourseCertificatePage } from "@/components/pages/course-certificate";
import { RoadmapsPage } from "@/components/pages/roadmaps";
import { RoadmapDetailPage } from "@/components/pages/roadmap-detail";
import { RoadmapWatchPage } from "@/components/pages/roadmap-watch";
import { RoadmapVideoWatchPage } from "@/components/pages/roadmap-video-watch";
import { RoadmapCoursePreviewPage } from "@/components/pages/roadmap-course-preview";
import { RoadmapCourseWatchPage } from "@/components/pages/roadmap-course-watch";
import { RoadmapCourseQuizzesPage } from "@/components/pages/roadmap-course-quizzes";
import { RoadmapCourseQuizPage } from "@/components/pages/roadmap-course-quiz";
import { RoadmapCourseExercisesPage } from "@/components/pages/roadmap-course-exercises";
import { RoadmapCourseExercisePage } from "@/components/pages/roadmap-course-exercise";
import { RoadmapCoursePlaygroundsPage } from "@/components/pages/roadmap-course-playgrounds";
import { RoadmapCoursePlaygroundPage } from "@/components/pages/roadmap-course-playground";
import { RoadmapCourseProjectsPage } from "@/components/pages/roadmap-course-projects";
import { RoadmapCourseProjectPage } from "@/components/pages/roadmap-course-project";
import { LearningPathsPage } from "@/components/pages/learning-paths";
import { LearningPathDetailPage } from "@/components/pages/learning-path-detail";
import { LearningPathContinuePage } from "@/components/pages/learning-path-continue";
import { PathContentWatchPage } from "@/components/pages/path-content-watch";
import { BootcampsPage } from "@/components/pages/bootcamps";
import { BootcampDetailPage } from "@/components/pages/bootcamp-detail";
import { BootcampDashboardPage } from "@/components/pages/bootcamp-dashboard";
import { BootcampWeekPage } from "@/components/pages/bootcamp-week";
import { Project30Page } from "@/components/pages/project30";
import { Project30ListingPage } from "@/components/pages/project30-listing";
import { Project30DayPage } from "@/components/pages/project30-day";
import { Project30CommunityPage } from "@/components/pages/project30-community";
import { Project30LeaderboardPage } from "@/components/pages/project30-leaderboard";
import { ProjectsPage } from "@/components/pages/projects";
import { ProjectDetailPage } from "@/components/pages/project-detail";
import { LandsPage } from "@/components/pages/lands";
import { LandDetailPage } from "@/components/pages/land-detail";
import { StageDetailPage } from "@/components/pages/stage-detail";
import { ChallengeDetailPage } from "@/components/pages/challenge-detail";
import { InterviewsPage } from "@/components/pages/interviews";
import { InterviewDetailPage } from "@/components/pages/interview-detail";
import { InterviewProjectPage } from "@/components/pages/interview-project";
import { InterviewAlgorithmPage } from "@/components/pages/interview-algorithm";
import { InterviewResultsPage } from "@/components/pages/interview-results";
import { MockInterviewsPage } from "@/components/pages/mock-interviews";
import { MockInterviewSessionPage } from "@/components/pages/mock-interview-session";
import { MockInterviewResultsPage } from "@/components/pages/mock-interview-results";
import { CommunityPage } from "@/components/pages/community";
import { SubscriptionPlansPage } from "@/components/pages/subscription-plans";
import { SubscriptionManagementPage } from "@/components/pages/subscription-management";
import { CheckoutPage } from "@/components/pages/checkout";
import { XpRedemptionPage } from "@/components/pages/xp-redemption";
import { ProfilePage } from "@/components/pages/profile";
import { SettingsPage } from "@/components/pages/settings";
import { routes } from "@/lib/routes";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const renderContent = () => {
    console.log("Current path:", pathname);

    // Profile
    if (pathname === "/dashboard/profile") {
      return <ProfilePage onNavigate={handleNavigate} />;
    }

    // Settings
    if (pathname === "/dashboard/settings") {
      return <SettingsPage onNavigate={handleNavigate} />;
    }

    // XP Store
    if (pathname === "/dashboard/xp-store") {
      return <XpRedemptionPage onNavigate={handleNavigate} />;
    }

    // Courses
    if (pathname === routes.courses) {
      return <CoursesPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.includes("/preview")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CoursePreviewPage courseId={courseId} onNavigate={handleNavigate} />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.includes("/watch/")
    ) {
      const parts = pathname.split("/");
      const courseId = parts[3];
      const chapterId = parts[5];
      return (
        <CourseWatchPage
          courseId={courseId}
          chapterId={chapterId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.includes("/quizzes/") &&
      pathname.split("/").length === 6
    ) {
      const parts = pathname.split("/");
      const courseId = parts[3];
      const quizId = parts[5];
      return (
        <CourseQuizPage
          courseId={courseId}
          quizId={quizId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.endsWith("/quizzes")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CourseQuizzesPage courseId={courseId} onNavigate={handleNavigate} />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.includes("/exercises/") &&
      pathname.split("/").length === 6
    ) {
      const parts = pathname.split("/");
      const courseId = parts[3];
      const exerciseId = parts[5];
      return (
        <CourseExercisePage
          courseId={courseId}
          exerciseId={exerciseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.endsWith("/exercises")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CourseExercisesPage courseId={courseId} onNavigate={handleNavigate} />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.includes("/playgrounds/") &&
      pathname.split("/").length === 6
    ) {
      const parts = pathname.split("/");
      const courseId = parts[3];
      const playgroundId = parts[5];
      return (
        <CoursePlaygroundPage
          courseId={courseId}
          playgroundId={playgroundId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.endsWith("/playgrounds")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CoursePlaygroundsPage
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.includes("/projects/") &&
      pathname.split("/").length === 6
    ) {
      const parts = pathname.split("/");
      const courseId = parts[3];
      const projectId = parts[5];
      return (
        <CourseProjectPage
          courseId={courseId}
          projectId={projectId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.endsWith("/projects")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CourseProjectsPage courseId={courseId} onNavigate={handleNavigate} />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.endsWith("/certificate")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CourseCertificatePage
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/courses/") &&
      pathname.split("/").length === 4
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <CourseDetailPage courseId={courseId} onNavigate={handleNavigate} />
      );
    }

    // Roadmaps
    if (pathname === routes.roadmaps) {
      console.log("asa");
      return <RoadmapsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.endsWith("/watch")
    ) {
      const roadmapId = pathname.split("/")[3];
      return (
        <RoadmapWatchPage roadmapId={roadmapId} onNavigate={handleNavigate} />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/video/")
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const videoId = parts[5];
      return (
        <RoadmapVideoWatchPage
          roadmapId={roadmapId}
          videoId={videoId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.includes("/watch/")
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      const chapterId = parts[7];
      return (
        <RoadmapCourseWatchPage
          roadmapId={roadmapId}
          courseId={courseId}
          chapterId={chapterId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.includes("/quizzes/") &&
      pathname.split("/").length === 8
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      const quizId = parts[7];
      return (
        <RoadmapCourseQuizPage
          roadmapId={roadmapId}
          courseId={courseId}
          quizId={quizId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.endsWith("/quizzes")
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      return (
        <RoadmapCourseQuizzesPage
          roadmapId={roadmapId}
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.includes("/exercises/") &&
      pathname.split("/").length === 8
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      const exerciseId = parts[7];
      return (
        <RoadmapCourseExercisePage
          roadmapId={roadmapId}
          courseId={courseId}
          exerciseId={exerciseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.endsWith("/exercises")
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      return (
        <RoadmapCourseExercisesPage
          roadmapId={roadmapId}
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.includes("/playgrounds/") &&
      pathname.split("/").length === 8
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      const playgroundId = parts[7];
      return (
        <RoadmapCoursePlaygroundPage
          roadmapId={roadmapId}
          courseId={courseId}
          playgroundId={playgroundId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.endsWith("/playgrounds")
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      return (
        <RoadmapCoursePlaygroundsPage
          roadmapId={roadmapId}
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.includes("/projects/") &&
      pathname.split("/").length === 8
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      const projectId = parts[7];
      return (
        <RoadmapCourseProjectPage
          roadmapId={roadmapId}
          courseId={courseId}
          projectId={projectId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.endsWith("/projects")
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      return (
        <RoadmapCourseProjectsPage
          roadmapId={roadmapId}
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.includes("/courses/") &&
      pathname.split("/").length === 6
    ) {
      const parts = pathname.split("/");
      const roadmapId = parts[3];
      const courseId = parts[5];
      return (
        <RoadmapCoursePreviewPage
          roadmapId={roadmapId}
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/roadmaps/") &&
      pathname.split("/").length === 4
    ) {
      const roadmapId = pathname.split("/")[3];
      return (
        <RoadmapDetailPage roadmapId={roadmapId} onNavigate={handleNavigate} />
      );
    }

    // Learning Paths
    if (pathname === routes.paths) {
      return <LearningPathsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/paths/") &&
      pathname.endsWith("/continue")
    ) {
      const pathId = pathname.split("/")[3];
      return (
        <LearningPathContinuePage pathId={pathId} onNavigate={handleNavigate} />
      );
    }

    if (
      pathname.startsWith("/dashboard/paths/") &&
      pathname.includes("/watch/")
    ) {
      const parts = pathname.split("/");
      const pathId = parts[3];
      const stepId = parts[5];
      return (
        <PathContentWatchPage
          pathId={pathId}
          stepId={stepId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/paths/") &&
      pathname.split("/").length === 4
    ) {
      const pathId = pathname.split("/")[3];
      return (
        <LearningPathDetailPage pathId={pathId} onNavigate={handleNavigate} />
      );
    }

    // Bootcamps
    if (pathname === routes.bootcamps) {
      return <BootcampsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/bootcamps/") &&
      pathname.endsWith("/dashboard")
    ) {
      const bootcampId = pathname.split("/")[3];
      return (
        <BootcampDashboardPage
          bootcampId={bootcampId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/bootcamps/") &&
      pathname.includes("/week/")
    ) {
      const parts = pathname.split("/");
      const bootcampId = parts[3];
      const weekId = parts[5];
      return (
        <BootcampWeekPage
          bootcampId={bootcampId}
          weekId={weekId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/bootcamps/") &&
      pathname.split("/").length === 4
    ) {
      const bootcampId = pathname.split("/")[3];
      return (
        <BootcampDetailPage
          bootcampId={bootcampId}
          onNavigate={handleNavigate}
        />
      );
    }

    // Project30
    if (pathname === routes.project30) {
      return <Project30ListingPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/project30/") &&
      pathname.includes("/day/")
    ) {
      const parts = pathname.split("/");
      const courseId = parts[3];
      const dayNumber = parts[5];
      return (
        <Project30DayPage
          courseId={courseId}
          dayNumber={dayNumber}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/project30/") &&
      pathname.endsWith("/community")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <Project30CommunityPage
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/project30/") &&
      pathname.endsWith("/leaderboard")
    ) {
      const courseId = pathname.split("/")[3];
      return (
        <Project30LeaderboardPage
          courseId={courseId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/project30/") &&
      pathname.split("/").length === 4
    ) {
      const courseId = pathname.split("/")[3];
      return <Project30Page courseId={courseId} onNavigate={handleNavigate} />;
    }

    // Projects
    if (pathname === routes.projects) {
      return <ProjectsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/projects/") &&
      pathname.split("/").length === 4
    ) {
      const projectId = pathname.split("/")[3];
      return (
        <ProjectDetailPage projectId={projectId} onNavigate={handleNavigate} />
      );
    }

    // MB Lands
    if (pathname === routes.lands) {
      return <LandsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/lands/") &&
      pathname.includes("/stages/") &&
      pathname.includes("/challenges/")
    ) {
      const parts = pathname.split("/");
      const landId = parts[3];
      const stageId = parts[5];
      const challengeId = parts[7];
      return (
        <ChallengeDetailPage
          landId={landId}
          stageId={stageId}
          challengeId={challengeId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/lands/") &&
      pathname.includes("/stages/") &&
      pathname.split("/").length === 6
    ) {
      const parts = pathname.split("/");
      const landId = parts[3];
      const stageId = parts[5];
      return (
        <StageDetailPage
          landId={landId}
          stageId={stageId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/lands/") &&
      pathname.split("/").length === 4
    ) {
      const landId = pathname.split("/")[3];
      return <LandDetailPage landId={landId} onNavigate={handleNavigate} />;
    }

    // Interviews
    if (pathname === routes.interviews) {
      return <InterviewsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/interviews/") &&
      pathname.endsWith("/project")
    ) {
      const interviewId = pathname.split("/")[3];
      return (
        <InterviewProjectPage
          interviewId={interviewId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/interviews/") &&
      pathname.endsWith("/algorithm")
    ) {
      const interviewId = pathname.split("/")[3];
      return (
        <InterviewAlgorithmPage
          interviewId={interviewId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/interviews/") &&
      pathname.endsWith("/results")
    ) {
      const interviewId = pathname.split("/")[3];
      return (
        <InterviewResultsPage
          interviewId={interviewId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/interviews/") &&
      pathname.split("/").length === 4
    ) {
      const interviewId = pathname.split("/")[3];
      return (
        <InterviewDetailPage
          interviewId={interviewId}
          onNavigate={handleNavigate}
        />
      );
    }

    // Mock Interviews
    if (pathname === routes.mockInterviews) {
      return <MockInterviewsPage onNavigate={handleNavigate} />;
    }

    if (
      pathname.startsWith("/dashboard/mock-interviews/") &&
      pathname.endsWith("/results")
    ) {
      const id = pathname.split("/")[3];
      return (
        <MockInterviewResultsPage
          interviewId={id}
          onNavigate={handleNavigate}
        />
      );
    }

    if (
      pathname.startsWith("/dashboard/mock-interviews/") &&
      pathname.split("/").length === 4
    ) {
      const id = pathname.split("/")[3];
      return (
        <MockInterviewSessionPage
          interviewId={id}
          onNavigate={handleNavigate}
        />
      );
    }

    // Community
    if (pathname === routes.community) {
      return <CommunityPage onNavigate={handleNavigate} />;
    }

    // Subscription & Billing
    if (pathname === routes.subscriptionPlans) {
      return <SubscriptionPlansPage onNavigate={handleNavigate} />;
    }

    if (pathname === routes.subscriptionManagement) {
      return <SubscriptionManagementPage onNavigate={handleNavigate} />;
    }

    if (pathname === routes.billing) {
      return <SubscriptionManagementPage onNavigate={handleNavigate} />;
    }

    if (pathname.startsWith("/dashboard/checkout")) {
      return <CheckoutPage onNavigate={handleNavigate} />;
    }

    // Default dashboard
    return <DashboardContent onNavigate={handleNavigate} />;
  };

  return (
    <DashboardLayout currentPath={pathname} onNavigate={handleNavigate}>
      {renderContent()}
    </DashboardLayout>
  );
}
