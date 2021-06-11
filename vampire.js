class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfPeople = 0;
    let currentVampire = this;
    //climb up tree
    while (currentVampire.creator){
      currentVampire = currentVampire.creator;
      numberOfPeople++;
    } 
    return numberOfPeople;
  }
  

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  get ListofDecendants() {
    const decendants = [];
    let currentVampire = this;
    while (currentVampire.creator){
      decendants.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    } 
    return decendants;
  }


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
    let thisDecen = this.ListofDecendants;
    let vampDecen = vampire.ListofDecendants;

    thisDecen.unshift(this);
    vampDecen.unshift(vampire);
    
    vampDecen = vampDecen.reverse();
    thisDecen = thisDecen.reverse();
    
    const shortestList = Math.min(vampDecen.length,
      thisDecen.length)

    for (let i = 0; i < shortestList; i++) {
      if (thisDecen[i] !== vampDecen[i]){
        return thisDecen[i-1]; // case 1
      }
    } 
    return thisDecen[shortestList-1] // case 2
  }
}

module.exports = Vampire;

