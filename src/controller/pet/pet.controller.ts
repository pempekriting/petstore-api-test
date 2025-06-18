import { BaseClass, HttpMethod } from "../base/base";

class PetController extends BaseClass {
  postAddNewPet(bodyRequest: {
    [key: string]: string | number | string[] | object;
  }) {
    return this.makeRequest(HttpMethod.POST, `/pet`)
      .set(`Content-Type`, `application/json`)
      .send(bodyRequest);
  }

  getPetById(petId: number){
    return this.makeRequest(HttpMethod.GET, `/pet/${petId}`)
    .set(`Content-Type`, `application/json`)
  }

  getListPetsByStatus(statusToFilter: string){
    return this.makeRequest(HttpMethod.GET, `/pet/findByStatus`)
    .set(`Content-Type`, `application/json`)
    .query({
      status: statusToFilter
    })
  }
}

export default new PetController();
