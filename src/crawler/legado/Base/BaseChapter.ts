export default interface BaseChapter {
  getName: () => string
  getPublishTime: () => Date
  getContent: () => string
}
