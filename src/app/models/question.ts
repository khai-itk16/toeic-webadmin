import { Answer } from './answer'

export class Question {
    text: string
    imagePath: any
    audioPath: any
    explanation: string
    questionId: number
    groupQuestionId: number
    answers = new Array<Answer>()
}
