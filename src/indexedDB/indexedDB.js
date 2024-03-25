const STATUS_MAP = {
  PENDING: "pending",
  NEW: "new",
  OLD: "old",
};

/**
 * indexedDB 的 help，基础功能的封装
 * * 打开数据库，建立对象仓库，获取连接对象，实现增删改查
 * * info 的结构：
 * * * dbFlag: '' // 数据库标识，区别不同的数据库
 * * * dbConfig: { // 连接数据库
 * * * * dbName: '数据库名称',
 * * * * version: '数据库版本',
 * * * },
 * * * stores: {
 * * * * storeName: { // 对象仓库名称
 * * * * * id: 'id', // 主键名称
 * * * * * index: { // 可以不设置索引
 * * * * * * name: ture, // key：索引名称；value：是否可以重复
 * * * * * }
 * * * * }
 * * * },
 * * * init: (help) => {} // 完全准备好之后的回调函数
 */
export class IndexedDBHelp {
  myIndexedDB;
  _info;
  _db = null;
  _storeState = STATUS_MAP.PENDING;
  // 注册回调：indexedDB连接完成后执行
  _regCallback = [];
  _dbRequest;

  constructor({ stores, dbConfig, dbFlag, init }) {
    this.myIndexedDB = window.indexedDB;
    if (!this.myIndexedDB) {
      throw new TypeError("您的浏览器不支持indexedDB!");
    }
    this._info = {
      dbname: dbConfig.dbname,
      version: dbConfig.version,
    };

    // 链接数据库，异步操作
    this._dbRequest = this.myIndexedDB.open(
      this._info.dbname,
      this._info.version
    );

    // 首次打开/数据库升级时触发
    this._dbRequest.onupgradeneeded = (event) => {
      this._storeState = STATUS_MAP.NEW;
      const db = event.target.result;

      for (const key in stores) {
        const store = stores[key];
        if (db.objectStoreNames.contains(key)) {
          // 仓库存在，判断是否删除
          if (store.isClear) {
            db.deleteObjectStore(key);
            // 建立新对象仓库
            const objectStore = db.createObjectStore(key, {
              keyPath: store.id,
            });
            // 创建索引
            for (const key2 in store.index) {
              const unique = store.index[key2];
              objectStore.createIndex(key2, key2, { unique });
            }
          }
        }
        // 仓库不存在，创建新仓库
        else {
          const objectStore = db.createObjectStore(key, {
            keyPath: store.id,
          }); /* 如需自动创建主键,option内添加autoIncrement: true */
          for (const key2 in store.index) {
            const unique = store.index[key2];
            objectStore.createIndex(key2, key2, { unique: unique });
          }
        }
      }
    };

    // 数据库连接成功
    this._dbRequest.onsuccess = (event) => {
      this._db = event.target.result;
      // 修改状态
      if (this._storeState === STATUS_MAP.PENDING) {
        this._storeState = STATUS_MAP.OLD;
      }
      // 初始化回调
      if (typeof init === "function") {
        init(this);
      }
      // 数据库准备完成后回调
      this._regCallback.forEach((cb) => {
        if (typeof cb === "function") {
          cb();
        }
      });
    };

    // 数据库连接失败
    this._dbRequest.onerror = (event) => {
      throw new Error("打开数据库出错!", event.target.error);
    };
  }

  // 读写事务
  beginWrite(storeName) {
    return beginTran(this, storeName, 'readwrite')
  }

  // 只读事务
  beginReadonly(storeName) {
    return this.beginReadonly(this, storeName, 'readonly')
  }

  // 添加记录
  addModel(storeName, model, tranRequest = null) {
    return _addModel(this, storeName, model, tranRequest)
  }
}

/**
 * 读写事务
 * @param {*} help indexedDB的help实例
 * @param {string} storeName 对象仓库名称
 * @param {string} type 读写类型
 */
const beginTran = (help, storeName, type = "readwrite") => {
  debugger
  return new Promise((resolve, reject) => {
    const _tran = () => {
      const tranRequest = help._db.transaction(storeName, type);

      tranRequest.onerror = (event) => {
        console.log(type + "事务出错:", event.target.error);
        reject(`${type}事务出错: ${event.target.errors}`);
      };

      tranRequest.oncomplete = (event) => {
        debugger
        console.log(type + "事务完成:", event.target);
      };

      resolve(tranRequest);
    };

    // 数据库初始化还没完成
    if (!help._db) {
      // 加入待执行回调队列
      help._regCallback.push(() => _tran());
    } else {
      // 执行事务
      _tran()
    }
  });
};


/**
 * 添加对象
 * @param {*} help 数据库实例 
 * @param {*} storeName 表名
 * @param {*} model 对象
 * @param {*} tranRequest 事务对象 
 */
function _addModel(help, storeName, model, tranRequest = null) {
  return new Promise((resolve, reject) => {
    const _add = (_tran) => {
      _tran.objectStore(storeName).add(model).onsuccess = (evt) => {
        debugger
        resolve(evt.target.result)
      }
    }
    if(tranRequest === null) {
      help.beginWrite([storeName]).then(tran => {
        _add(tran)
      })
    } else {
      _add(tranRequest)
    }
  })
}