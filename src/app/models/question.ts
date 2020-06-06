import { Answer } from './answer'

export class Question {
    txtQuestion: string
    txtExplain: string
    answers = new Array<Answer>()
}
