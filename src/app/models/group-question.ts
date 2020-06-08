import { Question } from './question'

export class GroupQuestion {
    imagePath: any
    audioPath: any
    testId: number
    text: string
    questions = new Array<Question>()
}
