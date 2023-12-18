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
  const [name, setText] = useState("")
  const [seat, setText1] = useState("")
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
      searchMember(name, seat)
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
  const searchMember = (name: string, seat: string) => {

    if (name.length === 0 && seat.length === 0) {
      Parmlament_memRef(null)
      return
    }


    let snZnData = [...zoneData[zone]] as MemberType[]
    let DataArr = snZnData.filter((item) => (item.parlament_seat === parseInt(seat) && seat.length != 0) || (item.name.includes(name) === true && name.length != 0))

    setdataProvider(dataProvider.cloneWithRows(DataArr))
  }
  useEffect(() => {
    searchMember(name, seat)
  }, [zoneData])

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
            onValueChange={(itemValue) => {
              setzone(itemValue)
              // setShow(false)
              // setText('')
              // setText1('')
            }}
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
        <Box marginX={5} marginTop={1} flexDirection="row" justifyContent={'space-around'}>

          <Box>
            <Input
              bg={"gray.600"}
              fontFamily={"Montserrat-Bold"}
              placeholder="নাম"
              keyboardType="default"
              value={name}
              width={width * .4}
              onChangeText={(te) => {
                setText(te)
                searchMember(te, seat)
              }}
              InputRightElement={<Pressable onPress={() => {
                // setShow(!show)
                setText('')
                searchMember('', seat)
              }}>
                <Text color={'red.500'} fontFamily="Montserrat-Bold" marginRight={5}>X</Text>
              </Pressable>}
            />
          </Box>
          <Box>
            <Input
              bg={"gray.600"}
              fontFamily={"Montserrat-Bold"}
              placeholder="সংসদীয় আসন "
              keyboardType="number-pad"
              width={width * .4}
              value={seat}
              onChangeText={(text) => {
                setText1(text)
                searchMember(name, text)
              }}
              InputRightElement={<Pressable onPress={() => {
                // setShow(!show)
                setText1('')
                searchMember(name, '')
              }}>
                <Text color={'red.500'} fontFamily="Montserrat-Bold" marginRight={5}>X</Text>
              </Pressable>}
            />
          </Box>
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
            forceNonDeterministicRendering={true}
          />
      }
    </Box>
  );
};
export default ParlamenMembertList;
