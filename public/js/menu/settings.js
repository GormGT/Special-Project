// popups
const videoSettingsPopup = document.querySelector('.videoSettingsPopup');
const audioSettingsPopup = document.querySelector('.audioSettingsPopup');
const developerModeSettingsPopup = document.querySelector('.devModeSettingsPopup');

// popup close buttons
const videoSettingsClosePopupButton = videoSettingsPopup.querySelector('.closeButton');
const audioSettingsClosePopupButton = audioSettingsPopup.querySelector('.closeButton');
const developerModeClosePopupButton = developerModeSettingsPopup.querySelector('.closeButton');

// toggle popup buttons
const openPopupButtons = document.querySelector('.openPopupButtons');
const videoSettingsButton = document.querySelector('.videoToggleButton');
const audioSettingsButton = document.querySelector('.audioToggleButton');
const developerModeSettingsButton = document.querySelector('.devModeToggleButton');

// settings sliders
const videoSliderBrightness = videoSettingsPopup.querySelector('.videoSliderBrightness');

const audioSliderMusic = audioSettingsPopup.querySelector('.audioSliderMusic');
const audioSliderWeapon = audioSettingsPopup.querySelector('.audioSliderWeapon');
const audioSliderEffects = audioSettingsPopup.querySelector('.audioSliderEffects');

// toggle settings buttons
const videoCheckColorblindMode = videoSettingsPopup.querySelector('.videoCheckColorblindMode');
const videoCheckArcadeMode = videoSettingsPopup.querySelector('.videoCheckArcadeMode');

const developerCheckHitboxes = developerModeSettingsPopup.querySelector('.developerCheckHitboxes');
const developerCheckConsole = developerModeSettingsPopup.querySelector('.developerCheckConsole');

// display value elements (values are displayed here)
const brightnessSliderDisplayValue = document.querySelector('.brightnessSliderDisplayValue');
const colorblindCheckDisplayValue = document.querySelector('.colorblindCheckDisplayValue');
const arcadeCheckDisplayValue = document.querySelector('.arcadeCheckDisplayValue');

const musicSliderDisplayValue = document.querySelector('.musicSliderDisplayValue');
const weaponSliderDisplayValue = document.querySelector('.weaponSliderDisplayValue');
const effectSliderDisplayValue = document.querySelector('.effectSliderDisplayValue');

const consoleCheckDisplayValue = document.querySelector('.consoleCheckDisplayValue');
const hitboxesCheckDisplayValue = document.querySelector('.hitboxesCheckDisplayValue');

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
        developerSettings: {
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

    // main category check - audio, video, developer settings
    if (mainCategory === 'video') {
        // subcategory check - brightness, colorblind, arcade mode
        if (subcategory === 'brightness') {
            newSettings.videoSettings.brightness = videoSliderBrightness.value;
        } else if (subcategory === 'colorblind') {
            if (oldSettings.videoSettings.colorblindMode === true) {
                newSettings.videoSettings.colorblindMode = false;
            } else {
                newSettings.videoSettings.colorblindMode = true;
            };
            colorblindCheckDisplayValue.innerHTML = newSettings.videoSettings.colorblindMode;
        } else if (subcategory === 'arcade') {
            if (oldSettings.videoSettings.arcadeMode === true) {
                newSettings.videoSettings.arcadeMode = false;
            } else {
                newSettings.videoSettings.arcadeMode = true;
            }
            arcadeCheckDisplayValue.innerHTML = newSettings.videoSettings.arcadeMode;
        };
    } else if (mainCategory === 'audio') {
        // subcategory check - audio weapon, audio music, audio effects
        if (subcategory === 'music') {
            newSettings.audioSettings.music = audioSliderMusic.value;
        } else if (subcategory === 'weapon') {
            newSettings.audioSettings.weapon = audioSliderWeapon.value;
        } else if (subcategory === 'effects') {
            newSettings.audioSettings.soundEffects = audioSliderEffects.value;
        };
    } else if (mainCategory === 'developer') {
        // subcategory check - show hitboxes, show console logs
        if (subcategory === 'hitboxes') {
            if (oldSettings.developerSettings.showHitboxes === false) {
                newSettings.developerSettings.showHitboxes = true;
            } else {
                newSettings.developerSettings.showHitboxes = false;
            };
            hitboxesCheckDisplayValue.innerHTML = newSettings.developerSettings.showHitboxes;
        } else if (subcategory === 'console') {
            if (oldSettings.developerSettings.showConsoleLogs === false) {
                newSettings.developerSettings.showConsoleLogs = true;
            } else {
                newSettings.developerSettings.showConsoleLogs = false;
            };
            consoleCheckDisplayValue.innerHTML = newSettings.developerSettings.showConsoleLogs;
        };
    };

    localStorage.settings = JSON.stringify(newSettings);
};

// add event listener to slider settings
const addSliderEventListener = function(sliderElement, displayValueElement, category) {
    sliderElement.addEventListener('input', () => {
        // update display value
        displayValueElement.innerHTML = sliderElement.value;

        // save to localstorage
        saveSettingsToLocalStorage(category);
    });
};

// add event listener to toggled settings
const addToggleEventListener = function(toggleElement, category) {
    // add event listener
    toggleElement.addEventListener('click', () => {
        // save to localstorage
        saveSettingsToLocalStorage(category);
    });
};

// input handlers - video settings
addSliderEventListener(videoSliderBrightness, brightnessSliderDisplayValue, 'video brightness');
addToggleEventListener(videoCheckArcadeMode, 'video arcade');
addToggleEventListener(videoCheckColorblindMode, 'video colorblind');

// input handlers - audio settings
addSliderEventListener(audioSliderMusic, musicSliderDisplayValue, 'audio music');
addSliderEventListener(audioSliderWeapon, weaponSliderDisplayValue, 'audio weapon');
addSliderEventListener(audioSliderEffects, effectSliderDisplayValue, 'audio effects');

// input handlers - developer settings
addToggleEventListener(developerCheckConsole, 'developer console');
addToggleEventListener(developerCheckHitboxes, 'developer hitboxes');

// call getUserSettings(true) to update display values
getUserSettings(true);