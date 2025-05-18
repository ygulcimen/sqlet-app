export const matchDatasets = (
  baseData,
  lookupData,
  baseColumn,
  matchColumn,
  returnColumn
) => {
  if (!Array.isArray(baseData) || !Array.isArray(lookupData)) return [];

  return baseData.map((row) => {
    const matched = lookupData.find((r) => r[matchColumn] === row[baseColumn]);

    let matchedValue = matched ? matched[returnColumn] : "Not found";

    // 🛡️ Defensive stringify
    if (matchedValue && typeof matchedValue === "object") {
      matchedValue = JSON.stringify(matchedValue);
    }

    return {
      ...row,
      MatchedValue: matchedValue,
    };
  });
};
