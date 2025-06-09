"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Award, Calendar, CheckCircle2 } from "lucide-react"

interface CertificateProps {
  courseName: string
  studentName: string
  instructorName: string
  completionDate: string
  courseId: string
  onDownload?: () => void
  onShare?: () => void
}

export function Certificate({
  courseName,
  studentName,
  instructorName,
  completionDate,
  courseId,
  onDownload,
  onShare,
}: CertificateProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Certificate Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Course Completed!</h2>
        </div>
        <div className="flex gap-3">
          <Button onClick={onShare} variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Certificate
          </Button>
          <Button onClick={onDownload} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Certificate Display */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <Award className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        </div>

        <CardContent className="p-12 text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">MB</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">MasteringBackend</h1>
            <p className="text-lg text-gray-600">Certificate of Completion</p>
          </div>

          {/* Certificate Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-gray-700">This is to certify that</p>
              <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 inline-block">
                {studentName}
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-lg text-gray-700">has successfully completed the course</p>
              <h3 className="text-2xl font-semibold text-blue-700">{courseName}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Completion Date</p>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <p className="font-semibold text-gray-900">{completionDate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Instructor</p>
                <p className="font-semibold text-gray-900">{instructorName}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Certificate ID</p>
                <p className="font-mono text-sm text-gray-600">
                  MB-{courseId}-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="w-32 h-px bg-gray-400 mb-2"></div>
                <p className="text-sm text-gray-600">Instructor Signature</p>
                <p className="text-sm font-medium text-gray-900">{instructorName}</p>
              </div>

              <div className="text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Verified by MasteringBackend</p>
              </div>

              <div className="text-right">
                <div className="w-32 h-px bg-gray-400 mb-2 ml-auto"></div>
                <p className="text-sm text-gray-600">Platform Authority</p>
                <p className="text-sm font-medium text-gray-900">MasteringBackend</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Course Duration:</span>
                <span className="font-medium">8 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Skill Level:</span>
                <span className="font-medium">Advanced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chapters Completed:</span>
                <span className="font-medium">4/4</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Final Score:</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verification:</span>
                <span className="font-medium text-blue-600">Blockchain Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry:</span>
                <span className="font-medium">Never</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sharing Options */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Share Your Achievement</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
              Share on LinkedIn
            </Button>
            <Button variant="outline" className="justify-start">
              <div className="w-5 h-5 bg-blue-400 rounded mr-2"></div>
              Share on Twitter
            </Button>
            <Button variant="outline" className="justify-start">
              <div className="w-5 h-5 bg-green-600 rounded mr-2"></div>
              Add to Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
