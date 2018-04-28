export const arrayDeleteItem = (array,item)=>{
  let newArray = [];
  for(let i in array){
    if(!equal(array[i],item)){
      newArray.push(array[i]);
    }
  }
  return newArray;
};

export const arrayHas = (array,item) =>{
  for(let i in array){
    if(equal(array[i],item)){
      return true;
    }
  }
  return false;
};

/*判断两个变量是否相等（数组、字符串、对象等），返回true/false*/
export const equal = ( x, y ) =>{
// If both x and y are null or undefined and exactly the same
  if ( x === y ) {
    return true;
  }

// If they are not strictly equal, they both need to be Objects
  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
    return false;
  }

//They must have the exact same prototype chain,the closest we can do is
//test the constructor.
  if ( x.constructor !== y.constructor ) {
    return false;
  }

  for ( let p in x ) {
    //Inherited properties were tested using x.constructor === y.constructor
    if ( x.hasOwnProperty( p ) ) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined
      if ( ! y.hasOwnProperty( p ) ) {
        return false;
      }

      // If they have the same strict value or identity then they are equal
      if ( x[ p ] === y[ p ] ) {
        continue;
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal
      if ( typeof( x[ p ] ) !== 'object' ) {
        return false;
      }

      // Objects and Arrays must be tested recursively
      if ( ! equal( x[ p ], y[ p ] ) ) {
        return false;
      }
    }
  }

  for (let p in y ) {
    // allows x[ p ] to be set to undefined
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
      return false;
    }
  }
  return true;
};
