import { orderByPattern } from ".";

export default function utility(pattern, item) {
    if (pattern != null) {
        const itemKeys = Object.keys(item);
        const patternKeys = Object.keys(pattern);

        patternKeys.map((key, index) => {
            // console.log(key);
            if (!(key in item)) {
                //pattern Key not exist in data item (like none-resourced data from server)
                if (pattern[key] in item) {
                    //pattern mapped key found in data item
                    item[key] = item[pattern[key]];
                    //corresponding data added to data item
                } else {
                    //given data item is imperfect
                    item[key] = null;
                    // throw new Error(
                    //     "given item does not match map object, " +
                    //         pattern[key].toUpperCase() +
                    //         " key is missing."
                    // );
                }
            }
        });
    }

    // order data item according to given pattern
    return orderByPattern(pattern, item);
}
