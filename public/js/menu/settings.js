// popups
const videoSettingsPopup = document.querySelector('.videoSettingsPopup');
const audioSettingsPopup = document.querySelector('.audioSettingsPopup');
const colorBlindSettingsPopup = document.querySelector('.colorblindSettingsPopup');
const devModeSettingsPopup = document.querySelector('.devModeSettingsPopup');
const arcadeModeSettingsPopup = document.querySelector('.arcadeModeSettingsPopup');

// toggle buttons
const videoSettingsButton = document.querySelector('.videoToggleButton');
const audioSettingsButton = document.querySelector('.audioToggleButton');
const colorBlindSettingsButton = document.querySelector('.colorblindToggleButton');
const devModeSettingsButton = document.querySelector('.devModeToggleButton');
const arcadeModeSettingsButton = document.querySelector('.arcadeModeToggleButton');

// sliders
const audioSliderMusic = audioSettingsPopup.querySelector('.audioSliderMusic');
const audioSliderWeapon = audioSettingsPopup.querySelector('.audioSliderWeapon');

// values
const musicSliderValue = document.querySelector('.musicSliderValue');
const weaponSliderValue = document.querySelector('.weaponSliderValue');

// toggle popups
audioSettingsButton.addEventListener('click', () => {
    audioSettingsPopup.classList.toggle('hidden');
});

// input handlers
audioSliderMusic.addEventListener('input', (e) => {
    musicSliderValue.innerHTML = audioSliderMusic.value;
});

audioSliderWeapon.addEventListener('input', () => {
    weaponSliderValue.innerHTML = audioSliderWeapon.value;
});