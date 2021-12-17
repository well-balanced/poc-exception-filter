import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException as NestHttpException,
  HttpStatus,
} from "@nestjs/common";
import { SSE, PrivateEC } from "./exceptions";

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: SSE | NestHttpException | unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode: number;
    let message: string;
    let errorCode: string;
    let error: string;

    const isNestException = exception instanceof NestHttpException;
    const isSSException = exception instanceof SSE;
    const isPrivateError: boolean = (<any>Object)
      .values(PrivateEC)
      .includes((<SSE>exception)?.errorCode);

    if (isSSException && !isPrivateError) {
      statusCode = exception.getStatus();
      message = exception.message;
      errorCode = exception.errorCode;
    } else if (isNestException) {
      statusCode = exception.getStatus();
      const response = exception.getResponse() as {
        error: string;
        message: string | string[];
      };
      error = response.error;
      message = Array.isArray(response.message)
        ? response.message[0]
        : response.message;
    } else {
      /**
       * Private Error
       * Unknown Error
       */
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      error = "Internal Server Error";
      /**
       * TODO: Error report
       */
    }

    response.status(statusCode).json({
      error,
      ...(errorCode && { errorCode }),
      statusCode,
      message,
    });
  }
}
