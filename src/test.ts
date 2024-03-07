interface Member {
    age: number,
    name: string,
    id?: string
}

function generateMember (name: string, age: number): Member {
    let id = (Math.random() * 1000000).toFixed(0)
    return {
        name,
        age,
        id
    }
}

generateMember('xiaoli', 15)