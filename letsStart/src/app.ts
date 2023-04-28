import * as express from "express";
import { nextTick } from "process";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

const port: number = 8000;

//logging 미들웨엉
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
  }
);

//Read 고양이 전체 데이터 다 조회
app.get("/cats", (req, res, next) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//Read 특정 고양이 데이터 조회

//에러처리 미들웨어
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
