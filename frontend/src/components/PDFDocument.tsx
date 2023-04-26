import type { Data } from "./types"
import { Columns } from "react-data-table-component";
import PDFReport from "./PDFReport";
import { PDFViewer } from "@react-pdf/renderer";

const PDFDocument: React.FC<{
  data: { data: Data[]; columns: Columns<Data>[] };
}> = ({ data }) => {
  return (
    <PDFViewer width="1000" height="600">
      <PDFReport data={data} />
    </PDFViewer>
  );
};

export default PDFDocument