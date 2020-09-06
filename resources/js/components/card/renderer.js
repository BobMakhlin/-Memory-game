
export default function createCard(image) {
    let nContainer = document.createElement('div');
    nContainer.className = 'card';

    nContainer.innerHTML = `
        <div class="card__side card__front">
            <img class="card__img" src="${image}" alt="">
        </div>

        <div class="card__side card__back"></div>
    `;

    return nContainer;
}