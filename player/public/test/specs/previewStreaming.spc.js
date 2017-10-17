describe("Preview streaming", function() {
    describe("When internet connectivity is ON ", function() {
        it("Should initialize content renderer", function() {

        });

        it("Should initialize content previewStreaming", function() {

        });
        it("Should have validate config object", function() {
            // should have mode, host etc.,
        });

        it("Should load the player core plugins", function() {

        });

        it("Should sync the telemetry to genieservice", function() {

        });
    });

    describe("When internet connectivity is OFF", function() {

        it("Should initialize content renderer", function() {

        });

        it("should not initialize previewStreaming", function() {

        });

        it("Should have the valid config object", function() {

        });

        it("Should load the player core plugins", function() {

        });
        it("Should sync the telemetry to web", function() {

        });

    });

    describe("When content launcher is loaded.", function() {

        describe("When ECML launcher is loaded", function() {

            it("Should have a instance of ECML launcher", function() {

            });

            it("Should load the S3 assets", function() {

            });

            it("Should load the S3 content plugins", function() {

            });

        });
        describe("When HTML launcher is loaded", function() {

            it("Should have a instance of HTML launcher", function() {

            });

        });

    });

    describe("When Telemetry initialized", function() {
        it("Should have a instance of telemetry", function() {

        });
        it("Should sync the telemetry", function() {

        });

    });
});