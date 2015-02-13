(function() {
    var a = document.getElementById("slideId"), b = a.value || a.textContent || a.innerText, c = "pagesContainer", d = document.getElementById(c), e = document.getElementById("emptyHint"), f = {editable: !1,slide: null,init: function() {
            this.bindButton(), this.initSortable(), this.createUploader()
        },loadPages: function() {
            return ajax.get("/slide/" + b + "/json").then(function(a) {
                f.slide = JSON.parse(a), f.render()
            }, function() {
            })
        },emptyPages: function() {
            while (d.hasChildNodes())
                d.removeChild(d.lastChild)
        },render: function() {
            f.emptyPages();
            if (f.slide && f.slide.pages.length) {
                var a = document.createDocumentFragment();
                for (var b = 0, c = f.slide.pages.length; b < c; b++)
                    a.appendChild(f.renderSlidePage(f.slide.pages[b]));
                d.appendChild(a), e.style.display = "none"
            } else
                e.style.display = "";
            f.bindDeleteButton()
        },renderSlidePage: function(a) {
            var b = document.createElement("div");
            b.className = "itemBlock slidePage ui-sortable-handle", b.setAttribute("pageId", a.pageId);
            var c = document.createElement("span");
            c.innerText = a.index + 1, c.textContent = a.index + 1, b.appendChild(c);
            var d = document.createElement("span");
            d.className = "delete", d.style.display = "none", b.appendChild(d);
            var e = document.createElement("img");
            return e.src = a.pageUrl, b.appendChild(e), b
        },bindButton: function() {
            var a = document.getElementById("editPages");
            a.onclick = function() {
                f.makeEditable()
            };
            var b = document.getElementById("savePages");
            b.onclick = function() {
                f.save()
            };
            var c = document.getElementById("cancelEditPages");
            c.onclick = function() {
                f.cancelEdit()
            }
        },bindDeleteButton: function() {
            $("#" + c + " .delete").on("click", function(a) {
                f.editable && $(a.target).parent().remove()
            })
        },makeEditable: function() {
            f.editable = !0, f.enableSortable(), $("#editPages").hide(), $("#savePages").show(), $("#cancelEditPages").show(), $("#" + c + " .delete").show()
        },disableEditable: function() {
            f.editable = !1, f.disableSortable(), $("#editPages").show(), $("#savePages").hide(), $("#cancelEditPages").hide(), $("#" + c + " .delete").hide()
        },cancelEdit: function() {
            this.render(), this.disableEditable()
        },save: function() {
            this.disableEditable();
            var a = this.getPageList();
            ajax.jsonPut("/slide/" + b, {pages: a}).then(function() {
                f.loadPages()
            }, function() {
            })
        },getPageList: function() {
            var a = [], b = d.childNodes;
            for (var c = 0, e = b.length; c < e; c++) {
                var f = b[c].getAttribute("pageId");
                f && a.push(f)
            }
            return a
        },enableSortable: function() {
            $("#" + c).sortable("enable")
        },disableSortable: function() {
            $("#" + c).sortable("disable")
        },initSortable: function() {
            $("#" + c).sortable({containment: "#" + c,cursor: "move"}), this.disableSortable()
        },createUploader: function() {
            var a = document.getElementById("fine-uploader"), c = document.getElementById("fileList"),z = document.getElementById("continueAddPage"), d = new qq.FineUploader({element: a,request: {endpoint: "/slidePage"},validation: {allowedExtensions: ["png", "svg", "jpg", "ppt"],sizeLimit: 20971520},template: "qq-template-manual-noedit",autoUpload: !1,listElement: c,callbacks: {onAllComplete: function() {
                        f.loadPages()
                    }}}),x = new qq.FineUploader({element: document.getElementById("continueAddPage"),request: {endpoint: "/slidePage"},validation: {allowedExtensions: ["png", "svg", "jpg", "ppt"],sizeLimit: 20971520},template: "qq-template-manual-noedit",autoUpload: !1,listElement: c,callbacks: {onAllComplete: function() {
                        f.loadPages()
                    }}});
            d.setParams({slideId: b});
            var e = document.getElementById("triggerUpload");
            qq(e).attach("click", function() {
                d.uploadStoredFiles()
            })
        }};
    f.init(), f.loadPages()
})()