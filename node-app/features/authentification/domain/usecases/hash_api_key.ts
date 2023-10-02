import crypto from 'crypto';

export class HashApiKey {
    constructor(private apiKey: string) { };

    execute(): string {
        const hash = crypto.createHash('sha256');
        return hash.update(this.apiKey).digest('hex');
    }
}