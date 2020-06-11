import { Question } from './question'

export class GroupQuestion {
    oldImagePath: string
    oldAudioPath: string
    imagePath: any
    audioPath: any
    testId: number
    text: string
    questions = new Array<Question>()
}
