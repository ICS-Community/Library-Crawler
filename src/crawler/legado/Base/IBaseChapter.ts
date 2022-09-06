export default interface IBaseChapter {
  getName: () => string
  getPublishTime: () => Date
  getContent: () => string
}
