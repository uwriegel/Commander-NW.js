﻿// TODO: Weiterentwicklung

// Theme-Umschaltung
// getPlatform() in PresenterBase, irgendwie platform bestimmen
// GetRootItems in den Platformen
// Entweder im DirectoryPresenter
// getIconURl als c++/gtk-Dll über Webserver/c# abrufbar
// oder 
// GetDriveItems as c++



// Sortierung bei Spalte Version berücksichtigen
// Css-Definitions, Theme
// Icon 
// mount not mounted devices
//
// Start as Admin im Hintergrund
// drives: Gespeicherte Ansichten
// RegistryItems anzeigen
// NachRefresh Selektion erhalten
// Conflicts: conflict liste in die Focusable anhängen
// Rename auch von mehreren Dateien
//import { Grid }  from './grid'
//import { VerticalGrid }  from './vgrid'
import { CommanderView }  from './commanderview.js'
import { Menubar, MenuItemType }  from './menubar/menubar.js'
// import { Viewer }  from './viewer'
// import { Item } from './model/item'
// /*

//               Presenter (Steuert die Daten, passt die Views an, sorgt für die Sortierung und Ansichtsfilterung)
//                  /\
//                 /  \
//                /    \
//             Model  View (TableView, ColumnsControl)

//         Der Presenter kann einen Sorter hinzugefügt bekommen

//         Presenter 
// */

export class Commander {

//     get focused() {
//         return this.focusedView
//     }

     constructor() {
        this.initializeMenubar()
//         this.leftView.otherView = this.rightView
//         this.rightView.otherView = this.leftView
//         this.leftView.setOnCurrentItemChanged((item: Item, path: string) => this.currentItemChanged(item, path))
//         this.rightView.setOnCurrentItemChanged(this.currentItemChanged.bind(this))
//this.testview.setOnCurrentItemChanged(this.currentItemChanged.bind(this))

//         this.focusedView = this.leftView
//         this.leftView.setOnFocus(() => this.focusedView = this.leftView)
//         this.rightView.setOnFocus(() =>this.focusedView = this.rightView)
//         this.leftView.focus()

//         const gridElement = document.getElementById("grid") as HTMLDivElement
//         const viewerElement = document.getElementById("viewer")!
//         new Grid(gridElement, document.getElementById("leftView")!, document.getElementById("rightView")!, 
//              document.getElementById("grip") as HTMLDivElement, () => this.focusedView.focus())
            
//         const vgrid = new VerticalGrid(document.getElementById("vgrid") as HTMLDivElement, gridElement, viewerElement!,
//              document.getElementById("vgrip") as HTMLDivElement, () => this.focusedView.focus())

//         viewerElement.onclick = () =>this.focusedView.focus()

//         this.initializeOnKeyDownHandler();

//         ipcRenderer.on("showHidden", (_: any, showHidden: boolean) => this.showHidden(showHidden))
//         ipcRenderer.on("darkTheme", (_: any, dark: boolean) => this.setDarkTheme(dark))
//         ipcRenderer.on("preview", (_: any, preview: boolean) => vgrid.switchBottom(preview))
     }

//     getCommanderView(id: string) {
//         switch (id)
//         {
//             case "leftView":
//                 return this.leftView
//             case "rightView":
//                 return this.rightView
//             default:
//                 return undefined
//         }
//     }

