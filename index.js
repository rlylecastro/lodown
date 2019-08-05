'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Takes any value and returns that value.
 * 
 * @param {Any data type} val: any value
 * 
 * @return {Any data type} val: the value passed, unchanged
 */

function identity(val) {
    return val;
}
module.exports.identity = identity;

/**
 * typeOf: Takes any value and  defines the data type.
 * 
 * @param {Any data type} val: Any value
 * 
 * @return {String}: Returns a string corresponding to the datatype of val
 */
function typeOf(val) {
    switch (typeof val) {
        //case str, num, bool, undef: typeof returns the value type as a string
        case 'string' :
        case 'number' :
        case 'boolean' :
        case 'undefined' :
        case 'function' :
            return typeof val;
        case 'object' : //distinguish between arr, obj, date, null
            if (val === null) return 'null';
            if (Array.isArray(val)) return 'array';
            if (val instanceof Date) return 'date';
            return 'object';
        
    }
}
module.exports.typeOf = typeOf;

/**
 * @first: Takes an array and a number num, and returns the first num terms of the array.
 * 
 * @param {Array} arr: An array from which to pull values
 * @param {Number} num: A number. If num is less than 1, first returns an empty array. If
 *  num is greater than the length of the array, first returns the entire array.
 * 
 * @return {Array} result: returns an array of num elements, starting from index 0
 *  of the input array, except in the cases outlined above.
 */
 
function first(arr, num) {
    let result = [];
    if (!Array.isArray(arr) || num < 1) {
        return [];
    }
    if (typeof num !== 'number') {
        return arr[0];
    }
    if (num > arr.length) {
        return arr;
    }
    for (let i = 0; i < num; i++) {
        result.push(arr[i]);
    }
    return result;
}
module.exports.first = first;

/**
 * last: Takes an array and a number num, and returns the last num terms of the array.
 * 
 * @param {Array} arr: An array from which to pull values
 * @param {Number} num: A number. If num is less than 1, last returns an empty array. If
 *  num is greater than the length of the array, last returns the entire array.
 * 
 * @return {Array} result: Returns an array of num elements, starting from the num'th
 *  to last element of the input array, except in the cases outlined above.
 */ 
 
function last(arr, num) {
    let result = [];
    if (!Array.isArray(arr) || num < 1) {
        return [];
    }
    if (typeof num !== 'number') {
        return arr[arr.length - 1];
    }
    if (num > arr.length) {
        return arr;
    }
    result = arr.slice(-num)
    return result;    
}
module.exports.last = last;

/**
 * indexOf: Takes an array and a value, and returns the index of the array where the 
 *  value first occurs, or -1 if the vaue is not found.
 * 
 * @param {Array} arr: An array over which to iterate.
 * @param {Any data type} val: A value searched for in arr
 * 
 * @return {Number} i: Returns the first index of the array where val is found, or -1
 *  if the value is not found in arr
 */
 
function indexOf(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: Takes an array and a value, and checks if the value matches at least one
 *  value of the array.
 * 
 * @param {Array} arr: An array over which to iterate
 * @param {Any data type} val: Any value, to be checked whether it is present in arr
 * @return {Boolean} :Returns true if the value is found in arr, or false otherwise.
 */
 
function contains(arr, val) {
    return arr.includes(val) ? true : false;
}
module.exports.contains = contains;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, func) {
    switch (typeOf(collection)) {
        case 'array' :
            for (let i = 0; i < collection.length; i++) {
                func(collection[i], i, collection);
            }
            break;
        case 'object' :
            for (let key in collection) {
                func(collection[key], key, collection);
            }
            break;
    }
}
module.exports.each = each;

/**
 * unique: Takes an array, and returns a new array equal to the input array, but with duplicate values removed. 
 * 
 * @param {Array} arr: An array over which to iterate.
 * 
 * @return {Array} uniques: Returns a new array containing a single copy of each of
 *  the unique values of the input array.
 */
 
function unique(arr) {
    let uniques = [];
    for (let i = 0; i < arr.length; i++) {
        if (indexOf(uniques, arr[i]) === -1) {
            uniques.push(arr[i]);
        }
    }
    return uniques;
}
module.exports.unique = unique;

/**
 * filter: Takes an array and a test function. For each element, if the test function returns true, the element
 *  gets pushed to a result array. Returns the result array, containing the values that passed.
 * 
 * @param {Array} arr: an array over which to iterate
 * @param {Function} func: a test function. If the element passes the function,
 *  the element gets pushed to a result array. the return array.
 * @return {Array} result: Returns an array of all elements for which func returned true.
 */
 
function filter(arr, func) {
    let result = [];
    each(arr, (e, i, a) => {
        if (func(e, i, a)) result.push(e);
    });
    return result;
}
module.exports.filter = filter;

/**
 * reject: Takes an array and a test function. For each element, if the test function returns false, the element
 *  gets pushed to a result array. Returns the result array, containing the values that failed.
 * 
 * @param {Array} arr: an array over which to iterate
 * @param {Function} func: a test function. If the element does not pass the function,
 *  the element gets pushed to the result array.
 * @return {Array} result: Returns an array of all elements for which func returned false.
 */
 
