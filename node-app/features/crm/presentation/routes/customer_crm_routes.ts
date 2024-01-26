import express from 'express';
import { CustomerCRMDataSource } from '../../data/data_sources/customer_crm_data_source';
import { CustomerCRMRepository } from '../../domain/repositories/customer_crm_repository';
import { CreateCustomer, DeleteCustomer, GetCustomers, UpdateCustomer } from '../../domain/usecases/customer_crm_crud';
import { CustomerCRMController } from '../controller/customer_crm_controller';
import { ensureAuthenticated } from '../../../authentification/presentation/middlewares/auth_middleware';
import { CustomerCRMRepositoryImpl } from '../../data/repositories/customer_crm_repository_impl';

// Create a CustomerCRMRepository
const dataSource = new CustomerCRMDataSource();
const customerCrmRepo: CustomerCRMRepository = new CustomerCRMRepositoryImpl(dataSource);

// Initialize the use cases
const createCustomer: CreateCustomer = new CreateCustomer(customerCrmRepo);
const deleteCustomer: DeleteCustomer = new DeleteCustomer(customerCrmRepo);
const getCustomers: GetCustomers = new GetCustomers(customerCrmRepo);
const updateCustomer: UpdateCustomer = new UpdateCustomer(customerCrmRepo);

const router = express.Router();

const customerCrmController = new CustomerCRMController(createCustomer, deleteCustomer, getCustomers, updateCustomer);

// Routes
router.post('/', ensureAuthenticated, customerCrmController.create);
router.get('/', ensureAuthenticated, customerCrmController.getAll);
router.put('/', ensureAuthenticated, customerCrmController.update);
router.delete('/', ensureAuthenticated, customerCrmController.delete);

export default router;
