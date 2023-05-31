import axios from "axios";

export class ItemsApi {

  getItemsInstance() {
    return axios.create({
      baseURL: 'http://localhost:8080/items',
      timeout: 1000,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
  }

  async findAll() {
    return this.getItemsInstance().get('');
  }

  async findByCode(itemCode) {
    return this.getItemsInstance().get('/' + itemCode);
  }

  async findActive() {
    return this.getItemsInstance().get('/active');
  }
  
  async findDiscontinued() {
    return this.getItemsInstance().get('/discontinued');
  }

  async findCheapestPerSupplier() {
    return this.getItemsInstance().get('cheapestPerSupplier');
  }

  async createItem(item) {
    return this.getItemsInstance().post('', item);
  }

  async editItem(item, id) {
    return this.getItemsInstance().put('', item, {
      params: {
        id: id
      }
    })
  }

  async deactivateItem(itemDeactivator) {
    return this.getItemsInstance().put('deactivate', itemDeactivator)
  }

  async deleteItemByItemCode(itemCode) {
    return this.getItemsInstance().delete('', {
      params: {
        itemCode: itemCode
      }
    })
  }
}
