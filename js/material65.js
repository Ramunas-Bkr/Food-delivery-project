"use strict";

// const ans = prompt('Įveskite savo vardą');

const reg = /n/g;

// i - randa nepriklausomai nuo registro (didzioji ar mazoji)
// g - randa visas reiksmes
// m - daugiaeiluciu rezimas

// console.log(ans.search(reg));
// console.log(ans.match(reg));

const pass = prompt('Password');

console.log(pass.replace(/./g, '*'));

// reg.test(pass) - iesko ar yra nurodytu simboliu, grazina true/false

// /\d/ - iesko skaiciu
// /\w/ - iesko raidziu
// /\s/ - iesko tarpu