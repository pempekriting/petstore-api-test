import petController, { PetStatus } from "../controller/pet/pet.controller";
import {
  generatePetPayload,
  HTTP_STATUS,
  validateJsonSchema,
} from "../utils/helper";
import postPetSchema from "../json_schema/post-pet.schema.json";
import getListPetsSchema from "../json_schema/get-list-pets.schema.json";

describe(`Pet API`, () => {
  //Call PetStatus enum from helper. The petStatuses object would be like this [`availbale`, `pending`, `sold`]
  const petStatuses = Object.values(PetStatus);

  test.each(petStatuses)(
    `As an API consumer, I can add a new Pet with status %s`,
    async (status) => {
      //Call function to generate payload
      const payload = generatePetPayload({ status: status });
      //API call
      const response = await petController.postAddNewPet(payload);

      //Assertion
      expect(response.statusCode).toEqual(HTTP_STATUS.SUCCESS);
      expect(response.body.category.id).toEqual(payload.category.id);
      expect(response.body.category.name).toEqual(payload.category.name);
      expect(response.body.name).toEqual(payload.name);
      expect(response.body.photoUrls).toEqual(payload.photoUrls);
      expect(response.body.tags[0].id).toEqual(payload.tags[0].id);
      expect(response.body.tags[0].name).toEqual(payload.tags[0].name);
      expect(response.body.status).toEqual(payload.status);
      validateJsonSchema(postPetSchema, response.body);
    },
  );

  test.each(petStatuses)(`As an API consumer, I can get list of pets based on %s`, async (status) => {
    //Call API
    const response = await petController.getListPetsByStatus(status);

    //Assertion
    expect(response.statusCode).toEqual(HTTP_STATUS.SUCCESS);
    validateJsonSchema(getListPetsSchema, response.body)
    response.body.forEach((petData): any => {
      //Check every each data, especially for pet's status
      expect(petData.status).toEqual(status);
    });
  })
});
