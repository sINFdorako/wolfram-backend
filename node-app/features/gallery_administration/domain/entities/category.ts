import Image from './image';

class Category {
    id: number;          // Eindeutige ID für die Kategorie
    userId: number;      // Fremdschlüssel für den Benutzer, der die Kategorie erstellt hat
    name: string;        // Name der Kategorie
    description?: string;// Beschreibung der Kategorie
    creationDate: Date;  // Erstellungsdatum der Kategorie
    lastModifiedDate: Date; // Letztes Änderungsdatum der Kategorie
    images?: Image[];    // Eine Liste von Bildern, die zu dieser Kategorie gehören

    constructor(id: number, userId: number, name: string, creationDate: Date, lastModifiedDate: Date) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.creationDate = creationDate;
        this.lastModifiedDate = lastModifiedDate;
    }

}

export default Category;
