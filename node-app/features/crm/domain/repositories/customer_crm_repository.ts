export interface CustomerCRMRepository {
    createCustomer(entity: CustomerCRMEntity): Promise<CustomerCRMEntity>;
    getCustomers(userId: number): Promise<CustomerCRMEntity[]>;
    updateCustomer(entity: CustomerCRMEntity): Promise<CustomerCRMEntity>;
    deleteCustomer(userId: number, id: number): Promise<void>;
}