import { getProductList } from '@functions/getProductList/lambdaFunction';

describe("lambda getProductsList", () => {
  it("lambda getProductsList runs corretly", async () => {
    const result: any = await getProductList();

    expect(result.statusCode).toBe(200);
  });
});
