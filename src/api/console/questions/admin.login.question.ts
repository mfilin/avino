import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({
  name: 'login',
})
export class AdminLoginQuestion {
  @Question({
    type: 'input',
    name: 'login',
    message: 'Enter new login',
    validate: Boolean,
  })
  parsePassword(value: string): string {
    return value;
  }
}
