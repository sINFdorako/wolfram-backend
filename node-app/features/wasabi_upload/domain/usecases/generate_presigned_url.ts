import { WasabiRepository } from '../repositories/wasabi_repository';

export class GeneratePresignedUrl {
    constructor(private repository: WasabiRepository) {}

    async execute(bucket: string, key: string, epxires: number): Promise<String> {
        return await this.repository.generatePresignedUrl(bucket, key, epxires);
    }
}

