import { VendorRepository } from '@/repositories/vendor.repository';

export class AuthVendorService {
  private vendorRepository: VendorRepository;

  constructor(repository: VendorRepository = new VendorRepository()) {
    this.vendorRepository = repository;
  }
}

export const authVendorService = new AuthVendorService();
