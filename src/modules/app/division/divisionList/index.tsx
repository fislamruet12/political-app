import { Box, FlatList } from "native-base";
import React, {  } from "react";
import Loading from "../../../../component/loading";
import { height } from "../../../../utils/handy";
import SingleProblem from "./singleproblem";

import { divisions } from "../../../databaseForm/utils/division";
const ProblemListScreen = (props: any) => {

  const renderItem = ({ item, index }: { item: any; index: string }) => {
    let dinfo = item;
    return (
      <SingleProblem
        dinfo={dinfo}
        index={index}
        navigation={props.navigation}
      />
    );
  };

  return (
    <Box bg={"coolGray.600"} flex={1}>
      <FlatList
        data={divisions}
        renderItem={renderItem}
        ListEmptyComponent={
          <Box marginTop={height / 2}>
            <Loading />
          </Box>
        }
      />
    </Box>
  );
};

export default ProblemListScreen;
