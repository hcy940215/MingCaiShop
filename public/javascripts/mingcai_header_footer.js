/**
 * 设置头部组件
 * @param   {String} iconUrl      头部图标
 * @param   {Array} titleList     头部按钮信息列表[{title:"按钮列表标题", url:"点击跳转链接"}]
 * @param   {Object}  searchInfo   搜索按钮信息{title:"搜索文字标题", url:"搜索右侧图片url"}
 * */
function Header(iconUrl, titleList, searchInfo) {
    this.iconUrl = iconUrl;
    this.titleList = titleList;
    this.searchInfo = searchInfo;
}
Header.prototype = {
    // contextEle
    get contextEle() {
        var $contextDiv = $("<div></div>");
        $contextDiv.attr("id", "header-context");

        var $iconDiv = $("<div></div>");
        $iconDiv.attr("id", "header-icon");
        var $iconImg = $("<img>");
        $iconImg.attr("src", this.iconUrl);
        $iconDiv.append($iconImg);

        var $btnListDiv = $("<div></div>");
        $btnListDiv.attr("id", "btn-list");
        var $ul = $("<ul></ul>");
        for (var index in this.titleList) {
            var titleInfo = this.titleList[index];
            var $li = $("<li></li>");
            var $a = $("<a>");
            $a.text(titleInfo.title);
            $a.attr("href", titleInfo.url);
            $li.append($a);
            $ul.append($li);
        }
        $btnListDiv.append($ul);

        var $searchDiv = $("<div></div>");
        $searchDiv.attr("id", "search-login");
        var $searchP = $("<p></p>");
        var $searchImg = $("<img>");
        if (this.searchInfo) {
            $searchP.text(this.searchInfo.title);
            $searchImg.attr("src", this.searchInfo.url);
        }
        $searchP.append($searchImg);
        $searchDiv.append($searchP);
        if (this.searchCallBack) {
            $searchDiv.on("click", this.searchCallBack);
        }

        $contextDiv.append($iconDiv);
        $contextDiv.append($btnListDiv);
        $contextDiv.append($searchDiv);

        $contextDiv.addClass("text-style");
        return $contextDiv;
    },

    // iconUrl
    set iconUrl(newInfo) {
        if (!newInfo) {
            return;
        }
        $("#header-icon img").attr("src", newInfo);
        this._iconUrl = newInfo;
    },
    get iconUrl() {
        return this._iconUrl;
    },

    // titleList
    set titleList(newInfo) {
        if (!newInfo) {
            return;
        }
        var $ul = $("#btn-list>ul");
        $ul.empty();
        for (var index in newInfo) {
            var titleInfo = newInfo[index];
            var $li = $("<li></li>");
            var $a = $("<a>");
            $a.text(titleInfo.title);
            $a.attr("href", titleInfo.url);
            $li.append($a);
            $ul.append($li);
        }
        this._titleList = newInfo;
    },
    get titleList() {
        return this._titleList;
    },

    // searchInfo
    set searchInfo(newInfo) {
        if (!newInfo) {
            return;
        }
        $("#search-login img").attr("src", newInfo.url);
        $("#search-login p").append(newInfo.title);
        this._searchInfo = newInfo;
    },
    get searchInfo() {
        return this._searchInfo;
    },

    // searchCallBack：搜索点击事件
    set searchCallBack(newFun) {
        if (!newFun) {
            return;
        }
        var $searchDiv = $("#search-login");
        $searchDiv.on("click", newFun);
        this._searchCallBack = newFun;
    },
    get searchCallBack() {
        return this._searchCallBack;
    }
};

/**
 * 设置尾部组件
 * @param   {Array}     aboutInfoList   关于我们信息列表[{title:"标题"}, {title:"客服热线：", telephone:"电话"},
 * {title:"总部地址：：", address:"地址"}]
 * @param   {Object}    centerIconUrl  中部图片url
 * @param   {Object}    coderInfo     二维码信息{title:"二维码底部标题", url:"二维码图片url"}
 * */
