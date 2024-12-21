import { MESSAGES, STATUSCODES } from "@constants";

export class CustomError extends Error {
  statusCode: number = STATUSCODES.INTERNAL_SERVER;
  message: string = MESSAGES.SERVER_ERROR_MESSAGE;
  data: any = null;
  status: boolean = false;

  constructor(
    statusCode: number,
    status: boolean,
    message: string,
    data = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

// Error for 403 Forbidden
export class ForbiddenError extends CustomError {
  constructor(data = null, message = MESSAGES.UNAUTHORIZED) {
    super(STATUSCODES.ERROR_STATUS, false, message, data);
  }
}

// Error for 400 Bad Request
export class BadRequestError extends CustomError {
  constructor(data = null, message = MESSAGES.BAD_REQUEST) {
    super(STATUSCODES.BADREQUEST_STATUS, false, message, data);
  }
}

// Error for 401 Unauthorized
export class UnauthorizedError extends CustomError {
  constructor(data = null, message = MESSAGES.UNAUTHORIZED) {
    super(STATUSCODES.UNAUTHORISED_STATUS, false, message, data);
  }
}

// Error for 404 Not Found
export class NotFoundError extends CustomError {
  constructor(data = null, message = MESSAGES.DATA_NOT_FOUND) {
    super(STATUSCODES.NOT_FOUND, false, message, data);
  }
}

// Error for 405 Method Not Allowed (Something went wrong)
export class MethodNotAllowedError extends CustomError {
  constructor(data = null, message = MESSAGES.ERROR_MESSAGE) {
    super(STATUSCODES.SOMETHING_WENT_WRONG, false, message, data);
  }
}

// Error for 500 Internal Server Error
export class InternalServerError extends CustomError {
  constructor(data = null) {
    super(
      STATUSCODES.INTERNAL_SERVER,
      false,
      MESSAGES.SERVER_ERROR_MESSAGE,
      data
    );
  }
}

// Error for 501 Unauthorized Device ID
export class UnauthorizedDeviceIdError extends CustomError {
  constructor(data = null) {
    super(
      STATUSCODES.UNAUTHORISED_DEVICE_ID,
      false,
      MESSAGES.UNAUTHORIZED,
      data
    );
  }
}

// Error for 418 I'm a Teapot
export class ImATeapotError extends CustomError {
  constructor(data = null) {
    super(STATUSCODES.IM_A_TEAPOT, false, "I'm a teapot", data);
  }
}
export class ConflictingRequestError extends CustomError {
  constructor(data = null, message = MESSAGES.SERVER_ERROR_MESSAGE) {
    super(STATUSCODES.CONFLICTING_REQUEST, false, message, data);
  }
}
