import { getChallengeById } from "@/lib/data"

interface CodingChallengeProps {
  params: { id: string }
}

export default async function CodingChallenge({ params }: CodingChallengeProps) {
  const challenge = await getChallengeById(params.id)

  if (!challenge) {
    return <div>Challenge not found</div>
  }

  return (
    <div>
      <h1>{challenge.title}</h1>
      <p>{challenge.description}</p>
      {/* Add more challenge details here */}
    </div>
  )
}
