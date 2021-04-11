import {
    FeatureRequiredRights,
    getIsAllowed,
    selectActionComponent,
    setParamValue
} from ".";

export default function utility(entryOperations, item, key) {
    // console.log(entryOperations, item, key);
    let actions = Object.values(entryOperations).map((entry, key) => {
        let type = entry.type;
        let requiredRights = entry.requiredRights;
        let feature = entry.feature;
        let actionType = entry.actionType;
        let action = entry.action;
        let attr = entry.props;

        // console.log("renderActionComponent->feature", feature);

        if (feature && !getIsAllowed(FeatureRequiredRights(feature)))
            return null;
        if (requiredRights && !getIsAllowed(requiredRights)) return null;

        switch (actionType) {
            case "link":
                let target = setParamValue(action, item);
                return selectActionComponent(type, {
                    target: target,
                    key: key,
                    ...attr
                });
                break;
            case "callback":
                let onClick = action;
                return selectActionComponent(type, {
                    onClick: () => onClick(item),
                    key: key,
                    item: item,
                    ...attr
                });
                break;
            default:
                break;
        }
    });

    return actions;
}
