import { BaseError } from "./baseError";

export class ResourceAlreadyExistsError extends BaseError {
  constructor(message?: string) {
    super(message ?? "Resource already exists", 409, "Conflict");
  }
}
