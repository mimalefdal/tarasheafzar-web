import {
    MULTIPLE_NESTED_SELECTION_MODE,
    MULTIPLE_SELECTION_MODE,
    SINGLE_NESTED_SELECTION_MODE,
    SINGLE_SELECTION_MODE
} from "./constants";
import { existsInArray, removeFromArray } from "./objectArray";

export const updateSelection = (
    prevItems,
    item,
    selectionMode,
    childAttr = "childs",
    parentAttr = "parent"
) => {
    let targetAction = "select";
    if (existsInArray(prevItems, "id", item.id)) targetAction = "deselect";

    // console.log(prevItems, item, selectionMode);

    switch (targetAction) {
        case "select":
            return performSelection(
                prevItems,
                item,
                selectionMode,
                childAttr,
                parentAttr
            );
            break;

        case "deselect":
            return performDeselection(prevItems, item, selectionMode);
            break;
    }
};

function performSelection(
    prevItems,
    item,
    selectionMode,
    childAttr,
    parentAttr
) {
    let itemsToAdd = [item];

    switch (selectionMode) {
        case SINGLE_SELECTION_MODE:
            return [item];
            break;

        case MULTIPLE_SELECTION_MODE:
            return [...prevItems, item];

            break;
        case SINGLE_NESTED_SELECTION_MODE:
            if (item.hasOwnProperty("parent")) {
                console.log(getHighestParentOf(item, parentAttr));
                if (!existsInArray(prevItems, "id", item.parent.id)) {
                    if (
                        existsInArray(
                            prevItems,
                            "id",
                            getHighestParentOf(item, parentAttr).id
                        )
                    ) {
                        let parentsToAdd = filterAdded(
                            getHighParentsOf(item, parentAttr),
                            prevItems
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
            return [...itemsToAdd];
            break;

        case MULTIPLE_NESTED_SELECTION_MODE:
            if (item.hasOwnProperty("parent")) {
                if (!existsInArray(prevItems, "id", item.parent.id)) {
                    let parentsToAdd = filterAdded(
                        getHighParentsOf(item, parentAttr),
                        prevItems
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
            return [...prevItems, ...itemsToAdd];

            break;

        default:
            break;
    }
}

function performDeselection(
    prevItems,
    item,
    selectionMode,
    childAttr,
    parentAttr
) {
    switch (selectionMode) {
        case SINGLE_SELECTION_MODE:
            return [];
            break;
        case MULTIPLE_SELECTION_MODE:
            return prevItems.filter(value => item.id != value.id);

            break;

        case SINGLE_NESTED_SELECTION_MODE:
        case MULTIPLE_NESTED_SELECTION_MODE:
            if (item.childs) {
                let childIds = getDeepChildAttrOf(item, "id", childAttr);
                return removeFromArray(prevItems, "id", [item.id, ...childIds]);
            } else return removeFromArray(prevItems, "id", [item.id]);
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

function filterAdded(items, prevItems) {
    return items.filter(item => !existsInArray(prevItems, "id", item.id));
}
