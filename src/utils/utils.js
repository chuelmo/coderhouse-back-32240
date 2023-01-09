const getMaxId = (anArray) => {
    if (anArray.length === 0) {
        return 0
    }
    const ids = anArray.map(elem => elem.id)
    return Math.max(...ids)
}

export { getMaxId }