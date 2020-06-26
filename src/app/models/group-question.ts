import { Question } from './question'

export class GroupQuestion {
    oldImagePath: string
    oldAudioPath: string
    imagePath: any
    audioPath: any
    testId: number
    text: string
    groupQuestionId: any
    checkDeleteImage: boolean
    checkDeleteAudio: boolean
    questions = new Array<Question>()
}
