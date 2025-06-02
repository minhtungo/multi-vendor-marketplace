export const HTTP_STATUS_CODES = {
  // 2xx Success
  OK: 200, // The request has succeeded
  CREATED: 201, // The request has succeeded and a new resource has been created
  ACCEPTED: 202, // The request has been accepted for processing but not completed
  NO_CONTENT: 204, // The server successfully processed the request but returns no content

  // 3xx Redirection
  MOVED_PERMANENTLY: 301, // The requested resource has been permanently moved
  FOUND: 302, // The requested resource has been temporarily moved
  NOT_MODIFIED: 304, // The resource has not been modified since the last request
  TEMPORARY_REDIRECT: 307, // The request should be repeated with another URI
  PERMANENT_REDIRECT: 308, // The request and all future requests should be repeated using another URI

  // 4xx Client Errors
  BAD_REQUEST: 400, // The server cannot process the request due to client error
  UNAUTHORIZED: 401, // Authentication is required to access the resource
  FORBIDDEN: 403, // The server understood the request but refuses to authorize it
  NOT_FOUND: 404, // The requested resource could not be found
  METHOD_NOT_ALLOWED: 405, // The method specified in the request is not allowed
  CONFLICT: 409, // The request conflicts with the current state of the server
  UNPROCESSABLE_ENTITY: 422, // The request was well-formed but had semantic errors
  TOO_MANY_REQUESTS: 429, // The user has sent too many requests in a given time

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500, // The server encountered an unexpected condition
  NOT_IMPLEMENTED: 501, // The server does not support the functionality required
  BAD_GATEWAY: 502, // The server received an invalid response from upstream
  SERVICE_UNAVAILABLE: 503, // The server is temporarily unable to handle the request
  GATEWAY_TIMEOUT: 504, // The server did not receive a timely response from upstream
} as const;

// Type for the status codes
export type HttpStatusCode = (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];

// Helper function to get status code explanation
export function getStatusText(code: HttpStatusCode): string {
  const statusTexts: Record<HttpStatusCode, string> = {
    [HTTP_STATUS_CODES.OK]: 'OK',
    [HTTP_STATUS_CODES.CREATED]: 'Created',
    [HTTP_STATUS_CODES.ACCEPTED]: 'Accepted',
    [HTTP_STATUS_CODES.NO_CONTENT]: 'No Content',
    [HTTP_STATUS_CODES.MOVED_PERMANENTLY]: 'Moved Permanently',
    [HTTP_STATUS_CODES.FOUND]: 'Found',
    [HTTP_STATUS_CODES.NOT_MODIFIED]: 'Not Modified',
    [HTTP_STATUS_CODES.TEMPORARY_REDIRECT]: 'Temporary Redirect',
    [HTTP_STATUS_CODES.PERMANENT_REDIRECT]: 'Permanent Redirect',
    [HTTP_STATUS_CODES.BAD_REQUEST]: 'Bad Request',
    [HTTP_STATUS_CODES.UNAUTHORIZED]: 'Unauthorized',
    [HTTP_STATUS_CODES.FORBIDDEN]: 'Forbidden',
    [HTTP_STATUS_CODES.NOT_FOUND]: 'Not Found',
    [HTTP_STATUS_CODES.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
    [HTTP_STATUS_CODES.CONFLICT]: 'Conflict',
    [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
    [HTTP_STATUS_CODES.TOO_MANY_REQUESTS]: 'Too Many Requests',
    [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [HTTP_STATUS_CODES.NOT_IMPLEMENTED]: 'Not Implemented',
    [HTTP_STATUS_CODES.BAD_GATEWAY]: 'Bad Gateway',
    [HTTP_STATUS_CODES.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [HTTP_STATUS_CODES.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  };

  return statusTexts[code];
}
