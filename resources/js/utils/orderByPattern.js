export default function utility(pattern, item) {
    if (pattern == null) return item;

    const patternKeys = Object.keys(pattern);
    let orderedItem = { ...pattern };
    patternKeys.forEach(indexKey => {
        orderedItem[indexKey] = item[indexKey];
    });

    return orderedItem;
}
