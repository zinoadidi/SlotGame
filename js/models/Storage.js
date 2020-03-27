export class Storage {


    constructor(reelObjects,balance){
        this.db = {
            'reelObjects':{},
            'totalReels':0,
            'balance':0
        };
        this.set('balance',balance);
        this.set('reels',reelObjects);
    }

    set (name,value){
        this['db'][name] = value;
        sessionStorage.db = JSON.stringify(this['db']);
    }

    get (name){
        this['db'] = JSON.parse(sessionStorage.db);
        return this['db'][name];
    }
};

