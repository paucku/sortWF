javascript: (function sortWF_3_8(maxChildren = 1e3) {
    function toastMsg(str, sec, err) {
        WF.showMessage(str, err);
        setTimeout(WF.hideMessage, (sec || 2) * 1e3)
    }

    function sortAndMove(items, reverse) {
        WF.hideDialog();
        setTimeout(() => {
            items.sort((a, b) => a.getNameInPlainText().localeCompare(b.getNameInPlainText()));
            WF.editGroup(() => {
                items.forEach((item, i) => {
                    if (item.getPriority() !== i) WF.moveItems([item], parent, i)
                })
            });
            WF.editItemName(parent);
            toastMsg('Sorted A-Z', 1);
        }, 50)
    }
    const htmlEscText = str => str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

    if (WF.currentSearchQuery()) return void toastMsg("Sorting is disabled when search is active.", 3, true);
    const parent = WF.currentItem();
    if (parent.isEmbedded()) return void toastMsg("Sorting disabled for added shares.", 3, true);
    const children = parent.getChildren();
    if (children.length < 2) return void toastMsg("Nothing to sort.", 3, true);
    if (children.length > maxChildren) return void toastMsg("Sorting more than ${maxChildren} children upsets the WorkFlowy gods, and has been disabled.", 5, true);
    const sortInfo = "Sort <b>${children.length}</b > children ? ";
    
    sortAndMove(children); 
})();