function Footer(aboutInfoList, centerIconUrl, coderInfo) {
    this.aboutInfoList = aboutInfoList;
    this.centerIconUrl = centerIconUrl;
    this.coderInfo = coderInfo;
}
Footer.prototype = {
    // contextEle
    get contextEle() {
        var $contextDiv = $("<div></div>");
        $contextDiv.attr("id", "footer-context");

        var $aboutDiv = $("<div></div>");
        $aboutDiv.attr("id", "footer-about-info");
        var $aboutContextDiv = $("<div></div>");
        for (var index in this.aboutInfoList) {
            var textInfo = this.aboutInfoList[index];
            var $titleP = $("<p></p>");
            $titleP.text(textInfo.title);
            if (Number(index) !== 0) {
                $titleP.append("<br>" + (textInfo.telephone ? textInfo.telephone : textInfo.address));
            }
            $aboutContextDiv.append($titleP);
        }
        $aboutDiv.append($aboutContextDiv);

        var $iconDiv = $("<div></div>");
        $iconDiv.attr("id", "footer-icon");
        var $iconImg = $("<img>");
        if (this.centerIconUrl) {
            $iconImg.attr("src", this.centerIconUrl);
        }
        $iconDiv.append($iconImg);

        var $codeDiv = $("<div></div>");
        $codeDiv.attr("id", "footer-code-icon");
        var $codeContextDiv = $("<div></div>");
        var $codeImg = $("<img>");
        var $codeP = $("<p></p>");
        if (this.coderInfo) {
            $codeImg.attr("src", this.coderInfo.url);
            $codeP.text(this.coderInfo.title);
        }
        $codeContextDiv.append($codeImg);
        $codeContextDiv.append($codeP);
        $codeDiv.append($codeContextDiv);
        if (this.codeCallBack) {
            $codeDiv.on("click", this.codeCallBack);
        }

        $contextDiv.append($aboutDiv);
        $contextDiv.append($iconDiv);
        $contextDiv.append($codeDiv);
        return $contextDiv;
    },

    // aboutInfo
    set aboutInfoList(newInfo) {
        if (!newInfo) {
            return;
        }
        var $aboutContextDiv = $("#footer-about-info>div");
        $aboutContextDiv.empty();
        for (var index in newInfo) {
            var textInfo = newInfo[index];
            var $titleP = $("<p></p>");
            $titleP.text(textInfo.title);
            if (Number(index) !== 0) {
                $titleP.append("<br>" + (textInfo.telephone ? textInfo.telephone : textInfo.address));
            }
            $aboutContextDiv.append($titleP);
        }
        this._aboutInfoList = newInfo;
    },
    get aboutInfoList() {
        return this._aboutInfoList;
    },

    // centerIconUrl
    set centerIconUrl(newInfo) {
        if (!newInfo) {
            return;
        }
        var $iconImg = $("#footer-icon>img");
        $iconImg.attr("src", newInfo);
        this._centerIconUrl = newInfo;
    },
    get centerIconUrl() {
        return this._centerIconUrl;
    },

    // coderInfo
    set coderInfo(newInfo) {
        if (!newInfo) {
            return;
        }
        var $codeImg = $("#footer-code-icon>div>img");
        var $codeP = $("#footer-code-icon>div>p");
        $codeImg.attr("src", newInfo.url);
        $codeP.text(newInfo.title);
        this._coderInfo = newInfo;
    },
    get coderInfo() {
        return this._coderInfo;
    },

    // codeCallBack：二维码点击事件
    set codeCallBack(newFun) {
        if (!newFun) {
            return;
        }
        var $codeDiv = $("#footer-code-icon");
        $codeDiv.on("click", newFun);
        this._codeCallBack = newFun;
    },
    get codeCallBack() {
        return this._codeCallBack;
    }
};