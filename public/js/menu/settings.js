// popups
const videoSettingsPopup = document.querySelector('.videoSettingsPopup');
const audioSettingsPopup = document.querySelector('.audioSettingsPopup');
const colorBlindSettingsPopup = document.querySelector('.colorblindSettingsPopup');
const developerModeSettingsPopup = document.querySelector('.devModeSettingsPopup');
const arcadeModeSettingsPopup = document.querySelector('.arcadeModeSettingsPopup');

// toggle buttons
const videoSettingsButton = document.querySelector('.videoToggleButton');
const audioSettingsButton = document.querySelector('.audioToggleButton');
const colorBlindSettingsButton = document.querySelector('.colorblindToggleButton');
const developerModeSettingsButton = document.querySelector('.devModeToggleButton');
const arcadeModeSettingsButton = document.querySelector('.arcadeModeToggleButton');

// sliders
const audioSliderMusic = audioSettingsPopup.querySelector('.audioSliderMusic');
const audioSliderWeapon = audioSettingsPopup.querySelector('.audioSliderWeapon');

// display value elements (values are displayed here)
const musicSliderDisplayValue = document.querySelector('.musicSliderDisplayValue');
const weaponSliderDisplayValue = document.querySelector('.weaponSliderDisplayValue');

// toggle popups
audioSettingsButton.addEventListener('click', () => {
    audioSettingsPopup.classList.toggle('hidden');
});

// save settings function - "settingsType" parameter = which settings are being stored
const saveSettingsToLocalStorage = function(settingsType) {
    // get settings categories
    settingsType = settingsType.split(' ');
    const mainCategory = settingsType[0];
    const subcategory = settingsType[1];

    // TODO: fill out oldSettings with default settings
    let oldSettings = {
        videoSettings: {
            colorblindMode: false,
            arcadeMode: false
        },
        audioSettings: {
            music: 100,
            weapon: 100,
            soundEffect: 100
        },
        developerMode: {
            showHitboxes: false,
            showConsoleLogs: false
        }
    };

    // check for old settings & fetch them
    if (localStorage.settings) {
        // if settings exist in localstorage, override the default settings (oldSettings) with settings from localstorage
        oldSettings = JSON.parse(localStorage.settings);
    }

    // settings will be stored here, and be updated with the value that changed:
    let newSettings = oldSettings;

    // main category check - audio, video, etc
    if (mainCategory === 'audio') {
        // subcategory check - audio weapon, audio music, etc
        if (subcategory === 'music') {
            newSettings.audioSettings.music = audioSliderMusic.value;
        } else if (subcategory === 'weapon') {
            newSettings.audioSettings.weapon = audioSliderWeapon.value;
        }
    }

    localStorage.settings = JSON.stringify(newSettings);
}

// input handlers - audio settings
audioSliderMusic.addEventListener('input', () => {
    musicSliderDisplayValue.innerHTML = audioSliderMusic.value;

    saveSettingsToLocalStorage('audio music');
});

audioSliderWeapon.addEventListener('input', () => {
    weaponSliderDisplayValue.innerHTML = audioSliderWeapon.value;

    saveSettingsToLocalStorage('audio weapon');
});

// save & fetch local storage
if (!localStorage.settings) {
    // if no settings found, reset settings to default
    const settings = {
        videoSettings: {
            colorblindMode: false,
            arcadeMode: false
        },
        audioSettings: {
            music: 100,
            weapon: 100,
            soundEffects: 100
        },
        developerMode: {
            showHitboxes: false,
            showConsoleLogs: false
        }
    };

    // set all slider values
    audioSliderMusic.value = settings.audioSettings.music;
    audioSliderWeapon.value = settings.audioSettings.weapon;

    // set all display values
    musicSliderDisplayValue.innerHTML = settings.audioSettings.music;
    weaponSliderDisplayValue.innerHTML = settings.audioSettings.weapon;
} else {
    // if settings found, fetch & apply them
    const settings = JSON.parse(localStorage.settings);
    console.log(settings);

    // set all slider values
    audioSliderMusic.value = settings.audioSettings.music;
    audioSliderWeapon.value = settings.audioSettings.weapon;

    // set all display values
    musicSliderDisplayValue.innerHTML = settings.audioSettings.music;
    weaponSliderDisplayValue.innerHTML = settings.audioSettings.weapon;
}