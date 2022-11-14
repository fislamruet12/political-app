import React, { useEffect, useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { SolverType } from "../../../../../typings/form-data";
import { generateSingleRow } from "../../../../database/Database";
import { problemTypeData } from "../../../../utils/dataObj";
import { state } from "../../../../utils/date";
import { globalstyle } from "../../../../utils/style";

const EachRowScreen = ({
  problems,
  counter,
}: {
  problems: SolverType;
  counter: number;
}) => {
  //console.log(problems, counter);
  const [body, setbody] = useState(null);
  useEffect(() => {
    generateSingleRow(
      problems.deviceIdentityNumber,
      problems.solverbp,
      setbody,
      counter,
      problemTypeData[problems.actualIssue],
    );
  }, []);
  return ( body &&
    <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
      <Row
        data={body}
        textStyle={globalstyle.head}
        widthArr={[50, 200, 100, 200, 200, 50]}
      />
    </Table>
  );
};

export default React.memo(EachRowScreen);
