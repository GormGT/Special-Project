// popups
const videoSettingsPopup = document.querySelector('.videoSettingsPopup');
const audioSettingsPopup = document.querySelector('.audioSettingsPopup');
const developerModeSettingsPopup = document.querySelector('.devModeSettingsPopup');

// popup close buttons
const videoSettingsClosePopupButton = videoSettingsPopup.querySelector('.closeButton');
const audioSettingsClosePopupButton = audioSettingsPopup.querySelector('.closeButton');
const developerModeClosePopupButton = developerModeSettingsPopup.querySelector('.closeButton');

// toggle buttons
const openPopupButtons = document.querySelector('.openPopupButtons');
const videoSettingsButton = document.querySelector('.videoToggleButton');
const audioSettingsButton = document.querySelector('.audioToggleButton');
const developerModeSettingsButton = document.querySelector('.devModeToggleButton');

// sliders
const audioSliderMusic = audioSettingsPopup.querySelector('.audioSliderMusic');
const audioSliderWeapon = audioSettingsPopup.querySelector('.audioSliderWeapon');
const audioSliderEffects = audioSettingsPopup.querySelector('.audioSliderEffects');

// display value elements (values are displayed here)
const musicSliderDisplayValue = document.querySelector('.musicSliderDisplayValue');
const weaponSliderDisplayValue = document.querySelector('.weaponSliderDisplayValue');
const effectSliderDisplayValue = document.querySelector('.effectSliderDisplayValue');

// toggle popups
const toggleVideoSettingsPopup = function(open) {
    if (open) {
        // open the popup
        videoSettingsPopup.classList.remove('hidden');
        openPopupButtons.classList.add('hidden');
    } else {
        // close the popup
        videoSettingsPopup.classList.add('hidden');
        openPopupButtons.classList.remove('hidden');
    };
};

const toggleAudioSettingsPopup = function(open) {
    if (open) {
        // open the popup
        audioSettingsPopup.classList.remove('hidden');
        openPopupButtons.classList.add('hidden');
    } else {
        // close the popup
        audioSettingsPopup.classList.add('hidden');
        openPopupButtons.classList.remove('hidden');
    };
};

const toggleDeveloperModeSettingsPopup = function(open) {
    if (open) {
        // open the popup
        developerModeSettingsPopup.classList.remove('hidden');
        openPopupButtons.classList.add('hidden');
    } else {
        // close the popup
        developerModeSettingsPopup.classList.add('hidden');
        openPopupButtons.classList.remove('hidden');
    };
};

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
            arcadeMode: false,
            brightness: 100
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

    // check for old settings & fetch them
    if (localStorage.settings) {
        // if settings exist in localstorage, override the default settings (oldSettings) with settings from localstorage
        oldSettings = JSON.parse(localStorage.settings);
    }

    // settings will be stored here, and be updated with the value that changed:
    let newSettings = oldSettings;

    // main category check - audio, video, etc
    if (mainCategory === 'video') {
        // subcategory check - brightness, colorblind, arcade mode
    } else if (mainCategory === 'audio') {
        // subcategory check - audio weapon, audio music, audio effects
        if (subcategory === 'music') {
            newSettings.audioSettings.music = audioSliderMusic.value;
        } else if (subcategory === 'weapon') {
            newSettings.audioSettings.weapon = audioSliderWeapon.value;
        } else if (subcategory === 'effects') {
            newSettings.audioSettings.soundEffects = audioSliderEffects.value;
        };
    }

    localStorage.settings = JSON.stringify(newSettings);
}

// input handlers - audio settings
audioSliderMusic.addEventListener('input', () => {
    // update display value
    musicSliderDisplayValue.innerHTML = audioSliderMusic.value;

    // save to localstorage
    saveSettingsToLocalStorage('audio music');
});

audioSliderWeapon.addEventListener('input', () => {
    // update display value
    weaponSliderDisplayValue.innerHTML = audioSliderWeapon.value;

    // save to localstorage
    saveSettingsToLocalStorage('audio weapon');
});

audioSliderEffects.addEventListener('input', () => {
    // update display value
    effectSliderDisplayValue.innerHTML = audioSliderEffects.value;

    // save to localstorage
    saveSettingsToLocalStorage('audio effects');
});

// save & fetch local storage
if (!localStorage.settings) {
    // if no settings found, reset settings to default
    const settings = {
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
        developerMode: {
            showHitboxes: false,
            showConsoleLogs: false
        }
    };

    // set all slider values
    audioSliderMusic.value = settings.audioSettings.music;
    audioSliderWeapon.value = settings.audioSettings.weapon;
    audioSliderEffects.value = settings.audioSettings.soundEffects;

    // set all display values
    musicSliderDisplayValue.innerHTML = settings.audioSettings.music;
    weaponSliderDisplayValue.innerHTML = settings.audioSettings.weapon;
    effectSliderDisplayValue.innerHTML = settings.audioSettings.soundEffects;
} else {
    // if settings found, fetch & apply them
    const settings = JSON.parse(localStorage.settings);

    // set all slider values
    audioSliderMusic.value = settings.audioSettings.music;
    audioSliderWeapon.value = settings.audioSettings.weapon;
    audioSliderEffects.value = settings.audioSettings.soundEffects;

    // set all display values
    musicSliderDisplayValue.innerHTML = settings.audioSettings.music;
    weaponSliderDisplayValue.innerHTML = settings.audioSettings.weapon;
    effectSliderDisplayValue.innerHTML = settings.audioSettings.soundEffects;
};