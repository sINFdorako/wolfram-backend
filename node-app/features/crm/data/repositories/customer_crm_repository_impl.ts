import { CustomerCRMEntity } from "../../domain/entities/customer_crm";
import { CustomerCRMRepository } from "../../domain/repositories/customer_crm_repository";
import { CustomerCRMDataSource } from "../data_sources/customer_crm_data_source";
import { customerEntityToModel, modelToCustomerEntity } from "../mappers/customer_crm_mappers";

export class CustomerCRMRepositoryImpl implements CustomerCRMRepository {
     private dataSource: CustomerCRMDataSource;

     constructor(dataSource: CustomerCRMDataSource) {
        this.dataSource = dataSource;
     }

    async createCustomer(entity: CustomerCRMEntity): Promise<CustomerCRMEntity> {
        try {
            let customerModel = await this.dataSource.createCustomerInDB(customerEntityToModel(entity));
            let entityModel = modelToCustomerEntity(customerModel);
            return entityModel;
        } catch (error) {
            console.error(`Failed to create customer: ${error}`);
            throw error;
        }
    }

    async getCustomers(userId: number): Promise<CustomerCRMEntity[]> {
        try {
            let customerModels = await this.dataSource.getAllCustomersFromDB(userId);
            let entityModels = customerModels.map(model => modelToCustomerEntity(model));
            return entityModels;
        } catch (error) {
            console.error(`Failed to get customers: ${error}`);
            throw error;
        }
    }

    async updateCustomer(entity: CustomerCRMEntity): Promise<CustomerCRMEntity> {
        try {
            let customerModel = await this.dataSource.updateCustomerByIdInDB(customerEntityToModel(entity));
            let entityModel = modelToCustomerEntity(customerModel);
            return entityModel;
        } catch (error) {
            console.error(`Failed to update customer: ${error}`);
            throw error;
        }
    }

    async deleteCustomer(userId: number, id: number): Promise<void> {
        try {
            await this.dataSource.deleteCustomerByIdInDB(userId, id);
        } catch (error) {
            console.error(`Failed to delete customer: ${error}`);
            throw error;
        }
    }
}
