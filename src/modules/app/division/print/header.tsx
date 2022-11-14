import React from "react";
import { Table, Row } from "react-native-table-component";
import { state } from "../../../../utils/date";
import { globalstyle } from "../../../../utils/style";

const HeaderRowScreen = () => {
  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
      <Row
        data={state.tableHead}
        textStyle={globalstyle.head}
        widthArr={[50, 200, 100, 200, 200, 55]}
      />
    </Table>
  );
};

export default HeaderRowScreen;
