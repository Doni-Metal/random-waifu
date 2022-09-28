const API = 'https://api.waifu.pics';
const sfwCategories = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", "handhold", "nom", "bite",  "glomp", "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"]
const nsfwCategories = ["waifu", "neko", "trap", "blowjob"]

const categories = document.querySelector('.categories')
const btnNSFW = document.querySelector('.btnNSFW');
const btnSFW = document.querySelector('.btnSFW');
const IMG = document.querySelector('.waifuImg');
const catBtn = document.querySelector('.catBtn');

btnSFW.addEventListener("click", showCategories);
btnNSFW.addEventListener("click", showCategories)

let type = undefined;

async function showCategories() {  
  if (this.getAttribute('id') =='sfw') {
    type = 'sfw'
    createNode(sfwCategories)
  } else {
    type = 'nsfw'
    createNode(nsfwCategories);
  }
}

function createNode(arr) {
  let child = categories.lastElementChild;
  while (child) {
    categories.removeChild(child)
    child = categories.lastElementChild;
  }
  arr.forEach(cat => {
    let node = document.createElement('button');
    node.setAttribute('id', `${cat}`);
    node.setAttribute('class', `catBtn`);
    node.addEventListener('click', fetchWaifu);
    node.innerText = `${cat}`
    categories.appendChild(node)
  })
}

async function fetchWaifu() {
  try {
    const category = this.getAttribute('id');
    const req = await fetch(`${API}/${type}/${category}`);
    const image = await req.json();
    IMG.setAttribute('src', image.url)

  } catch (error) {
    console.log(new Error(error))
  }
};
