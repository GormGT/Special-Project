// get user settings from localstorage
const getUserSettings = function(updateDisplayValues) {
    // create object to be returned:
    let settings;

    // if user didn't change their settings (or if no settings were found)
    if (!localStorage.settings) {
        // return default settings
        settings = {
            videoSettings: {
                colorblindMode: false,
                arcadeMode: false,
                brightness: 100
            },
            audioSettings: {
                music: 100,
                weapon: 100,
                soundEffects: 100
            },
            developerSettings: {
                showHitboxes: false,
                showConsoleLogs: false
            }
        };
    } else {
        // if the user has changed the settings, they will be in localstorage, so we can fetch them from localstorage
        settings = JSON.parse(localStorage.settings);
    };

    // update display values on the settings page, if needed
    if (updateDisplayValues) {
        // set all settings values
        videoSliderBrightness.value = settings.videoSettings.brightness;
        
        audioSliderMusic.value = settings.audioSettings.music;
        audioSliderWeapon.value = settings.audioSettings.weapon;
        audioSliderEffects.value = settings.audioSettings.soundEffects;
        
        // set all display values
        brightnessSliderDisplayValue.innerHTML = settings.videoSettings.brightness;
        arcadeCheckDisplayValue.innerHTML = settings.videoSettings.arcadeMode;
        colorblindCheckDisplayValue.innerHTML = settings.videoSettings.colorblindMode;
        
        musicSliderDisplayValue.innerHTML = settings.audioSettings.music;
        weaponSliderDisplayValue.innerHTML = settings.audioSettings.weapon;
        effectSliderDisplayValue.innerHTML = settings.audioSettings.soundEffects;
        
        hitboxesCheckDisplayValue.innerHTML = settings.developerSettings.showHitboxes;
        consoleCheckDisplayValue.innerHTML = settings.developerSettings.showConsoleLogs;
    };

    // return the settings
    return settings;
};