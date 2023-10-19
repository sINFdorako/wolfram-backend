export function calendarPage() {
    return `
        <section id="calendar-section" class="mt-5">
        <div class="container">
            <h3 class="text-center mb-5">Mein Kalender</h3>
            <div class="row justify-content-center align-items-center">
                <!-- Calendar Image -->
                <div class="col-md-6">
                    <img id="calendar-image" src="../../../assets/kalender.jpg" alt="Calendar Image" class="img-fluid">
                </div>
                <!-- Description and Button -->
                <div class="col-md-6">
                    <div class="calendar-card">
                        <div class="calendar-card-title">
                            <a target="_blank" href="https://www.calvendo.de/galerie/stimmungsvolles-island/?s=tag:island&">Stimmungsvolles Island</a>
                        </div>
                        <div class="calendar-card-description">
                            Der Kalender „Stimmunsvolles Island“ ist auch für das Jahr 2024 verfügbar.
                        </div>
                        <button id="calendar-button" class="btn custom-btn mt-3">Mehr Infos</button>
                    </div>
                </div>
            </div>
        </div>
        </section>
    `
}