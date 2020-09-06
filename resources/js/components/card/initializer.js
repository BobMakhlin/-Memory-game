
export default function initCard(component) {

    let nCardBack = component.querySelector('.card__back');

    nCardBack.addEventListener('click', () => {
        component.classList.remove('card_flipped');
    });

}
