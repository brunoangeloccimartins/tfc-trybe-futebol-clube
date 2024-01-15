export type ServiceMessage = { message?: string, role?: string | null };

type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESS';
  data: T | ServiceMessage;
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
