

let concreteNouns = ['sea', 'ship','sail','wind', 'breeze', 'wave'];
let abstractNouns = ['adventure', 'death','life','love','faith', 'courage','endurance','desolation'];
let transitiveVerbs = ['command', 'view','lead','pull', 'love', 'desire',];
let intransitiveVerbs = ['travel', 'sail','wave','grow','rise','fall'];
let adjectives = ['big', 'small','crazily','cold','warm'];
let adverbs = ['calmly', 'swiftly','roughly'];
let empty = [''];
let interjections = ['oh', 'noh','lord','god','wow'];
let poem = '';

  // Order of the sentences
  /*
  'The 5 1 6 3s the 1.'
    +'\n5, 5 1s 6 3 a 5, 5 1.'
    +'\n2 is a 5 1.'
    +'\n9, 2!'
    +'\n1s 4!'
    +'\nThe 1 4s like a 5 1.'
    +'\n1s 4 like 5 1s.'
    +'\nWhy does the 1 4?'
    +'\n4 6 like a 5 1.'
    +'\n2, 2, and 2.'
    +'\nWhere is the 5 1?'
    +'\nAll 1s 3 5, 5 1s.'
    +'\nNever 3 a 1.'

   */

  poem = poem + 'The ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] + ' ' + adverbs[rnd(adverbs.length)] + ' ' + transitiveVerbs[rnd(transitiveVerbs.length)] + 's the ' + concreteNouns[rnd(concreteNouns.length)] + '. ';
  poem = poem + adjectives[rnd(adjectives.length)] + ' ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] +'s  ' + adverbs[rnd(adverbs.length)] + ' ' + transitiveVerbs[rnd(transitiveVerbs.length)] + ' a ' + adjectives[rnd(adjectives.length)] + ',' + ' ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] +'. ';
  poem = poem + (abstractNouns[rnd(abstractNouns.length)] + ' ' + 'is a ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] + '. ');
  poem = poem + (interjections[rnd(interjections.length)] + ' ' + abstractNouns[rnd(abstractNouns.length)] + '! ');
  poem = poem + (concreteNouns[rnd(concreteNouns.length)] + 's' + ' ' + transitiveVerbs[rnd(transitiveVerbs.length)] + '! ');
  poem = poem + ('The ' + concreteNouns[rnd(concreteNouns.length)] + ' ' + transitiveVerbs[rnd(transitiveVerbs.length)] + 's' + 'like a ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] + '. ');
  poem = poem + (concreteNouns[rnd(concreteNouns.length)] + 's' + transitiveVerbs[rnd(transitiveVerbs.length)] + ' like ' + adjectives[rnd(adjectives.length)] + ' ' +  concreteNouns[rnd(concreteNouns.length)] + 's. ');
  poem = poem + ('Why does the ' + concreteNouns[rnd(concreteNouns.length)] + ' ' + transitiveVerbs[rnd(transitiveVerbs.length)] + '?');
  poem = poem + (adjectives[rnd(adjectives.length)] + ' ' + adverbs[rnd(adverbs.length)] + ' ' + 'like a ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] + '. ');
  poem = poem + (abstractNouns[rnd(abstractNouns.length)] + ', ' + abstractNouns[rnd(abstractNouns.length)] + ', and' + abstractNouns[rnd(abstractNouns.length)] + '. ');
  poem = poem + ('Where is the ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)]) + '? ';
  poem = poem + ('All ' + concreteNouns[rnd(concreteNouns.length)] + 's ' + transitiveVerbs[rnd(transitiveVerbs.length)] + ' ' + adjectives[rnd(adjectives.length)] + ', ' + adjectives[rnd(adjectives.length)] + ' ' + concreteNouns[rnd(concreteNouns.length)] +'s. ');
  poem = poem +('Never ' + transitiveVerbs[rnd(transitiveVerbs.length)] + ' a ' + concreteNouns[rnd(concreteNouns.length)] + '. ');

console.log(poem);
// OUTPUT TO A DIV CONTAINER IN HTML
function rnd(max) {
  return Math.floor((Math.random() * max) + 0);
}

export default poem;
