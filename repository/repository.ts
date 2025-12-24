import { querify } from "../lib/http/query.js";

export type RequestConfig = RequestInit & {
  query?: Record<string, string | number | boolean>;
};

export class HttpError extends Error {
  private _status: number;
  private _name: string;

  constructor(message: string, status: number, name = "HttpError") {
    super(`${name}: ${message}`);

    this._status = status;
    this._name = name;
  }

  get status() {
    return this._status;
  }

  get name() {
    return this._name;
  }

  static isInstance(error: Error): error is HttpError {
    return (
      error.name === "HttpError" && (error as HttpError).status !== undefined
    );
  }
}

export class Repository {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private request = async <T>(
    path: string,
    config?: RequestConfig
  ): Promise<T> => {
    const { query = {}, body = {}, method, ...rest } = config ?? {};

    const response = await fetch(`${this.baseUrl}${path}${querify(query)}`, {
      body: method === "GET" ? null : JSON.stringify(body),
      ...rest,
    });

    if (!response.ok) {
      throw new HttpError("Request failed", response.status);
    }

    return response.json() as T;
  };

  protected get<T>(
    path: string,
    config?: Omit<RequestConfig, "method">
  ): Promise<T> {
    return this.request(path, { ...config, method: "GET" });
  }
}
