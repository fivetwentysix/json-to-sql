export default class JsonToSql {
  data: string;
  constructor (data: any) {
    this.data = data
    if (!Array.isArray(data)) {
      throw new InvalidParameterError('JsonToSql only accepts an Array')
    }
  }
}

class InvalidParameterError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidParameterError'
  }
}