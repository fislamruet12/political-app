import React from "react"
import { Box, FlatList, Text, View } from "native-base"
import Loading from "../../../../component/loading";
import { height } from "../../../../utils/handy";
import { queryDivlist } from "../../../databaseForm/utils/functions";
import SingleProblem from './singleDiv'
const DudokPurbo = ({id,navigation}) => {
    const renderItem = ({ item, index }: { item: any; index: string }) => {
        let dinfo = item;
        return (
          <SingleProblem
            dinfo={dinfo}
            index={index}
            navigation={navigation}
          />
        );
      };
    
      const divisionlist = queryDivlist(id.toString());
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
}

export default DudokPurbo;