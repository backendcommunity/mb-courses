import { learningPaths } from "@/lib/data"

const LearningPathsPage = () => {
  return (
    <div>
      <h1>Learning Paths</h1>
      <ul>
        {learningPaths.map((path) => (
          <li key={path.id}>{path.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default LearningPathsPage
