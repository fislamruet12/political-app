import { Box, Button, Text } from "native-base";

import React, { useCallback, useEffect, useRef, useState } from "react";

import LinearGradient from "react-native-linear-gradient";
import { width } from "../../../../utils/handy";
import DateAndPicker from "../../../../component/dateAndPicker";
import ViewShot from "react-native-view-shot";
import { Image, ScrollView } from "react-native";
import { Table } from "react-native-table-component";

import { icons } from "../../../../assets/icons";
import { SpliteDate } from "../../../../utils/date";
import { GenerateReport } from "../../../../database/Database";
import { Shared } from "../../../../utils/share";
import EachRowScreen from "./eachRow";
import HeaderRowScreen from "./header";
import { ShareBeforeAlert } from "../../../../utils/navigate";
import DutyOfficerScreen from "./dutyOfficer";
let FontSize = 18;
const PrintScreen = (props: any) => {
  const full = useRef();
  const [solverinfo, setsolverInfo] = useState([]);
  const [imageUri, setimageUri] = useState<string>("");
  const [share, setshare] = useState(false);
  const [reportDate, setreportDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const onCapture = useCallback(() => {
    full?.current.capture().then((uri) => setimageUri(uri));
  }, []);

  useEffect(() => {}, []);
  useEffect(() => {
    setsolverInfo([]);
    GenerateReport({
      setsolverInfo: setsolverInfo,
      date: reportDate,
    });
    //console.log("check1 1");
    setshare(false);
  }, [reportDate]);

  const ShareFromHome = () => {
    Shared(imageUri, setshare, setimageUri);
  };
  const MakePdf = async () => {
    onCapture();
    setshare(true);
  };
  const GetDate = (date: string) => {
    setreportDate(date);
  };

  let counter = 1;
  //console.log({ image: imageUri });
  return (
    <LinearGradient
      colors={["#f4f1f2", "#fafafa", "#f1d6d6"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.4, 0.9]}
      style={{ flex: 1 }}
    >
     
        <DateAndPicker
          head={`Date of Birth `}
          date={reportDate}
          getDatefromDatePicker={(date: string) => GetDate(date)}
          error={true}
        />
     
     <ScrollView horizontal={true} style={{ flex: 0.7, marginVertical: 20 }}>
        <ScrollView horizontal={false}>
          <ViewShot ref={full} style={{ width: 805 }} options={{ quality: 1 }}>
            {solverinfo.length > 0 ? (
              <Box bg="white">
                <Box marginY={5} marginLeft={5}>
                  <Box ml={3}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      বরাবর
                    </Text>
                  </Box>
                  <Box ml={12}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      বিশেষ পুলিশ সুপার (আইসিটি রিসার্চ এন্ড প্লানিং)
                    </Text>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      স্পেশাল ব্রাঞ্চ, বাংলাদেশ পুলিশ, ঢাকা ।
                    </Text>
                  </Box>
                  <Box ml={3}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      মাধ্যম : যথাযথ কর্তৃপক্ষ
                    </Text>
                  </Box>
                  <Box ml={3}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      বিষয় :{" "}
                      <Text underline>
                        কম্পিউটার ল্যাবের দৈনন্দিন কাজের বিবরণী ।
                      </Text>
                    </Text>
                  </Box>
                  <Box ml={3}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      জনাব{" "}
                    </Text>
                  </Box>
                  <Box ml={3}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      {" "}
                      {"\t\t\t\t\t"}যথাবিহীত সম্মান প্রদর্শন পূর্বক নিবেদন এই
                      যে, {SpliteDate(reportDate)} খ্রিঃ এসবি কম্পিউটার ল্যাবে
                      উল্লেখযোগ্য কাজের বিবরণী নিম্নোক্ত "ছক" মোতাবেক দাখিল করা
                      হলো।
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box mt={2} alignSelf="center">
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      "ছক"
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Table
                    borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
                  >
                    <HeaderRowScreen />
                    {solverinfo.map((item) => (
                      <EachRowScreen problems={item} counter={counter++} />
                    ))}
                  </Table>
                </Box>
                <Box>
                  <Box mt={4} ml={20}>
                    <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
                      অতএব, ইহা আপনার সদয় অবগতির জন্য প্রেরণ করা হলো।
                    </Text>
                  </Box>
                </Box>
                <DutyOfficerScreen setshare={setshare} />
              </Box>
            ) : (
              <Box marginLeft={20}>
                <Text>Loading...</Text>
              </Box>
            )}
          </ViewShot>
        </ScrollView>
      </ScrollView>
      {solverinfo.length > 0 && (
        <Box flex={0.1} marginTop={1} margin={3}>
          {share ? (
            <Button
              endIcon={
                <Image style={{ height: 15, width: 15 }} source={icons.share} />
              }
              isLoading={imageUri === ""}
              isLoadingText="Generating image.."
              _text={{ fontFamily: "Montserrat-Bold", fontSize: 18 }}
              onPress={() => ShareFromHome()}
            >
              SHARE
            </Button>
          ) : (
            <Button
              endIcon={
                <Image style={{ height: 15, width: 15 }} source={icons.share} />
              }
              _text={{ fontFamily: "Montserrat-Bold", fontSize: 18 }}
              onPress={() => MakePdf()}
            >
              MAKE PRINTABLE IMAGE
            </Button>
          )}
        </Box>
      )}
    </LinearGradient>
  );
};

export default PrintScreen;
