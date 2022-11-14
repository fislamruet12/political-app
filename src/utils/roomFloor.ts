

export const floorNumber = () => {
    const roomArray = []
    for (let i = 1; i <= 15; i++) {
        roomArray.push(i)
    }
    return roomArray
}
export const roomNumber = (number: any) => {
    const roomArray = []
    for (let i = parseInt(number) * 100 + 1; i <= parseInt(number) * 100 + 50;i++) {
        roomArray.push(i)
    }
    roomArray.push('lab')
    roomArray.push('grocery-store')
 return roomArray
}