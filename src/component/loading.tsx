import { Box } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";

const Loading=()=>{
    return(
        <Box flex={1} justifyContent="center" alignItems={'center'}>
            <ActivityIndicator size={'large'} color="green"/>
        </Box>
    )
}
export default Loading