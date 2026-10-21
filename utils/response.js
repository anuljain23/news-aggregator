const buildResponse = (data = {}) => ({
    data,
});

const buildErrorResponse = (message) => ({
    error: { message },
});

const buildErrorWithDataResponse = (data, message) => ({
    error: { message },
    data,
});

// Response
const CreatedResponse = (data = {}) => buildResponse(data);

const DataResponse = (data = {}) => buildResponse(data);

const NoContentResponse = () => undefined;

const BadRequestErrorResponse = (message = 'Bad Request') => buildErrorResponse(message);

const BadRequestWithDataResponse = (data, message = 'Bad Request') => buildErrorWithDataResponse(data, message);

const NotFoundErrorResponse = (message = 'Not Found') => buildErrorResponse(message);

const ErrorResponse = (message = 'Internal Server Error') => buildErrorResponse(message);

const ForbiddenErrorResponse = (message = 'Forbidden Request') => buildErrorResponse(message);

const UnauthorizedErrorResponse = (message = 'Unauthorized') => buildErrorResponse(message);

class HttpError extends Error {
    constructor(...params) {
        super(...params);
    }
}

module.exports = {
    CreatedResponse,
    DataResponse,
    NoContentResponse,
    BadRequestErrorResponse,
    NotFoundErrorResponse,
    ErrorResponse,
    ForbiddenErrorResponse,
    UnauthorizedErrorResponse,
    BadRequestWithDataResponse,
    HttpError,
};
