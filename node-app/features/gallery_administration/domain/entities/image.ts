class Image {
    id: number;  // Eindeutige ID für das Bild
    userId: number; // Fremdschlüssel für den Benutzer, der das Bild hochgeladen hat
    categoryId: number; // Fremdschlüssel für die Kategorie, zu der dieses Bild gehört
    url: string; // URL des hochgeladenen Bildes (z. B. Pfad in einem Cloud-Speicher)
    filename: string; // Name der hochgeladenen Datei
    fileSize: number; // Dateigröße in Bytes
    mimeType: string; // MIME-Typ des Bildes, z.B. "image/jpeg"
    
    // Allgemeine Daten
    title?: string; // Bildtitel
    description?: string; // Beschreibung des Bildes
    uploadDate: Date; // Hochladedatum des Bildes
    lastModifiedDate: Date; // Letztes Änderungsdatum des Bildes
    tags?: string[]; // Tags oder Schlagworte zum Bild

    // EXIF-Daten
    cameraMake?: string; // Kamerahersteller
    cameraModel?: string; // Kameramodell
    exposureTime?: number; // Belichtungszeit
    aperture?: number; // Blende
    iso?: number; // ISO-Wert
    focalLength?: number; // Brennweite
    flashUsed?: boolean; // Blitz benutzt?

    // IPTC-Daten
    creator?: string; // Fotograf oder Künstler
    copyright?: string; // Copyright-Informationen
    creationDate?: Date; // Erstellungsdatum des Bildes

    constructor(id: number, userId: number, categoryId: number, url: string, filename: string, fileSize: number, mimeType: string, uploadDate: Date, lastModifiedDate: Date) {
        this.id = id;
        this.userId = userId;
        this.categoryId = categoryId;
        this.url = url;
        this.filename = filename;
        this.fileSize = fileSize;
        this.mimeType = mimeType;
        this.uploadDate = uploadDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}

export default Image;
