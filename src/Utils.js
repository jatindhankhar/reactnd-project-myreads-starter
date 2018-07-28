import * as BooksAPI from './BooksAPI';

const BOOKS_DATA = "booksData";

export const savetoCache = (data) =>  {
    localStorage.setItem(BOOKS_DATA,JSON.stringify(data));
        return getfromCache();
}

export const getfromCache = () => {return JSON.parse(localStorage.getItem(BOOKS_DATA))}

export const isDataCached = () => {
    let data = getfromCache();
    return (data || data === "");
}

// Saves data only if not cached
export const saveData = (data,update=false) => {
      if(update)
        return savetoCache(data);
    else{
      if(! isDataCached())
       return  savetoCache(data);
    }
}

export const fetchandSave = (data) => {
    return BooksAPI.getAll().then(saveData);
}

// Miss and cache
export const initData = () => {
    if(isDataCached())
        return new Promise((resolve,reject) => resolve(getfromCache()));
    return fetchandSave();
    //return new Promise((resolve,reject) => resolve(data));
}
