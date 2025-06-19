import { defineFeature, loadFeature } from "jest-cucumber";
import petController from "../controller/pet/pet.controller";
import { HTTP_STATUS, validateJsonSchema } from "../utils/helper";
import getListPetsSchema from "../json_schema/get-list-pets.schema.json";

//load .feature files
const feature = loadFeature("./features/pet/get-pet.feature");

defineFeature(feature, (test) => {
  let response: any;
  let localPetStatus: string;

  test(`Successfully get list of pets with pet "<petStatus>" status`, ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^I have a query param with "([^"]*)" status$/, (petStatus) => {
      //Get petStatus from Scenario outline
      localPetStatus = petStatus;
    });

    when(
      `I submit the query param to the Get List of Pets endpoint`,
      async () => {
        response = await petController.getListPetsByStatus(localPetStatus);
      },
    );

    then(`I should receive a 200 response`, () => {
      expect(response.statusCode).toBe(HTTP_STATUS.SUCCESS);
    });

    and(`the response should be equal as query param provided`, () => {
      response.body.forEach((petData): any => {
        //Check every each data, especially for pet's status
        expect(petData.status).toEqual(localPetStatus);
      });
    });

    and(`the response should be equal as json schema`, () => {
      validateJsonSchema(getListPetsSchema, response.body);
    });
  });
});
