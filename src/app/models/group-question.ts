import { Question } from './question'

export class GroupQuestion {
    audio: any
    image: any
    txtTranscript: string
    txtText: string
    questions = new Array<Question>()
}
