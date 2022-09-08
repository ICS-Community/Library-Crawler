export default interface IBaseChapter {
  getName: () => string
  getPublishTime: () => Date | Promise<Date>
  getContent: () => string | Promise<string>
}
