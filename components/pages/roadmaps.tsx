import { roadmaps } from "@/lib/data"

const RoadmapsPage = () => {
  return (
    <div>
      <h1>Roadmaps</h1>
      <ul>
        {roadmaps.map((roadmap) => (
          <li key={roadmap.id}>{roadmap.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default RoadmapsPage
