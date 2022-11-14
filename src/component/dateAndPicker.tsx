import React, { useState, useEffect } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import moment from "moment";
import { Button, Text, View } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { height, width } from "../utils/handy";
import Modal from "react-native-modalbox";
import { icons } from "../assets/icons";
const DateAndPicker = (props: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    setSelectedDate(props.date);
  }, []);
  const getDate = (date: string) => {
    if (show === true) setSelectedDate(date);
  };
  const setShowCancel = () => {
    setShow(!show);
    setSelectedDate(props.date);
  };
  const sendFinalDatefromChild = () => {
    props.getDatefromDatePicker(selectedDate);
    setShow(!show);
  };
  return (
    <View flex={0.15}>
      <Modal
    
        isOpen={show}
        //  onClosed={() =>  setOpen(false)}
        style={{ width: width * 0.8,marginTop:100 }}
        position={"top"}
        swipeToClose={false}
        backdropPressToClose={false}
        backdropOpacity={0}
      >
        <View bg={"red.200"} rounded="2xl">
          <View>
            <View padding={3}>
              <Text fontFamily={"Montserrat-Bold"}>
                {moment(new Date(selectedDate)).format("dddd , Do MMMM , YYYY")}
              </Text>
            </View>
            <View height={1} />
          </View>
          <DatePicker
            options={{
              // backgroundColor: '#090C08',
              textHeaderColor: "#FFA25B",
              textDefaultColor: "#111",
              selectedTextColor: "#fff",
              mainColor: "#F4722B",
              textSecondaryColor: "#111",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            current={selectedDate}
            minimumDate={props.minimum ? props.minimum : "1900-01-01"}
            maximumDate={props.maximum ? props.maximum : "3022-07-25"}
            selected={selectedDate}
            mode="calendar"
            minuteInterval={30}
            // style={{ borderRadius: 10 }}
            onSelectedChange={(date) =>
              getDate(getFormatedDate(date, "YYYY-MM-DD"))
            }
          />
          <View
            flexDirection={"row"}
            justifyContent="flex-end"
            marginBottom={4}
            marginTop={2}
          
          >
            <Button
              mr={5}
              _text={{ fontFamily: "Montserrat-Bold", fontSize: 12 }}
              onPress={() => setShowCancel()}
            >
              CANCEL
            </Button>
            <Button
              mr={3}
              _text={{ fontFamily: "Montserrat-Bold", fontSize: 12 }}
              onPress={() => sendFinalDatefromChild()}
            >
              OK
            </Button>
          </View>
        </View>
      </Modal>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setShow(!show)}>
        <View
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          bg={"white"}
          margin={2}
          padding={2}
        >
          <View>
            <Text fontFamily= "Montserrat-Bold">{selectedDate}</Text>
          </View>
          <Image
            source={icons.leftarrow}
            style={{ height: 12, width: 12, transform: [{ rotate: "270deg" }] }}
          />
        </View>
        <View height={0.5} bg="gray.200" />
      </TouchableOpacity>
    </View>
  );
};

export default DateAndPicker;
