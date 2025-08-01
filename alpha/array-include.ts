/**
 * Array Include
 */

function generateTestData(size: number): string[] {
  // Generate User IDentifier(s) (e.g., "user_123")
  const userIdList = Array.from(
    { length: size },
    (_, i) => `user_${(i + 1_000).toString(36)}`
  );

  // Generate Product IDentifier(s) (e.g., "PROD-ABC123")
  const productIdList = Array.from(
    { length: size },
    () => `PROD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  );

  // Generate Email(s) (e.g., "user123@example.com")
  const emailList = Array.from(
    { length: size },
    (_, i) => `user${i}@${['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'][i % 4]}`
  );

  return [...userIdList, ...productIdList, ...emailList];
}

function generateLookupValue(data: string[], lookupSize: number, hitRatio = 0.7) {
  const lookupValueList: string[] = [];
  const hit = Math.floor(lookupSize * hitRatio);
  const miss =  lookupSize - hit;

  for (let i = 0; i < hit; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    lookupValueList.push(data[randomIndex]);
  }

  for (let i = 0; i < miss; i++) {
    lookupValueList.push(`nonexistent_${Math.random().toString(36).substring(2, 8)}`);
  }

  // Shuffle The Array
  return lookupValueList.sort(() => Math.random() - 0.5);
}

const testData = generateTestData(300_000);
const lookupValueList = generateLookupValue(testData, 1_000);
const testSet = new Set(testData);

Deno.bench({
  name: "Array Include",
  baseline: true,
  fn: () => {
    for (const value of lookupValueList) {
      testData.includes(value);
    }
  }
});

Deno.bench({
  name: "Set Lookup",
  fn: () => {
    for (const value of lookupValueList) {
      testSet.has(value);
    }
  }
});
