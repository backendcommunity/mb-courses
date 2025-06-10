"use client"

import { ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseDetailProps {
  course: {
    title: string
  }
  onNavigate: (url: string) => void
}

const CourseDetail = ({ course, onNavigate }: CourseDetailProps) => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <button onClick={() => onNavigate("/dashboard")} className="hover:text-primary">
          Dashboard
        </button>
        <ChevronRight className="h-4 w-4" />
        <button onClick={() => onNavigate("/dashboard/courses")} className="hover:text-primary">
          Courses
        </button>
        <ChevronRight className="h-4 w-4" />
        <span>{course.title}</span>
      </div>

      {/* Explore Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          onClick={() => onNavigate("/dashboard/courses")}
        >
          <Search className="h-4 w-4" />
          Explore More Courses
        </Button>
      </div>

      {/* Course Header */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">{/* Course Content Here */}</div>
    </div>
  )
}

export default CourseDetail
