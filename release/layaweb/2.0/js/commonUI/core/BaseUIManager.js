/*
* name;
*/
var BaseUIManager = /** @class */ (function () {
    function BaseUIManager() {
        this.id = 0;
        this._resDatas = new Array();
        this._onInitedCallBack = null;
        this._loadedCount = 0;
        this._dataCenter = null;
        this._viewCenter = null;
        this._controlCenter = null;
        this._dataCenter = new UIDataCenter();
        this._viewCenter = new UIViewCenter();
        this._controlCenter = new UIControlCenter(this, this._dataCenter, this._viewCenter);
    }
    BaseUIManager.prototype.dispose = function () {
        if (this._controlCenter != null) {
            this._controlCenter.dispose();
            this._controlCenter = null;
        }
        if (this._viewCenter != null) {
            this._viewCenter.dispose();
            this._viewCenter = null;
        }
        if (this._dataCenter != null) {
            this._dataCenter.dispose();
            this._dataCenter = null;
        }
    };
    BaseUIManager.prototype.open = function (onInitCallBack) {
        if (null == this._dataCenter ||
            this._dataCenter.isLoading ||
            this._dataCenter.isOpened) {
            if (this._controlCenter != null) {
                this._controlCenter.onOpenAgain();
            }
            return;
        }
        this._onInitedCallBack = onInitCallBack;
        if (this._dataCenter.isLoaded) {
            this.doOpen();
        }
        else {
            this.doLoad();
        }
    };
    BaseUIManager.prototype.close = function () {
        if (null == this._dataCenter ||
            this._dataCenter.isLoading ||
            !this._dataCenter.isOpened) {
            return;
        }
        this.doHide();
    };
    BaseUIManager.prototype.hide = function () {
        if (null == this._dataCenter ||
            this._dataCenter.isLoading ||
            !this._dataCenter.isOpened) {
            return;
        }
        this.doHide();
    };
    BaseUIManager.prototype.addControl = function (className) {
        if (className == null) {
            return;
        }
        this._controlCenter.addControl(className);
    };
    BaseUIManager.prototype.getControl = function (className) {
        if (null == this._controlCenter) {
            return null;
        }
        return this._controlCenter.getControl(className);
    };
    BaseUIManager.prototype.addData = function (className) {
        if (this._dataCenter == null) {
            return;
        }
        this._dataCenter.addData(className);
    };
    BaseUIManager.prototype.getData = function (className) {
        if (this._dataCenter == null) {
            return null;
        }
        return this._dataCenter.getData(className);
    };
    BaseUIManager.prototype.addView = function (className) {
        if (this._viewCenter == null) {
            return;
        }
        this._viewCenter.addView(className);
    };
    BaseUIManager.prototype.getView = function (className) {
        if (this._viewCenter == null) {
            return null;
        }
        return this._viewCenter.getView(className);
    };
    BaseUIManager.prototype.addResData = function (data) {
        this._resDatas.push(data);
    };
    Object.defineProperty(BaseUIManager.prototype, "isOpened", {
        get: function () {
            if (this._dataCenter || !this._dataCenter.isOpened) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    BaseUIManager.prototype.setOpenParam = function (className) {
        if (this._dataCenter == null) {
            return;
        }
        this._dataCenter.setOpenParam(className);
    };
    BaseUIManager.prototype.getOpenParam = function () {
        if (this._dataCenter != null) {
            return this._dataCenter.getOpenParam();
        }
        return null;
    };
    BaseUIManager.prototype.doLoad = function () {
        if (this._dataCenter == null) {
            return;
        }
        this._dataCenter.isLoading = true;
        this._loadedCount = 0;
        if (this._resDatas.length <= 0) {
            this.loadComplete();
        }
        else {
            for (var i = 0; i < this._resDatas.length; i++) {
                var resData = this._resDatas[i];
                if (resData != null) {
                    Laya.loader.load(resData.url, laya.utils.Handler.create(this, this.loadComplete));
                }
            }
        }
    };
    BaseUIManager.prototype.loadComplete = function () {
        this._loadedCount++;
        if (this._loadedCount >= this._resDatas.length) {
            if (this._dataCenter == null ||
                this._viewCenter == null || this._controlCenter == null) {
                return;
            }
            this._dataCenter.isLoading = false;
            this._dataCenter.isLoaded = true;
            this.doOpen();
        }
    };
    BaseUIManager.prototype.doOpen = function () {
        if (this._dataCenter == null || this._viewCenter == null || this._controlCenter == null) {
            return;
        }
        this._dataCenter.onInit();
        this._viewCenter.onInit();
        this._controlCenter.onInit();
        this._dataCenter.isOpened = true;
        this._dataCenter.onShow();
        this._viewCenter.onShow();
        this._controlCenter.onShow();
        if (this._onInitedCallBack != null) {
            this._onInitedCallBack.call(this._onInitedCallBack, this.id);
        }
    };
    BaseUIManager.prototype.doHide = function () {
        if (this._dataCenter == null || this._viewCenter == null || this._controlCenter == null) {
            return;
        }
        this._controlCenter.onHide();
        this._viewCenter.onHide();
        this._dataCenter.onHide();
        this._dataCenter.isOpened = false;
    };
    return BaseUIManager;
}());
//# sourceMappingURL=BaseUIManager.js.map