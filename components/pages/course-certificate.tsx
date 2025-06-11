"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Certificate } from "@/components/certificate";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";

interface CourseCertificatePageProps {
  courseId: string;
  onNavigate: (path: string) => void;
}

export function CourseCertificatePage({
  courseId,
  onNavigate,
}: CourseCertificatePageProps) {
  const store = useAppStore();
  const courses = store.getCourses();
  const user = store.getUser();
  const course = courses.find((c) => c.id === courseId) || courses[0];

  const handleBackToCourse = () => {
    const coursePath = routes.courseDetail(courseId);
    console.log("Back to Course - Navigating to:", coursePath);
    onNavigate(coursePath);
  };

  const handleDownload = () => {
    console.log("Downloading certificate for course:", courseId);
    // In a real app, this would generate and download a PDF
    alert("Certificate download started!");
  };

  const handleShare = () => {
    console.log("Sharing certificate for course:", courseId);
    // In a real app, this would open sharing options
    if (navigator.share) {
      navigator.share({
        title: `I completed ${course.title} on MasteringBackend!`,
        text: `Check out my certificate for completing ${course.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Certificate link copied to clipboard!");
    }
  };

  // Only show certificate if course is completed
  if (course.progress !== 100) {
    return (
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleBackToCourse}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Certificate Not Available</h2>
          <p className="text-muted-foreground mb-6">
            Complete the course to earn your certificate.
          </p>
          <Button onClick={handleBackToCourse}>Continue Learning</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBackToCourse}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
      </div>

      {/* Certificate */}
      <Certificate
        courseName={course.title}
        studentName={user.name}
        instructorName={course.instructor}
        completionDate="December 8, 2024"
        courseId={courseId}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </div>
  );
}
