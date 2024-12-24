import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({
  name: 'password',
})
export class AdminPasswordQuestion {
  @Question({
    type: 'input',
    name: 'password',
    message: 'Enter new password',
    validate: Boolean,
  })
  parseLogin(value: string): string {
    return value;
  }
}
