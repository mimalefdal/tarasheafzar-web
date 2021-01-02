export default function swapUrlTail(path, tail) {
    return (
        path
            .split("/")
            .slice(0, -1)
            .join("/") +
        "/" +
        tail
    );
}
