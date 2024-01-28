export interface WasabiRepository {
    generatePresignedUrl(bucket: string, key: string, expires: number): Promise<String>;
}