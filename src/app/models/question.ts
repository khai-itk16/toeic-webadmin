import { Answer } from './answer'

export class Question {
    text: string
    imagePath: any
    audioPath: any
    explanation: string
    answers = new Array<Answer>()
}
