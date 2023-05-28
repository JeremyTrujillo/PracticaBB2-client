import { ApiUtils } from "./apiUtils";

const apiUtils = new ApiUtils();

export class ItemsApi {

  async findAll() {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('');
  }

  async findByCode(itemCode) {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).get('/' + itemCode);
  }

  async createItem(item) {
    return apiUtils.getInstance(apiUtils.getItemsUrl()).post('', item);
  }
}
