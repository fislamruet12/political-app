import { Box, FlatList } from "native-base";
import React from "react";
import Loading from "../../../../component/loading";
import { height, width } from "../../../../utils/handy";
import SingleProblem from "./singleproblem";

import { queryDivlist } from "../../../databaseForm/utils/functions";
const ProblemListScreen = (props: any) => {
  let zone = props.route.params.id;
  props.navigation.setOptions({
    title: props.route.params.bn_name,
  });

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

  const divisionlist = queryDivlist(zone.toString());
  return (
    <Box bg={"coolGray.600"} flex={1}>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
        data={divisionlist}
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