    private initializeMenubar() {
        const menuFile = this.menubar.insertItem("_Datei")
        const menuNavigation = this.menubar.insertItem("_Navigation")
        const menuSelection = this.menubar.insertItem("_Selektion")
        const menuView = this.menubar.insertItem("_Ansicht")
        menuFile.appendItem({
            name: "_Umbenennen",
            shortcut: {
                display: "F2",
                key: 113
            }
        })
        menuFile.appendItem({
            type: MenuItemType.Separator
        })
        menuFile.appendItem({
            name: "_Kopieren",
            shortcut: {
                display: "F5",
                key: 116
            },
            action: () => alert("Kopie")
        })
        menuFile.appendItem({
            name: "_Verschieben",
            shortcut: {
                display: "F6",
                key: 117
            },
            action: () => alert("Verschiebe")
        })
        menuFile.appendItem({
            name: "_Löschen",
            shortcut: {
                display: "F8",
                key: 119
            }
        })
        menuFile.appendItem({
            type: MenuItemType.Separator
        })
        menuFile.appendItem({
            name: "_Eigenschaften",
            shortcut: {
                display: "Alt+Enter",
                key: 13,
                alt: true
            }
        })
        menuFile.appendItem({
            type: MenuItemType.Separator
        })
        menuFile.appendItem({
            name: "_Beenden",
            shortcut: {
                display: "Alt+F4",
                key: 115,
                alt: true
            },
            action: () => {
                var gui = require("nw.gui")
                const mainWindow = gui.Window.get()
                mainWindow.close()
            }
        })

        menuNavigation.appendItem({
            name: "_Erstes Element",
            shortcut: {
                display: "Pos1",
                key: 36
            }
        })
        menuNavigation.appendItem({
            name: "_Favoriten",
            shortcut: {
                display: "F1",
                key: 112
            }
        })

        menuSelection.appendItem({
            name: "_Alles",
            shortcut: {
                display: "Num+",
                key: 107
            }
        })
        menuSelection.appendItem({
            name: "_Nichts",
            shortcut: {
                display: "Num-",
                key: 109
            }
        })
        menuView.appendItem({
            name: "_Versteckte Dateien",
            shortcut: {
                display: "Strg+H",
                key: 1,
                ctrl: true
            },
            type: MenuItemType.Checkable
        })
        menuView.appendItem({
            type: MenuItemType.Separator
        })
        menuView.appendItem({
            name: "_Hellblaues Schema",
            type: MenuItemType.Checkable
        })
        menuView.appendItem({
            name: "B_laues Schema",
            type: MenuItemType.Checkable
        })
        menuView.appendItem({
            name: "_Dunkles Schema",
            type: MenuItemType.Checkable
        })
        menuView.appendItem({
            type: MenuItemType.Separator
        })
        menuView.appendItem({
            name: "Voll_bild",
            shortcut: {
                display: "F11",
                key: 122
            },
            type: MenuItemType.Checkable,
            action: menu => {
                var gui = require("nw.gui")
                const mainWindow = gui.Window.get()
                menu.isChecked ? mainWindow.enterFullscreen() : mainWindow.leaveFullscreen()
            }
        })
    }

//     private initializeOnKeyDownHandler() {
//         document.onkeydown = evt => {
//             switch (evt.which) {
//                 case 9: // TAB
//                     if (!evt.shiftKey) {
//                         if (this.focusedView.isDirectoryInputFocused())
//                            this.focusedView.focus()
//                         else {
//                             const toFocus = this.focusedView == this.leftView ? this.rightView : this.leftView
//                             toFocus.focus()
//                         }
//                     }
//                     else
//                         this.focusedView.focusDirectoryInput()
//                     break
//                 default:
//                     return
//             }
//             evt.preventDefault()
//         }
//     }

//     showHidden(show: boolean) {
//         GlobalSettings.showHidden = show
//         this.leftView.refresh()
//         this.rightView.refresh()
//     }

//     setDarkTheme(activate: boolean) {
//         if (activate) {
//             const head = document.getElementsByTagName('head')[0]
//             let link = document.createElement('link')
//             link.rel = 'stylesheet'
//             link.id = 'darkThemeStylesheet'
//             link.type = 'text/css'
//             link.href = 'styles/dark.css'
//             link.media = 'all'
//             head.appendChild(link)
//         } else {
//             const styleSheet = document.getElementById("darkThemeStylesheet")
//             styleSheet!.remove()
//         }
//     }

//     private currentItemChanged(item: Item, path: string) {
//         if (item) {
//             const text = Path.join(path, item.displayName)
//             this.footer!.textContent = text
//             this.viewer.selectionChanged(text)
//         }
//         else {
//             this.footer!.textContent = "Nichts selektiert"
//             this.viewer.selectionChanged("")
//         }
//     }

//     private readonly leftView = new CommanderView("leftView")
//     private readonly rightView = new CommanderView("rightView")
    private readonly menubar = new Menubar("header")
    private readonly testview = new CommanderView("testview")
    private readonly footer = document.getElementById("footer")
//     private readonly viewer = new Viewer()
    
//     private focusedView: CommanderView
}

new Commander()

