"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

// Define styles using Helvetica (built-in font that always works)
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#7c3aed",
  },
  logo: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#7c3aed",
  },
  logoSubtext: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 2,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  reportTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  reportDate: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  // Interview info
  interviewInfo: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  interviewTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 4,
  },
  interviewMeta: {
    fontSize: 10,
    color: "#6b7280",
  },
  // Score section
  scoreSection: {
    flexDirection: "row",
    marginBottom: 24,
  },
  mainScore: {
    flex: 1,
    backgroundColor: "#7c3aed",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  gradeText: {
    fontSize: 48,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  gradeLabel: {
    fontSize: 10,
    color: "#e9d5ff",
    marginTop: 4,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  scoreCardLast: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: "#7c3aed",
  },
  scoreLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  // Score breakdown
  breakdownSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  breakdownRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  breakdownLabel: {
    width: 140,
    fontSize: 11,
    color: "#374151",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#7c3aed",
    borderRadius: 4,
  },
  breakdownValue: {
    width: 40,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    textAlign: "right",
  },
  // Summary
  summary: {
    backgroundColor: "#f0fdf4",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
  },
  summaryText: {
    fontSize: 11,
    color: "#166534",
    lineHeight: 1.5,
  },
  // Feedback section (strengths/weaknesses)
  feedbackSection: {
    flexDirection: "row",
    marginBottom: 24,
  },
  feedbackColumn: {
    flex: 1,
    marginRight: 8,
  },
  feedbackColumnLast: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  strengthsTitle: {
    color: "#16a34a",
  },
  weaknessesTitle: {
    color: "#dc2626",
  },
  feedbackItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 8,
  },
  bullet: {
    width: 16,
    fontSize: 10,
    color: "#6b7280",
  },
  feedbackText: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
  },
  // Questions section
  questionCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 6,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  questionScore: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#7c3aed",
    backgroundColor: "#ede9fe",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  questionText: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 1.4,
  },
  answerLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    marginBottom: 4,
  },
  answerText: {
    fontSize: 9,
    color: "#4b5563",
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  feedbackLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    marginBottom: 4,
  },
  questionFeedback: {
    fontSize: 9,
    color: "#059669",
    lineHeight: 1.4,
  },
  // Recommendations
  recommendationCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
  },
  recommendationTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    marginBottom: 4,
  },
  recommendationDesc: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.4,
  },
  resourceList: {
    paddingLeft: 8,
  },
  resourceItem: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 2,
  },
  // Promo section
  promoSection: {
    marginTop: "auto",
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  promoBox: {
    backgroundColor: "#7c3aed",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  promoTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  promoText: {
    fontSize: 10,
    color: "#e9d5ff",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 1.5,
  },
  promoLink: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    backgroundColor: "#5b21b6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  // Footer
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },
  footerLink: {
    fontSize: 8,
    color: "#7c3aed",
  },
  // Page number
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 20,
    right: 40,
    color: "#9ca3af",
  },
});

// Types
interface TopicBreakdown {
  topic: string;
  score: number;
  feedback?: string;
}

interface QuestionAnalysis {
  questionId: string;
  question: string;
  userAnswer: string;
  score: number;
  feedback: string;
}

interface Recommendation {
  title: string;
  description: string;
  resources: string[];
}

export interface InterviewReportData {
  interviewTitle: string;
  interviewDate: string;
  position?: string;
  company?: string;
  difficulty?: string;
  grade: string;
  overallScore: number;
  result: "PASS" | "FAIL" | "BORDERLINE";
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  topicBreakdown?: TopicBreakdown[];
  summary?: string;
  strengths: string[];
  weaknesses: string[];
  questionAnalysis: QuestionAnalysis[];
  recommendations: Recommendation[] | string[];
}

function getResultColor(result: string): string {
  switch (result) {
    case "PASS":
      return "#16a34a";
    case "FAIL":
      return "#dc2626";
    default:
      return "#ca8a04";
  }
}

