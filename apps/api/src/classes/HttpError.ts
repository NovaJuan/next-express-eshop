class HttpError extends Error {
  message = ''
  statusCode = 500
  metadata

  constructor(
    message: string,
    statusCode: number,
    metadata?: Record<string, any>,
  ) {
    super()
    this.message = message
    this.statusCode = statusCode
    this.metadata = metadata
  }
}

export default HttpError
