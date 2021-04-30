import {
    MULTIPLE_NESTED_SELECTION_MODE,
    MULTIPLE_SELECTION_MODE,
    SINGLE_NESTED_SELECTION_MODE,
    SINGLE_SELECTION_MODE
} from "./constants";
import { existsInArray, pluckSet, removeFromArray } from "./objectArray";

export const updateSelection = (
    prevItems,
    item,
    selectionMode,
    selectionAttr = "id",
    childAttr = "childs",
    parentAttr = "parent"
) => {
    let targetAction = "select";
    if (existsInArray(prevItems, selectionAttr, item[selectionAttr]))
        targetAction = "deselect";

    // console.log("itemSelectionUtility->updateSelection", selectionAttr);

    switch (targetAction) {
        case "select":
            return performSelection(
                prevItems,
                item,
                selectionMode,
                selectionAttr,
                childAttr,
                parentAttr
            );
            break;

        case "deselect":
            return performDeselection(
                prevItems,
                item,
                selectionMode,
                selectionAttr
            );
            break;
    }
};

function performSelection(
    prevItems,
    item,
    selectionMode,
    selectionAttr,
    childAttr,
    parentAttr
) {
    let itemsToAdd = [item];

    switch (selectionMode) {
        case SINGLE_SELECTION_MODE:
            itemsToAdd = [item];
            break;

        case MULTIPLE_SELECTION_MODE:
            itemsToAdd = [...prevItems, item];

            break;
        case SINGLE_NESTED_SELECTION_MODE:
            if (item.hasOwnProperty("parent")) {
                console.log(getHighestParentOf(item, parentAttr));
                if (
                    !existsInArray(
                        prevItems,
                        selectionAttr,
                        item.parent[selectionAttr]
                    )
                ) {
                    if (
                        existsInArray(
                            prevItems,
                            selectionAttr,
                            getHighestParentOf(item, parentAttr)[selectionAttr]
                        )
                    ) {
                        let parentsToAdd = filterAdded(
                            getHighParentsOf(item, parentAttr),
                            prevItems,
                            selectionAttr
                        );
                        itemsToAdd = [
                            ...prevItems,
                            ...itemsToAdd,
                            ...parentsToAdd
                        ];
                    } else {
                        itemsToAdd = [
                            ...itemsToAdd,
                            ...getHighParentsOf(item, parentAttr)
                        ];
                    }
                } else {
                    itemsToAdd = [...itemsToAdd, ...prevItems];
                }
            }
            if (item.hasOwnProperty("childs")) {
                itemsToAdd = [
                    ...itemsToAdd,
                    ...getDeepChildsOf(item, childAttr)
                ];
            }
            itemsToAdd = [...itemsToAdd];
            break;

        case MULTIPLE_NESTED_SELECTION_MODE:
            if (item.hasOwnProperty("parent")) {
                if (
                    !existsInArray(
                        prevItems,
                        selectionAttr,
                        item.parent[selectionAttr]
                    )
                ) {
                    let parentsToAdd = filterAdded(
                        getHighParentsOf(item, parentAttr),
                        prevItems,
                        selectionAttr
                    );
                    itemsToAdd = [...itemsToAdd, ...parentsToAdd];
                }
            }
            if (item.hasOwnProperty("childs")) {
                itemsToAdd = [
                    ...itemsToAdd,
                    ...getDeepChildsOf(item, childAttr)
                ];
            }
            itemsToAdd = [...prevItems, ...itemsToAdd];

            break;

        default:
            break;
    }

    return pluckSet(itemsToAdd, selectionAttr);
}

function performDeselection(
    prevItems,
    item,
    selectionMode,
    selectionAttr,
    childAttr,
    parentAttr
) {
    switch (selectionMode) {
        case SINGLE_SELECTION_MODE:
            return [];
            break;
        case MULTIPLE_SELECTION_MODE:
            return prevItems.filter(
                value => item[selectionAttr] != value[selectionAttr]
            );

            break;

        case SINGLE_NESTED_SELECTION_MODE:
        case MULTIPLE_NESTED_SELECTION_MODE:
            if (item.childs) {
                let childIds = getDeepChildAttrOf(
                    item,
                    selectionAttr,
                    childAttr
                );
                return removeFromArray(prevItems, selectionAttr, [
                    item[selectionAttr],
                    ...childIds
                ]);
            } else
                return removeFromArray(prevItems, selectionAttr, [
                    item[selectionAttr]
                ]);
            break;

        default:
            break;
    }
}

function getChildAttrOf(item, attr, childAttr = "childs") {
    if (!item[childAttr]) return [];

    return item[childAttr].map(child => {
        return child[attr];
    });
}

function getDeepChildAttrOf(item, attr, childAttr = "childs") {
    let deepAttrs = [...getChildAttrOf(item, attr, childAttr)];

    item[childAttr].map(child => {
        let deeperChildAttr = getDeepChildAttrOf(child, attr, childAttr);
        if (deeperChildAttr.length != 0) {
            deepAttrs = [...deepAttrs, ...deeperChildAttr];
        }
    });

    return deepAttrs;
}

function getDeepChildsOf(item, childAttr = "childs") {
    // console.log("getDeepChildsOf()->childAttr", childAttr);

    let deepChilds = [...item[childAttr]];
    // console.log("getDeepChildsOf()->childs", item.title, childs);

    deepChilds.map(child => {
        let deeperChilds = getDeepChildsOf(child, childAttr);
        if (deeperChilds.length != 0) {
            deepChilds = [...deepChilds, ...deeperChilds];
        }
    });

    return deepChilds;
}

function getHighParentsOf(item, parentAttr = "parent") {
    if (!item.hasOwnProperty(parentAttr)) return [];
    let highParents = [
        item[parentAttr],
        ...getHighParentsOf(item[parentAttr], parentAttr)
    ];

    return highParents;
}

function getHighestParentOf(item, parentAttr = "parent") {
    // console.log(item);
    if (item.hasOwnProperty(parentAttr)) {
        return getHighestParentOf(item.parent, parentAttr);
    } else return item;
}

function filterAdded(items, prevItems, selectionAttr) {
    return items.filter(
        item => !existsInArray(prevItems, selectionAttr, item[selectionAttr])
    );
}
