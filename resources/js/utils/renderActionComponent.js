import { selectActionComponent, setParamValue } from ".";

export default function utility(entryOperations, item, key) {
    let actions = Object.values(entryOperations).map((entry, key) => {
        let type = entry.type;
        let actionType = entry.actionType;
        let action = entry.action;
        let attr = entry.props;

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
