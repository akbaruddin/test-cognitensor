import type { Data } from "./types";
import React from "react";
import type { Columns } from "react-data-table-component";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  header: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  columns: {
    width: '25%',
  }
});

const Table: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View style={styles.tableContainer}>{children}</View>
);
const TableHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View style={styles.header}>{children}</View>
);
const TableCell: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View>
    <Text>{children}</Text>
  </View>
);
const TableBody: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View>{children}</View>
);
const TableRow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View>
    <Text>{children}</Text>
  </View>
);

const PDFReport: React.FC<{
  data: { data: Data[]; columns: Columns<Data>[] };
}> = ({ data }) => {
  return (
    <Document>
      <Page size="A4">
        <Table>
          <TableHeader>
            {data.columns.map((column) => (
              <TableCell key={column.selector}>{column.name}</TableCell>
            ))}
          </TableHeader>
          <TableBody>
            {data.data.map((row) => (
              <TableRow key={row.id}>
                {data.columns.map((column) => (
                  <TableCell key={`${row.id}-${column.selector}`}>
                    {row[column.selector]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Page>
    </Document>
  );
};

export default PDFReport;
