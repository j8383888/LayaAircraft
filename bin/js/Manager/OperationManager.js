/**
* name
*/
var manager;
(function (manager) {
    var OperationManager = /** @class */ (function () {
        function OperationManager() {
            this._registerID = -1;
            this._ALLRegisterOprDic = new Dictionary();
            this._operationClsDiC = new Dictionary();
            this._operationClsDiC.set(0 /* MASTER */, operation.MasterPanelOperation);
            this._operationClsDiC.set(1 /* ENEMY */, operation.EnemyPanelOperation);
            this._operationClsDiC.set(2 /* FRIEND */, operation.FiendPanelOperation);
            this._operationClsDiC.set(3 /* BULLET */, operation.BulletOperation);
            this._operationClsDiC.set(4 /* BULLET_X */, operation.BulletOperationX);
            this._operationClsDiC.set(5 /* BULLET_CIRCLE */, operation.BulletOperationCircle);
        }
        Object.defineProperty(OperationManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new OperationManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /*对某个对象 注册操作方式 返回注册id用于反注册*/
        OperationManager.prototype.registerOperation = function (gameObj, opeartionType) {
            if (gameObj == null) {
                console.assert(false, "注册对象为空！");
            }
            var cls;
            cls = this._operationClsDiC.get(opeartionType);
            if (cls == null) {
                console.assert(false, "TeamID 未被注册！");
            }
            var registerOperation = new cls();
            registerOperation.register(gameObj);
            this._registerID++;
            this._ALLRegisterOprDic.set(this._registerID, registerOperation);
            return this._registerID;
        };
        /*反注册 操作*/
        OperationManager.prototype.unregisterOperation = function (registerID) {
            if (registerID == -1) {
                return;
            }
            var registerOperation = this._ALLRegisterOprDic.get(registerID);
            if (registerOperation == null) {
                console.assert(false, "registerID不存在！");
            }
            registerOperation.unregister();
            registerOperation = null;
            this._ALLRegisterOprDic.remove(registerID);
        };
        return OperationManager;
    }());
    manager.OperationManager = OperationManager;
})(manager || (manager = {}));
//# sourceMappingURL=OperationManager.js.map