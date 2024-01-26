import { CustomerCRM } from "../models/customer_crm_model";

export class CustomerCRMDataSource {
  // Create
  async createCustomerInDB(model: CustomerCRM): Promise<CustomerCRM> {
    const createdModel = await CustomerCRM.create(model);
    return createdModel;
  }

  // Get All Customers By User Id
  async getAllCustomersFromDB(userId: number): Promise<CustomerCRM[]> {
    const models = await CustomerCRM.findAll({ where: { userId } });
    return models;
  }
  
  // Update
  async updateCustomerByIdInDB(model: CustomerCRM): Promise<CustomerCRM> {
    const modelToUpdate = await CustomerCRM.findOne({
      where: { userId: model.userId, id: model.id },
    });
    if (!modelToUpdate) {
      throw new Error("Customer not found");
    }

    const updatedModel = await modelToUpdate.update(model);

    return updatedModel;
  }

  // Delete
  async deleteCustomerByIdInDB(userId: number, id: number): Promise<void> {
    const modelToDelete = await CustomerCRM.findOne({ where: { userId, id } });
    if (!modelToDelete) {
      throw new Error("Customer not found");
    }
    await modelToDelete.destroy();
  }
}