function reject(arr, func) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        func(arr[i], i, arr);
        if (!func(arr[i], i, arr)) result.push(arr[i]);
    }
    return result;
}
module.exports.reject = reject;

/**
 * partition: Takes an array and a test function. Returns an array with two sub-arrays: arr[0], containing all
 *  elements for which the test function returned true, and arr[1]; containing all elements for which the test
 *  function returned false.
 * 
 * @param {Array} arr: an array over which to iterate
 * @param {Function} func: a test function
 * @return {Array} Returns an array of two sub-arrays: arr[0], contianing all passing elements, 
 *  and arr[1], containing all failing elements.
 */
 
function partition(arr, func) {
    return [filter(arr, func), reject(arr, func)];
}
module.exports.partition = partition;

/**
 * map: Takes a collection (either an array or an object) and a function. Calls the function for each element/value
 *  in the collection, and pushes the return of that function to a new result array.
 * 
 * @param {Array or Object} collection: An array or an object
 * @param {Function} func: A function, which takes the parameters (element, index, collection) if collection 
 *  is an array, or (value, key, collection) if collection is an object
 * @return {Array} result: Returns an array containing the return of func for each value of collection
 */
 
function map(collection, func) {
    let result = [];
    switch (typeOf(collection)) {
        case 'array' :
            for (let i = 0; i < collection.length; i++) {
                result.push(func(collection[i], i, collection));
            }
            break;
        case 'object' :
            for (let key in collection) {
                result.push(func(collection[key], key, collection));
            }
            break;
    }
    return result;
}
module.exports.map = map;

/**
 * pluck: Takes an array of objects and a property. Returns an array containing the value stored in the given property
 *  for each value in the array.
 * 
 * @param {Array} arr: An array, each element of which is an object.
 * @param {String} prop A property, equal to some key in a key-value pair.
 * @return {Array} Returns an array containing the value of prop for each element in arr.
 */
 
function pluck(arr, prop) {
    return map(arr, (e) => {return e[prop]});
}
module.exports.pluck = pluck;

/**
 * every: Takes a collection (either an array or an object) and a test function. Returns true if every element in
 *  the collection returns true, and returns false otherwise.
 * 
 * @param {Array or Object} collection: An array or an object over which to iterate
 * @param {Function} func: A test function, applied to each element in collection
 * @return {Boolean} Returns true if the function returns true for each element in the collection, and false otherwise.
 */
 
function every(collection, func) {
    if (!func) return !collection.includes(false);
    let results = map(collection, func);
    for (let i = 0; i < results.length; i++) {
        if (results[i] == false) return false;
    }
    return true;
}
module.exports.every = every;

/**
 * some: Takes a collection (either an array or an object) and a test function. Returns true if at least one element in
 *  the collection returns true, and returns false otherwise.
 * 
 * @param {Array or Object} collection: An array or an object over which to iterate
 * @param {Function} func: A test function, applied to each element in collection
 * @return {Boolean} Returns true if the function returns true for at least one
 *  element in the collection, and false otherwise.
 */
 
function some(collection, func) {
    if (!func) return collection.includes(true);
    let results = map(collection, func);
    for (let i = 0; i < results.length; i++) {
        if (results[i] == true) return true;
    }
    return false;
}
module.exports.some = some;

/**
 * reduce: Takes an array, a function, and a seed value. For each element in the array, runs the function, passing
 *  the parameters of (an incrementer value (or seed for the first iteration)), the current element, 
 *  the current index). The function updates the incrementer value, and then continues to the next element in the
 *  array. After the function has run for each element, returns the final value of the incrementer.
 * 
 * @param {Array} arr: An array over which to iterate.
 * @param {Function} func: A function that iterates over arr, changing an incrementer value which starts at seed
 * @param {Any data type} seed: An incrementer value, which changes for each call of func
 * 
 * @return {Any data type} prev: Returns the final value of the incrementer, after func runs for the final element
 *  of arr.
 */
 
function reduce(arr, func, seed) {
    let prev = seed;
    let i = 0;
    if (seed === undefined) {
        prev = arr[0];
        i++;
    }
    for (i; i < arr.length; i++) {
        func(prev, arr[i], i);
        prev = func(prev, arr[i], i);
    }
    return prev;
}
module.exports.reduce = reduce;

/**
 * extend: Takes any number of objects, and updates the first object passed with the properties and values of
 *  every subsequent object passed.
 * 
 * @param {Object} obj: An object, to which extend will add key-value pairs.
 * @param {Object} obj(1, 2, ...n) Any number of additional objects, the key-value pairs of which will be appended
 *  to the first obj.
 * @return {Object} obj: Returns the first object passed, with all of the key-value pairs of the subsequent
 *  passed objects.
 */
 
function extend(obj) {
    let i = 1;
    while (i < arguments.length) {
        for (let key in arguments[i]) {
            obj[key] = arguments[i][key];
        }
        i++;
    }
    return obj;
}
module.exports.extend = extend;