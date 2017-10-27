export class SubMenuController {
    constructor(private subMenu: HTMLTableElement, private actions: Map<string, ()=>void>, keyboardActivated: boolean, private closeMenu: () => void) {
        if (keyboardActivated) {
            this.subMenu.classList.add("keyboardActivated")
            let tr = this.subMenu.querySelector("tr")!
            this.focusTr(tr)
        }
        this.subMenu.addEventListener("focusout", this.onFocusOut)
        this.initializeMouseHandler()

        // if (subMenuId == "submenu4") {
        //     var trCheck = document.querySelector("#menuShowHidden .checker")
        //     if (localStorage["showHidden"] == "true")
        //         trCheck.classList.remove("hidden")
        //     else
        //         trCheck.classList.add("hidden")

        //     trCheck = document.querySelector("#menuDarkTheme .checker")
        //     if (localStorage["darkTheme"] == "true")
        //         trCheck.classList.remove("hidden")
        //     else
        //         trCheck.classList.add("hidden")
        // }
    }

    onKeyDown() {
        let tr = <HTMLTableRowElement>this.subMenu.querySelector("tr.selected")
        let trs = <HTMLTableRowElement[]>Array.from(this.subMenu.querySelectorAll("tr.selectable"))
        var i = (trs).findIndex(n => n == tr)
        tr = trs[i + 1]
        if (!tr)
            tr = trs[0]
        this.clearSelection()
        this.focusTr(tr)
    }

    onKeyUp() {
        let tr = <HTMLTableRowElement>this.subMenu.querySelector("tr.selected")
        let trs = <HTMLTableRowElement[]>Array.from(this.subMenu.querySelectorAll("tr.selectable"))
        var i = (trs).findIndex(n => n == tr)
        tr = trs[i - 1]
        if (!tr)
            tr = trs[trs.length - 1]
        this.clearSelection()
        this.focusTr(tr)
    }

    onEnter() {
        let tr = <HTMLTableRowElement>this.subMenu.querySelector("tr.selected")
        if (tr)
            this.onExecute(tr)
    }

    onKey(key: string) {
        let accs = <HTMLSpanElement[]>Array.from(this.subMenu.querySelectorAll(".accelerator"))
        let acc = accs.find(n => n.innerText.toLowerCase() == key)
        if (acc) {
            let tr = <HTMLTableRowElement>acc.parentElement!.parentElement
            if (tr)
                this.onExecute(tr)
        }
    }

    close() {
        this.clearSelection()
        this.subMenu.removeEventListener("focusout", this.onFocusOut)
    }

    private initializeMouseHandler() {
        this.subMenu.onmouseup = evt =>  {
            var tr = <HTMLTableRowElement>(<HTMLElement>evt.target).closest("tr")
            this.onExecute(tr)
        }
    }

    private onExecute(tr: HTMLTableRowElement) {
        const id = tr.dataset["id"]
        this.close()
        this.closeMenu()
        setTimeout(() => {
            if (id) 
                this.actions.get(id)!()
        }, 0)
    }

    private onFocusOut = (evt: Event) => {
        if (!this.subMenu.contains((<any>evt).relatedTarget)) {
            this.close()
            this.closeMenu()
        }
    }

    private clearSelection() {
        Array.from(this.subMenu.querySelectorAll("tr")).forEach(n => n.classList.remove("selected"))
    }

    private focusTr(tr: HTMLTableRowElement) {
        tr.classList.add("selected")
        tr.focus()
    }
}