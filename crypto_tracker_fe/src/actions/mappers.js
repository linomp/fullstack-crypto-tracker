export const mapHistoricalDataDict = (hist) =>
    Object.entries(hist).map((e) => ({ name: e[0], data: e[1].map(values => values.close.toPrecision(6)) }))
