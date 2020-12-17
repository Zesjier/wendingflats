/*
    Whenever a "secretlink" is hovered, shows the element (secret)
    whose id is the in the secretlinks data-secret field.
    By default, will hide all such secrets
 */

function getSecret(link){
    return document.getElementById(link.dataset.secret);
}

function openSecret(event){
    getSecret(event.target).classList.remove("hidden");
}

function hideSelf(event){
    this.classList.add("hidden");
}

let secret_links = document.getElementsByClassName("secretlink");

for (var i = 0; i < secret_links.length; i++){
    let secret = getSecret(secret_links.item(i));
    secret.classList.add("hidden");
    secret_links.item(i).onclick = openSecret;
    secret.onclick = hideSelf;
}
