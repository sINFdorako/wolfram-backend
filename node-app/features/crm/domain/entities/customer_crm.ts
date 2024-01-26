class CustomerCRMEntity {
    id?: number;
    userId?: number;
    gender?: string;
    academicTitle?: string;
    customerId?: string;
    firstName: string;
    lastName?: string;
    companyName?: string;
    position?: string;
    email?: string;
    landline?: string;
    phone?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    state?: string;
    country?: string;
    birthDate?: Date;
    lifecyclePosition?: string;
    numberOfBookings?: number;
    lastAppointment?: Date;
    totalRevenue?: number;
    outstandingInvoices?: number;
    customerDiscount?: number;
    newsletterSubscribed?: boolean;
   
    constructor(data: Partial<CustomerCRMEntity>) {
        this.id = data.id;
        this.userId = data.userId;
        this.firstName = data.firstName || '';
        this.gender = data.gender;
        this.academicTitle = data.academicTitle;
        this.customerId = data.customerId;
        this.lastName = data.lastName;
        this.companyName = data.companyName;
        this.position = data.position;
        this.email = data.email;
        this.landline = data.landline;
        this.phone = data.phone;
        this.website = data.website;
        this.instagram = data.instagram;
        this.facebook = data.facebook;
        this.tiktok = data.tiktok;
        this.street = data.street;
        this.houseNumber = data.houseNumber;
        this.postalCode = data.postalCode;
        this.city = data.city;
        this.state = data.state;
        this.country = data.country;
        this.birthDate = data.birthDate;
        this.lifecyclePosition = data.lifecyclePosition;
        this.numberOfBookings = data.numberOfBookings;
        this.lastAppointment = data.lastAppointment;
        this.totalRevenue = data.totalRevenue;
        this.outstandingInvoices = data.outstandingInvoices;
        this.customerDiscount = data.customerDiscount;
        this.newsletterSubscribed = data.newsletterSubscribed;
    }
   }
   