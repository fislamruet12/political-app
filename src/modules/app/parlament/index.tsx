import {
  Box,
  Center,
  CheckIcon,
  Select,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RecyclerListView } from "recyclerlistview";
import { MemberType } from "../../../../typings/form-data";
import Loading from "../../../component/loading";
import { getParlamentInfo } from "../../../database/Database";
import actions from "../../../state/actions";
import { height, width } from "../../../utils/handy";
import { dataProvider, _layoutProvider } from "../../../utils/listprops";
import { mainZone } from "../../databaseForm/utils/division";
import SingleMember from "./single";
const ParlamenMembertList = (props: any) => {
  const dispatch=useDispatch()
  const [data, setData] = useState([]);
  const [dataIntoProvider, setdataProvider] = useState<any>(
    dataProvider.cloneWithRows([]),
  );
  const [zone, setzone] = useState("1");
  const [zoneData, setzoneData] = useState({
    1: [],
    2: [],
    3: []
  })


  const Parmlament_mem = () => {

    setdataProvider(dataProvider.cloneWithRows([]))
    if (zoneData[zone].length != 0) {
      setdataProvider(dataProvider.cloneWithRows(zoneData[zone]))
      return
    }
    getParlamentInfo({
      zone: parseInt(zone),
    }).then((res) => {
      if (res?.data === null) {
        setData([]);

      } else {
        setdataProvider(dataProvider.cloneWithRows(res.data))
        setzoneData({
          ...zoneData,
          [zone]: res.data
        })
      }
    });
  };

  useEffect(() => {
    Parmlament_mem();
    return ()=>{
      dispatch(actions.member.removeMember())
    }
  }, [zone])

  const renderItem = (type, data) => {
    const mem = data as MemberType;
 
      return (
        <SingleMember
          mems={mem}
          navigation={props.navigation}
        />
      );
  };

  return (
    <Box bg={"coolGray.600"} flex={1}>
      <Center>
        <Box>
          <Select
            selectedValue={zone}
            minWidth={width - 20}
            accessibilityLabel="Choose Service"
            placeholder="Choose party"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            color="white"
            defaultValue={zone}
            onValueChange={(itemValue) => setzone(itemValue)}
          >
            {mainZone.slice(0, 2).map((value) => (
              <Select.Item
                key={value.id}
                label={value.bn_name}
                value={value.id.toString()}
              />
            ))}
          </Select>
        </Box>
      </Center>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={
         
        }
      /> */}
      {
        zoneData[zone].length === 0 ?
          <Box marginTop={height / 2}>
            <Loading />
          </Box> :

          <RecyclerListView
            layoutProvider={_layoutProvider}
            dataProvider={dataIntoProvider}
            rowRenderer={renderItem}
          />
      }
    </Box>
  );
};
export default ParlamenMembertList;
