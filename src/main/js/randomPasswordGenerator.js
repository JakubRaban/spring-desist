
export default function randomPasswordGenerator(passwordLength) {
    let password = [];
    for (let i = 0; i < passwordLength; i++)
        password.push(Math.floor(Math.random() * 94 + 33))
    return String.fromCharCode(...password)
}