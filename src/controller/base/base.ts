import supertest, { Test } from "supertest";
import dotenv from "dotenv";

dotenv.config();

//Http method enum
export enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
  OPTIONS = "options",
}

//Base class to handle some repititive function
export class BaseClass {
  private readonly baseUrl = process.env.BASE_URL || ``;

  //General function to handle request API using supertest
  protected makeRequest(method: HttpMethod, url: string): Test {
    const request = supertest(this.baseUrl);
    return request[method](url);
  }
}