export function InterviewReportDocument({
  data,
}: {
  data: InterviewReportData;
}) {
  const isStringRecommendations =
    Array.isArray(data.recommendations) &&
    data.recommendations.every((r) => typeof r === "string");

  return (
    <Document>
      {/* Page 1: Overview */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Mastering Backend</Text>
            <Text style={styles.logoSubtext}>
              Ace your technical interviews
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>Interview Performance Report</Text>
            <Text style={styles.reportDate}>{data.interviewDate}</Text>
          </View>
        </View>

        {/* Interview Info */}
        <View style={styles.interviewInfo}>
          <Text style={styles.interviewTitle}>{data.interviewTitle}</Text>
          <Text style={styles.interviewMeta}>
            {data.position ? `Position: ${data.position}` : ""}
            {data.company ? ` | Company: ${data.company}` : ""}
            {data.difficulty ? ` | Difficulty: ${data.difficulty}` : ""}
          </Text>
        </View>

        {/* Score Overview */}
        <View style={styles.scoreSection}>
          <View style={styles.mainScore}>
            <Text style={styles.gradeText}>{data.grade}</Text>
            <Text style={styles.gradeLabel}>Overall Grade</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{data.overallScore}</Text>
            <Text style={styles.scoreLabel}>Overall Score</Text>
          </View>
          <View
            style={[
              styles.scoreCardLast,
              { backgroundColor: `${getResultColor(data.result)}15` },
            ]}
          >
            <Text
              style={[
                styles.scoreValue,
                { color: getResultColor(data.result) },
              ]}
            >
              {data.result}
            </Text>
            <Text style={styles.scoreLabel}>Result</Text>
          </View>
        </View>

        {/* Score Breakdown */}
        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Performance Breakdown</Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Technical Skills</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${data.technicalScore}%` },
                ]}
              />
            </View>
            <Text style={styles.breakdownValue}>{data.technicalScore}%</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Communication</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${data.communicationScore}%` },
                ]}
              />
            </View>
            <Text style={styles.breakdownValue}>
              {data.communicationScore}%
            </Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Problem Solving</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${data.problemSolvingScore}%` },
                ]}
              />
            </View>
            <Text style={styles.breakdownValue}>
              {data.problemSolvingScore}%
            </Text>
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Strengths & Weaknesses */}
        <View style={styles.feedbackSection}>
          <View style={styles.feedbackColumn}>
            <Text style={[styles.feedbackTitle, styles.strengthsTitle]}>
              Strengths
            </Text>
            {data.strengths.length > 0 ? (
              data.strengths.slice(0, 5).map((strength, i) => (
                <View key={i} style={styles.feedbackItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.feedbackText}>{strength}</Text>
                </View>
              ))
            ) : (
              <View style={styles.feedbackItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.feedbackText}>No strengths identified</Text>
              </View>
            )}
          </View>
          <View style={styles.feedbackColumnLast}>
            <Text style={[styles.feedbackTitle, styles.weaknessesTitle]}>
              Areas for Improvement
            </Text>
            {data.weaknesses.length > 0 ? (
              data.weaknesses.slice(0, 5).map((weakness, i) => (
                <View key={i} style={styles.feedbackItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.feedbackText}>{weakness}</Text>
                </View>
              ))
            ) : (
              <View style={styles.feedbackItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.feedbackText}>No areas identified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Promo */}
        <View style={styles.promoSection}>
          <View style={styles.promoBox}>
            <Text style={styles.promoTitle}>
              Ready to Level Up Your Interview Skills?
            </Text>
            <Text style={styles.promoText}>
              Join thousands of developers who have improved their interview
              performance with our AI-powered mock interviews and expert-led
              courses.
            </Text>
            <Link src="https://app.masteringbackend.com/mock-interviews">
              <Text style={styles.promoLink}>Start Practicing Today</Text>
            </Link>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Page 2: Question Analysis */}
      {data.questionAnalysis && data.questionAnalysis.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>Mastering Backend</Text>
              <Text style={styles.logoSubtext}>
                Ace your technical interviews
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.reportTitle}>Question Analysis</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Detailed Question Review</Text>

          {data.questionAnalysis.slice(0, 4).map((qa, i) => (
            <View
              key={qa.questionId || i}
              style={styles.questionCard}
              wrap={false}
            >
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>Question {i + 1}</Text>
                <Text style={styles.questionScore}>{qa.score}%</Text>
              </View>
              <Text style={styles.questionText}>{qa.question}</Text>
              <Text style={styles.answerLabel}>Your Answer:</Text>
              <Text style={styles.answerText}>
                {qa.userAnswer && qa.userAnswer.length > 200
                  ? qa.userAnswer.substring(0, 200) + "..."
                  : qa.userAnswer || "No answer provided"}
              </Text>
              <Text style={styles.feedbackLabel}>Feedback:</Text>
              <Text style={styles.questionFeedback}>
                {qa.feedback || "No feedback available"}
              </Text>
            </View>
          ))}

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
            fixed
          />
        </Page>
      )}

      {/* Page 3: Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>Mastering Backend</Text>
              <Text style={styles.logoSubtext}>
                Ace your backend technical interviews
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.reportTitle}>Recommendations</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Personalized Learning Recommendations
          </Text>

          {isStringRecommendations
            ? // String array recommendations
              (data.recommendations as string[]).map((rec, i) => (
                <View key={i} style={styles.feedbackItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.feedbackText}>{rec}</Text>
                </View>
              ))
            : // Object recommendations with resources
              (data.recommendations as Recommendation[])
                .slice(0, 5)
                .map((rec, i) => (
                  <View key={i} style={styles.recommendationCard} wrap={false}>
                    <Text style={styles.recommendationTitle}>{rec.title}</Text>
                    <Text style={styles.recommendationDesc}>
                      {rec.description}
                    </Text>
                    {rec.resources && rec.resources.length > 0 && (
                      <View style={styles.resourceList}>
                        {rec.resources.slice(0, 3).map((resource, j) => (
                          <Text key={j} style={styles.resourceItem}>
                            • {resource}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}

          {/* Final CTA */}
          <View style={[styles.promoSection, { marginTop: 40 }]}>
            <View style={styles.promoBox}>
              <Text style={styles.promoTitle}>Practice Makes Perfect!</Text>
              <Text style={styles.promoText}>
                The best way to improve is through consistent practice. Book
                another mock interview to track your progress and receive fresh
                feedback.
              </Text>
              <Link src="https://app.masteringbackend.com/mock-interviews">
                <Text style={styles.promoLink}>Book Another Interview</Text>
              </Link>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Generated by Mastering Backend Mock Interview Platform
            </Text>
            <Link src="https://masteringbackend.com">
              <Text style={styles.footerLink}>masteringbackend.com</Text>
            </Link>
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
            fixed
          />
        </Page>
      )}
    </Document>
  );
}

export default InterviewReportDocument;
