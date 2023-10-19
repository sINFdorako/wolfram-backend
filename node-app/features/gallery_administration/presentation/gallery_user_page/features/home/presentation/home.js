export function homePage() {
    return `
    <section id="gallery-preview" class="py-5">
            <h2 class="text-center  mb-5">Auszug aus der
                Galerie</h2>
                <div class="row mr-5 ml-5">
                </div>
            <br />
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8 col-sm-12 text-center">
                    <a href="/galerie" class="btn custom-btn btn-lg">Zur Galerie</a>
                </div>
            </div>
    </section>

    <section id="about" class="py-5">
    <div class="container">
        <h2 class="text-center  mb-5">Über mich</h2>
        
        <div class="row align-items-center mb-5">
            <!-- Profile Image -->
            <div class="col-lg-6 col-md-6 mb-4 mb-md-0 text-center">
                <img src="../../../assets/wolfram_profile.png" alt="Photographer" class="img-fluid">
            </div>

            <!-- Teaser Content -->
            <div class="col-lg-6 col-md-6">
                <h3 class=" mb-3">Gestaltung und Lernen</h3>
                <p>Das ist gar nicht so einfach, weil dabei einige Dinge zu beachten sind, die für die Gestaltung wichtig sind. Durch den Beitritt zum Fotoclub Erding konnte ich vieles dazu lernen...</p>

                <h3 class=" mb-3 mt-4">Erfolge und Wettbewerbe</h3>
                <p>Die Bilder präsentiere ich auch bei Fotowettbewerben, das brachte mir inzwischen einige erfreuliche Erfolge...</p>

                <div class="mt-4">
                    <a href="/ueber-mich" class="btn custom-btn-secondary btn-lg">Mehr lesen</a>
                </div>
            </div>
        </div>
    </div>

</section>
    <section id="contact" class="py-5 text-center">
        <div class="container">
            <h2 class="text-center  mb-5">Kontakt</h2>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
                    <p class="lead">Sie können mich per E-Mail
                        erreichen:</p>
                    <button class="btn custom-btn btn-lg"
                        onclick="location.href='mailto:wolfram.wildner@t-online.de';">
                        <i class="fa fa-envelope"></i> E-Mail
                        schreiben
                    </button>
                </div>
            </div>
        </div>
    </section>

    `
}