import { AnswerDetailsService } from "../services/answers/AnswerDetailsService"

class DetailScore {
  async handle({ userId }: { userId: string }) {
    const { execute: details } = new AnswerDetailsService()
    const courses = await details({ userId })

    const courseScores = courses.map((course) => {
      const courseScore = course.courseWeight.reduce((total, courseWeight) => {
        const userAnswer = courseWeight.question.answer.find(
          (answer) => answer.userId === userId
        )
        const score = userAnswer ? userAnswer.value * courseWeight.weight : 0
        return total + score
      }, 0)

      return { courseId: course.id, course: course.text, score: courseScore }
    })

    const sortedScores = courseScores.sort((a, b) => b.score - a.score)

    return sortedScores
  }
}

export { DetailScore }
