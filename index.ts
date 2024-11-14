import express from 'express';
import type {Request, Response} from 'express';

const app = express();

app.get('/api/', (req: Request, res: Response) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get('/api/:date', (req: Request, res: Response) => {
  const {date: dateParam} = req.params;

  if (!isValidDateParam(dateParam)) {
    res.json({error: 'Invalid Date'});
    return;
  }


  let date: Date = new Date(
      dateParam.match(dateFormat)
      ? dateParam
      : parseInt(dateParam),
  );
  console.log(date);

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const dateFormat = /\d{4}-\d{2}-\d{2}/;

function isValidDateParam(date: String): boolean {
  return date.match(dateFormat) !== null
      || date.match(/\d+/) !== null;
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
