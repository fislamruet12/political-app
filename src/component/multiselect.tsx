import React from "react";
import { View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";

const MultiselectScreen = (props) => {
  const { selectText, searchPlaceholderText, solverItems, selectedItems, onSelectedItemsChange } = props;
  return (
    <View>
      <SectionedMultiSelect
        items={solverItems}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText={selectText}
        searchPlaceholderText={searchPlaceholderText}
        itemFontFamily={{ fontFamily: "Montserrat-Bold" }}
        subItemFontFamily={{ fontFamily: "Montserrat-Regular" }}
        colors={{ subItemBackground: "white", chipColor: "green" }}
        confirmText="SUMBIT"
        confirmFontFamily={{ fontFamily: "Montserrat-Bold" }}
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        // renderSelectText={(item)=>console.log(item)}
        //   customChipsRenderer={(item)=>console.log(item)}
        expandDropDowns={true}
        styles={{
          subSeparator: {
            borderWidth: 0.5,
            borderColor: "white",
            marginTop:6
          },

          button: {
            backgroundColor: "#a89932",
          },
          selectToggle: {
            backgroundColor: "white",
            padding: 10,
          },
        }}
      />
    </View>
  );
};

export default MultiselectScreen;
