
import { getProductById } from "./lambdaFunction"

describe("lambda getProductById", () => {

  it("lambda getProductById runs corretly", async () => {
    const result: any = await getProductById({ id:'1' });

    expect(result.statusCode).toBe(200);
  });

  it("lambda getProductById runs inccorectly", async () => {
    const result: any = await getProductById({ id:'0' });

    expect(result.statusCode).toBe(404);
  });
}) 