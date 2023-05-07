import { BaseError } from "./baseError";

export class ResourceNotFound extends BaseError {
  constructor(message?: string) {
    super(message ?? "Resource not found", 404, "Not found");
  }
}
