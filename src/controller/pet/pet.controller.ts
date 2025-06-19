import { BaseClass, HttpMethod } from "../base/base";

export enum PetStatus {
  AVAILABLE = "available",
  PENDING = "pending",
  SOLD = "sold",
}

export interface BasePet {
  category: { id: number; name: string };
  name: string;
  photoUrls: string[];
  tags: { id: number; name: string }[];
  status: PetStatus;
}

export interface Pet extends BasePet {
  id: number;
}

class PetController extends BaseClass {
  postAddNewPet(bodyRequest: BasePet) {
    return this.makeRequest(HttpMethod.POST, `/pet`)
      .set(`Content-Type`, `application/json`)
      .send(bodyRequest);
  }

  getPetById(petId: number) {
    return this.makeRequest(HttpMethod.GET, `/pet/${petId}`).set(
      `Content-Type`,
      `application/json`,
    );
  }

  getListPetsByStatus(statusToFilter: string) {
    return this.makeRequest(HttpMethod.GET, `/pet/findByStatus`)
      .set(`Content-Type`, `application/json`)
      .query({
        status: statusToFilter,
      });
  }
}

export default new PetController();
