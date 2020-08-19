
export default function randomPasswordGenerator(passwordLength) {
    return String.fromCharCode(
        ...Array(passwordLength).fill()
            .map(_ => Math.floor(Math.random() * 94 + 33))
    )
}