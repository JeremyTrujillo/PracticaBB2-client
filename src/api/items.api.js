import { ApiUtils } from "./apiUtils";

const apiUtils = new ApiUtils();

export class ItemsApi {

  async findAll() {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('');
  }

  async findByCode(itemCode) {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('/' + itemCode);
  }

  async findActive() {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('/active');
  }
  
  async findDiscontinued() {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('/discontinued');
  }

  async findCheapestPerSupplier() {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('cheapestPerSupplier');
  }

  async createItem(item) {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).post('', item);
  }
}
