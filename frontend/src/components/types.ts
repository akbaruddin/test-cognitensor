import { Columns } from "react-data-table-component";

export type Props = {
  reportName: string;
};

export type Data = {
  [key: string]: any;
};

export type Config = {
  columns: Columns<Data>[];
};
