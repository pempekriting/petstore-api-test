import { Validator } from "jsonschema";
import { faker } from "@faker-js/faker";

const validator = new Validator();

// HTTP Status Type
export const HTTP_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CREATED: 201,
} as const;

// Pet Status Enum
export enum PetStatus {
  AVAILABLE = "available",
  PENDING = "pending",
  SOLD = "sold",
}

// Validate json schema using jsonschema validator library
export function validateJsonSchema(schema: object, data: any) {
  const result = validator.validate(data, schema);
  if (!result.valid) {
    console.error(
      "Schema validation failed:",
      result.errors.map((e) => e.stack),
    );
    throw new Error("JSON Schema validation failed");
  }
}

// Re-usable function to generate pet payload and combine with faker.js
export function generatePetPayload(overrides = {}) {
  return {
    category: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.animal.dog(),
    },
    name: faker.word.words({ count: 2 }),
    photoUrls: [faker.image.urlPicsumPhotos()],
    tags: [
      {
        id: faker.number.int({ min: 1, max: 50 }),
        name: faker.word.noun(),
      },
    ],
    status: PetStatus,
    ...overrides,
  };
}
