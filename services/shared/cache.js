export class Cache{

    static save(key,data){
        localStorage.setItem(key,JSON.stringify(data));
    }

    static load(key){
        const value=localStorage.getItem(key);
        return value?JSON.parse(value):null;
    }

    static remove(key){
        localStorage.removeItem(key);
    }

}
