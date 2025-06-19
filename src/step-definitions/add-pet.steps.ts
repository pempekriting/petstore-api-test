import { defineFeature, loadFeature } from "jest-cucumber";
import petController, {
  BasePet,
} from "../controller/pet/pet.controller";
import { generatePetPayload, HTTP_STATUS } from "../utils/helper";
const feature = loadFeature("./features/add-pet.feature");

defineFeature(feature, (test) => {
  let payload: BasePet;
  let response: any;

  test(`Successfully add a new pet with valid pet status`, ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^I have a pet payload with status "([^"]*)"$/, (petStatus) => {
      payload = generatePetPayload({ status: petStatus });
    });

    when(`I submit the payload to the Add Pet endpoint`, async () => {
      response = await petController.postAddNewPet(payload);
    });

    then(`I should receive a 200 response`, () => {
      expect(response.statusCode).toBe(HTTP_STATUS.SUCCESS);
    });

    and(`the response should be the same as payload body provided`, () => {
      expect(response.body.category.id).toEqual(payload.category.id);
      expect(response.body.category.name).toEqual(payload.category.name);
      expect(response.body.name).toEqual(payload.name);
      expect(response.body.photoUrls).toEqual(payload.photoUrls);
      expect(response.body.tags[0].id).toEqual(payload.tags[0].id);
      expect(response.body.tags[0].name).toEqual(payload.tags[0].name);
      expect(response.body.status).toEqual(payload.status);
    });
  });
});
