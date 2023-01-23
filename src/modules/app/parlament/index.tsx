import {
  Box,
  Center,
  CheckIcon,
  Input,
  Select,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RecyclerListView } from "recyclerlistview";
import { MemberType } from "../../../../typings/form-data";
import { icons } from "../../../assets/icons";
import Loading from "../../../component/loading";
import { getParlamentInfo } from "../../../database/Database";
import actions from "../../../state/actions";
import { RootState } from "../../../state/reducer";
import { height, width } from "../../../utils/handy";
import { dataProvider, _layoutProvider } from "../../../utils/listprops";
import { mainZone } from "../../databaseForm/utils/division";
import { ParMemRefresh } from "../../databaseForm/utils/functions";
import SingleMember from "./single";

const ParlamenMembertList = (props: any) => {
  const dispatch = useDispatch()
  const member = useSelector((state: RootState) => state.currentMember.member);
  const [text, setText] = useState("")
  const [show, setShow] = useState(false)
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
    return () => {
      dispatch(actions.member.removeMember())
    }
  }, [zone])
  const Parmlament_memRef = (member: MemberType) => {
    setdataProvider(dataProvider.cloneWithRows(ParMemRefresh(zoneData[zone], member)))
  }
  useEffect(() => {
    if (member != null)
      Parmlament_memRef(member)
  }, [member])

  const renderItem = (type, data) => {
    const mem = data as MemberType;

    return (
      <SingleMember
        mem={mem}
        navigation={props.navigation}
      />
    );
  };
  const searchMember = (text: string) => {

    if (text.length === 0) {
      Parmlament_memRef(null)
      return
    }


    let snZnData = [...zoneData[zone]] as MemberType[]
    let DataArr = snZnData.filter((item) => item.parlament_seat === parseInt(text))

    setdataProvider(dataProvider.cloneWithRows(DataArr))
  }


  return (
    <Box bg={"coolGray.600"} flex={1}>
      <VStack flexDirection={'row'} justifyContent='space-around'>
        <Box>
          <Select
            selectedValue={zone}
            minWidth={width * .6}
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
        {zoneData[zone].length != 0 &&
          <Box justifyContent={'center'} alignItems="center">
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Image source={icons.search} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </Box>
        }
      </VStack>
      {show && zoneData[zone].length != 0 &&
        <Box marginX={5} marginTop={1}>

          <Input
            bg={"gray.600"}
            fontFamily={"Montserrat-Bold"}
            placeholder="সংসদীয় আসন "
            keyboardType="numeric"
            value={text}
            onChangeText={(text) => {
              setText(text)
              searchMember(text)
            }}
            InputRightElement={<Pressable onPress={() => {
              setShow(!show)
              setText('')
              Parmlament_memRef(null)
            }}>
              <Text color={'red.500'} fontFamily="Montserrat-Bold" marginRight={5}>X</Text>
            </Pressable>}
          />
        </Box>
      }

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
